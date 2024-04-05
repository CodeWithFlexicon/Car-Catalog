import { pool } from "../../config/configPg";

export default async function handler(req, res) {
  const { make } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests allowed" });
  }

  try {
    const makeQuery = "SELECT id FROM make WHERE lower(name) = lower($1)";
    const makeResult = await pool.query(makeQuery, [make]);

    if (makeResult.rows.length === 0) {
      return res.status(404).json({ message: "Make not found" });
    }

    const makeId = makeResult.rows[0].id;

    const modelsQuery = `
      SELECT * FROM make_models
      WHERE make_id = $1
      ORDER BY RANDOM()
    `;
    const modelsResult = await pool.query(modelsQuery, [makeId]);

    res.json(modelsResult.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
