import { pool } from "../../../config/configPg";

export default async function handler(req, res) {
  const { brand } = req.query;

  if (!brand) {
    return res.status(400).json({ message: "Brand is required" });
  }

  try {
    const brandQuery = "SELECT id FROM make WHERE lower(name) = lower($1)";
    const brandResult = await pool.query(brandQuery, [brand]);

    if (brandResult.rows.length === 0) {
      return res.status(404).json({ message: "Brand not found" });
    }

    const brandId = brandResult.rows[0].id;

    const modelsQuery = `
      SELECT DISTINCT ON (mm.id) 
      mm.imageurl AS imageURL,
      mm.id as model_id,
      mm.name AS model,
      mmt.year,
      mmt.msrp,
      make.name AS make,
      mmtb.type AS body_type
      FROM make_models mm
      LEFT JOIN make_model_trims mmt ON mm.id = mmt.make_model_id
      LEFT JOIN make_model_trim_bodies mmtb ON mmt.id = mmtb.make_model_trim_id
      LEFT JOIN make ON mm.make_id = make.id
      WHERE mm.make_id = $1
      ORDER BY mm.id, mmt.msrp ASC;
      `;
    const modelsResult = await pool.query(modelsQuery, [brandId]);

    res.json(modelsResult.rows);
  } catch (error) {
    console.error("Error fetching brand models data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
