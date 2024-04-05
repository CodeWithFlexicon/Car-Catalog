import { pool } from "../../config/configPg";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const result = await pool.query("SELECT * FROM make_model_trims");
        res.status(200).json(result.rows);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
