import { pool } from "../../../config/configPg";

export default async function handler(req, res) {
  try {
    const modelsQuery = `
      SELECT DISTINCT ON (mm.id) 
      mm.id AS model_id,
      mm.name AS model,
      mmt.year,
      mmt.msrp,
      mm.make_id AS make,
      make.name AS make,
      mmtb.type AS body_type 
      FROM make_models mm
      LEFT JOIN make_model_trims mmt ON mm.id = mmt.make_model_id
      LEFT JOIN make_model_trim_bodies mmtb ON mmt.id = mmtb.make_model_trim_id
      LEFT JOIN make ON mm.make_id = make.id
      ORDER BY mm.id, make.name ASC
    `;

    const modelsResult = await pool.query(modelsQuery);

    res.json(modelsResult.rows);
  } catch (error) {
    console.error("Error fetching brand models data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
