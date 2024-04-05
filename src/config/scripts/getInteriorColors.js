const fetch = require("node-fetch");
const { pool } = require("../configPg");

async function fetchAndSaveInteriorColors(year) {
  const baseUrl = "https://carapi.app/api/interior-colors";
  let url = `${baseUrl}?year=${year}`;
  let totalColorsSaved = 0;

  const client = await pool.connect();
  try {
    while (url) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const { data, collection } = await response.json();
      url = collection.next ? `https://carapi.app${collection.next}` : "";

      await client.query("BEGIN");

      for (const color of data) {
        const trimExistsResult = await client.query(
          "SELECT EXISTS(SELECT 1 FROM make_model_trims WHERE id = $1)",
          [color.make_model_trim_id]
        );
        if (!trimExistsResult.rows[0].exists) {
          console.warn(
            `Trim ID ${color.make_model_trim_id} not found in make_model_trims table. Skipping.`
          );
          continue;
        }

        const insertQuery = `
            INSERT INTO make_model_trim_interior_colors (
                id, make_model_trim_id, name, rgb
            )
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (id) DO NOTHING;
        `;
        await client.query(insertQuery, [
          color.id,
          color.make_model_trim_id,
          color.name,
          color.rgb,
        ]);
      }

      await client.query("COMMIT");
      totalColorsSaved += data.length;
    }

    console.log(
      `Total interior colors saved for year ${year}: ${totalColorsSaved}`
    );
  } catch (error) {
    console.error(
      `Error in fetchAndSaveInteriorColors for year ${year}:`,
      error
    );
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
}

async function fetchAndSaveInteriorColorsForYears() {
  for (let year = 2015; year <= 2020; year++) {
    await fetchAndSaveInteriorColors(year);
  }
}

fetchAndSaveInteriorColorsForYears();
