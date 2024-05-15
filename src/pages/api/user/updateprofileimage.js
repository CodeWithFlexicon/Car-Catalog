import { pool } from "../../../config/configPg";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = session.user.id;
  const { newProfileImageUrl } = req.body;

  if (!newProfileImageUrl) {
    return res
      .status(400)
      .json({ message: "New profile image URL is required" });
  }

  try {
    const query = `
      UPDATE users
      SET profile_imageurl = $1
      WHERE user_id = $2
      RETURNING profile_imageurl
    `;
    const result = await pool.query(query, [newProfileImageUrl, userId]);

    if (result.rowCount === 0) {
      return res
        .status(400)
        .json({ message: "Failed to update profile image" });
    }

    res.status(200).json({ profileImageUrl: result.rows[0].profile_imageurl });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
