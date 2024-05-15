import { pool } from "../../../config/configPg";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, makeModelTrimId } = req.body;

    try {
      const result = await pool.query(
        "DELETE FROM favorites WHERE user_id = $1 AND make_model_trim_id = $2 RETURNING *",
        [userId, makeModelTrimId]
      );
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to remove favorite", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
