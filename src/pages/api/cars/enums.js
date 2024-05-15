import { pool } from "../../../config/configPg";

export default async function handler(req, res) {
  try {
    const enumQueries = {
      driveType: `SELECT unnest(enum_range(NULL::drive_type)) AS value`,
      engineType: `SELECT unnest(enum_range(NULL::engine_type)) AS value`,
      fuelType: `SELECT unnest(enum_range(NULL::fuel_type)) AS value`,
      cylinderType: `SELECT unnest(enum_range(NULL::cylinder_type)) AS value`,
    };

    const enumValues = {};

    for (const [key, query] of Object.entries(enumQueries)) {
      const result = await pool.query(query);
      enumValues[key] = result.rows.map((row) => row.value);
    }

    res.status(200).json(enumValues);
  } catch (error) {
    console.error("Error fetching enum values:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
