const fetch = require("node-fetch");
const { pool } = require("../configPg");

async function ensureModelExists(client, modelId) {
  const modelCheckQuery = "SELECT 1 FROM make_models WHERE id = $1";
  const modelCheckResult = await client.query(modelCheckQuery, [modelId]);

  if (modelCheckResult.rows.length === 0) {
    const modelFetchUrl = `https://carapi.app/api/models/${modelId}`; // Adjust the URL as needed
    const response = await fetch(modelFetchUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch model with ID ${modelId}: ${response.statusText}`
      );
    }

    const modelData = await response.json();
    const insertQuery = `
      INSERT INTO make_models (id, make_id, name)
      VALUES ($1, $2, $3)
      ON CONFLICT (id) DO NOTHING;
    `;

    await client.query(insertQuery, [
      modelData.id,
      modelData.make_id,
      modelData.name,
    ]);
  }
}

async function fetchAndSaveTrims(year) {
  const baseUrl = "https://carapi.app/api/trims";
  let url = `${baseUrl}?year=${year}`;
  let totalTrimsSaved = 0;

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

      for (const trim of data) {
        // Ensure the related model exists
        await ensureModelExists(client, trim.make_model_id);

        const insertTrimQuery = `
          INSERT INTO make_model_trims (id, make_model_id, year, name, description, msrp, invoice, created, modified)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT (id) DO NOTHING;
        `;
        await client.query(insertTrimQuery, [
          trim.id,
          trim.make_model_id,
          year,
          trim.name,
          trim.description,
          trim.msrp,
          trim.invoice,
          trim.created,
          trim.modified,
        ]);

        totalTrimsSaved++;
      }

      await client.query("COMMIT");
    }

    console.log(`Total trims saved for year ${year}: ${totalTrimsSaved}`);
  } catch (error) {
    console.error(`Error in fetchAndSaveTrims for year ${year}:`, error);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
}

async function main() {
  for (let year = 2015; year <= 2020; year++) {
    await fetchAndSaveTrims(year);
  }
}

main();
