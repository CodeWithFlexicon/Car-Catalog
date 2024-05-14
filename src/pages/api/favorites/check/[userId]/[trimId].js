import { pool } from "../../../../../config/configPg";

export default async function handler(req, res) {
  const { userId, trimId } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1 AND make_model_trim_id = $2",
      [userId, trimId]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ isFavorite: true });
    } else {
      res.status(200).json({ isFavorite: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to check favorite status",
      error: error.message,
    });
  }
}
