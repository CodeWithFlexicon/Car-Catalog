import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { pool } from "../../../config/configPg";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = session.user.id;

  try {
    const query = `
      SELECT username, email, profile_imageurl
      FROM users
      WHERE user_id = $1
    `;
    const result = await pool.query(query, [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
