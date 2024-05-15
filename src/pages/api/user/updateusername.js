import { pool } from "../../../config/configPg";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = session.user.id;
  const { newUsername } = req.body;

  if (!newUsername) {
    return res.status(400).json({ message: "New username is required" });
  }

  try {
    const query = `
      UPDATE users
      SET username = $1
      WHERE user_id = $2
      RETURNING username
    `;
    const result = await pool.query(query, [newUsername, userId]);

    if (result.rowCount === 0) {
      return res.status(400).json({ message: "Failed to update username" });
    }

    res.status(200).json({ username: result.rows[0].username });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
