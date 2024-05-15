import { pool } from "../../../config/configPg";

export default async function handler(req, res) {
  try {
    const {
      make,
      model,
      driveType,
      minMsrp,
      maxMsrp,
      engineType,
      cylinderType,
      fuelType,
    } = req.query;

    let query = `
      SELECT DISTINCT ON (mm.id)
      mm.imageURL AS imageURL, 
      mm.id AS model_id,
      mm.name AS model,
      mmt.year,
      mmt.msrp,
      make.name AS make,
      mmtb.type AS body_type,
      mmte.drive_type,
      mmte.cylinders AS engine_cylinders,
      mmte.fuel_type,
      mmte.engine_type
      FROM make_models mm
      LEFT JOIN make_model_trims mmt ON mm.id = mmt.make_model_id
      LEFT JOIN make_model_trim_bodies mmtb ON mmt.id = mmtb.make_model_trim_id
      LEFT JOIN make_model_trim_engines mmte ON mmt.id = mmte.make_model_trim_id
      LEFT JOIN make ON mm.make_id = make.id
      WHERE 1=1
    `;

    const params = [];

    if (make) {
      query += ` AND make.name ILIKE $${params.length + 1}`;
      params.push(`%${make}%`);
    }
    if (model) {
      query += ` AND mm.name ILIKE $${params.length + 1}`;
      params.push(`%${model}%`);
    }
    if (driveType) {
      query += ` AND mmte.drive_type = $${params.length + 1}`;
      params.push(driveType);
    }
    if (minMsrp) {
      query += ` AND mmt.msrp >= $${params.length + 1}`;
      params.push(minMsrp);
    }
    if (maxMsrp) {
      query += ` AND mmt.msrp <= $${params.length + 1}`;
      params.push(maxMsrp);
    }
    if (engineType) {
      query += ` AND mmte.engine_type = $${params.length + 1}`;
      params.push(engineType);
    }
    if (cylinderType) {
      query += ` AND mmte.cylinders = $${params.length + 1}`;
      params.push(cylinderType);
    }
    if (fuelType) {
      query += ` AND mmte.fuel_type = $${params.length + 1}`;
      params.push(fuelType);
    }

    query += `
      ORDER BY mm.id, make.name ASC
    `;

    const modelsResult = await pool.query(query, params);

    res.json(modelsResult.rows);
  } catch (error) {
    console.error("Error fetching brand models data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
