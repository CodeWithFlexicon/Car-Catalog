import { pool } from "../../../config/configPg";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = session.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Current password and new password are required" });
  }

  try {
    const userQuery = `SELECT password_hash FROM users WHERE user_id = $1`;
    const userResult = await pool.query(userQuery, [userId]);

    if (userResult.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      userResult.rows[0].password_hash
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    const updateQuery = `
      UPDATE users
      SET password_hash = $1
      WHERE user_id = $2
      RETURNING user_id
    `;
    const updateResult = await pool.query(updateQuery, [
      newHashedPassword,
      userId,
    ]);

    if (updateResult.rowCount === 0) {
      return res.status(400).json({ message: "Failed to update password" });
    }

    res.status(200).json({ message: "Password successfully changed" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
