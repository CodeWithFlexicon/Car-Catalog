const fetch = require("node-fetch");
const { pool } = require("../configPg");

async function fetchAndSaveModels(year) {
  const baseUrl = "https://carapi.app/api/models";
  let url = `${baseUrl}?year=${year}`;
  let totalModelsSaved = 0;

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

      for (const model of data) {
        const insertQuery = `
                    INSERT INTO make_models (id, make_id, name)
                    VALUES ($1, $2, $3)
                    ON CONFLICT (id) DO NOTHING;
                `;
        await client.query(insertQuery, [model.id, model.make_id, model.name]);
      }

      await client.query("COMMIT");
      totalModelsSaved += data.length;
    }

    console.log(`Total models saved for year ${year}: ${totalModelsSaved}`);
  } catch (error) {
    console.error(`Error in fetchAndSaveModels for year ${year}:`, error);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
}

async function fetchAndSaveModel() {
  for (let year = 2015; year <= 2020; year++) {
    await fetchAndSaveModels(year);
  }
}

fetchAndSaveModel();
