import { pool } from "../../../../../config/configPg";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;

    try {
      const result = await pool.query(
        `SELECT 
          mmt.id AS make_model_trim_id, 
          m.name AS make_name, 
          mm.name AS model_name, 
          mmt.year, 
          mmt.name AS trim_name, 
          mmt.description, 
          mmt.msrp, 
          mm.imageurl AS imageURL
        FROM favorites f
        JOIN make_model_trims mmt ON f.make_model_trim_id = mmt.id
        JOIN make_models mm ON mmt.make_model_id = mm.id
        JOIN make m ON mm.make_id = m.id
        WHERE f.user_id = $1`,
        [userId]
      );
      res.status(200).json(result.rows); // Ensure this returns an array
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch favorites", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
