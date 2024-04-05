import { pool } from "../../../../config/configPg";

export default async function handler(req, res) {
  const { makeId, modelId } = req.query;

  try {
    const client = await pool.connect();

    const makeQuery = `SELECT id, name FROM make WHERE replace(lower(name), ' ', '-') = lower($1)`;
    const makeResult = await client.query(makeQuery, [makeId]);
    if (makeResult.rows.length === 0) {
      res.status(404).json({ message: "Make not found" });
      return;
    }
    const makeIdNumeric = makeResult.rows[0].id;
    const makeName = makeResult.rows[0].name;

    const modelQuery = `
      SELECT mm.id, mm.name FROM make_models mm
      WHERE replace(lower(mm.name), ' ', '-') = lower($1) AND make_id = $2`;
    const modelResult = await client.query(modelQuery, [
      modelId,
      makeIdNumeric,
    ]);
    if (modelResult.rows.length === 0) {
      res.status(404).json({ message: "Model not found" });
      return;
    }
    const modelIdNumeric = modelResult.rows[0].id;
    const modelName = modelResult.rows[0].name;

    const detailsQuery = `
      SELECT mmt.*, mmtb.*, mmte.*, '${makeName}' AS make_name, '${modelName}' AS model_name
      FROM make_model_trims mmt
      LEFT JOIN make_model_trim_bodies mmtb ON mmt.id = mmtb.make_model_trim_id
      LEFT JOIN make_model_trim_engines mmte ON mmt.id = mmte.make_model_trim_id
      WHERE mmt.make_model_id = $1
      ORDER BY mmt.year DESC;
    `;
    const detailsResult = await client.query(detailsQuery, [modelIdNumeric]);
    client.release();

    if (detailsResult.rows.length > 0) {
      res.status(200).json(detailsResult.rows);
    } else {
      res.status(404).json({
        message: "No details found for the specified make and model.",
      });
    }
  } catch (error) {
    console.error("Database query error", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
