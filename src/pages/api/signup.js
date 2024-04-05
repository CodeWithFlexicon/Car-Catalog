import bcrypt from "bcrypt";
import { pool } from "../../config/configPg";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const client = await pool.connect();
      const checkUser = await client.query(
        "SELECT * FROM users WHERE username = $1 OR email = $2",
        [username, email]
      );

      if (checkUser.rows.length > 0) {
        const isEmailTaken = checkUser.rows.some((row) => row.email === email);
        const isUsernameTaken = checkUser.rows.some(
          (row) => row.username === username
        );

        if (isEmailTaken && isUsernameTaken) {
          throw new Error("Username and email are already in use");
        } else if (isUsernameTaken) {
          throw new Error("Username is already in use");
        } else if (isEmailTaken) {
          throw new Error("Email is already in use");
        }
      }

      // Proceed with user creation if everything is proper
      const result = await client.query(
        "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
      );

      client.release();
      return res.status(201).json({ user: result.rows[0] });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
