import { pool } from "../../config/configPg";

export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        console.log("Query ID:", query.id); // Log the ID parameter
        const result = await pool.query(
          "SELECT * FROM make_model_trim_bodies WHERE make_model_trim_id = $1",
          [query.id]
        );
        console.log("SQL Query Result:", result.rows); // Log the query result
        res.status(200).json(result.rows);
      } catch (error) {
        console.error("Error fetching data:", error); // Log any errors
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
