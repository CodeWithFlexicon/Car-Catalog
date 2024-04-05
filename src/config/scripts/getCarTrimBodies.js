const fetch = require("node-fetch");
const { pool } = require("../configPg");

// Fetch and insert a single trim that is not in the database
async function fetchAndInsertTrim(client, trimId) {
  const trimApiUrl = `https://carapi.app/api/trims/${trimId}`;
  const response = await fetch(trimApiUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch trim with ID ${trimId}: ${response.statusText}`
    );
  }

  const trimData = await response.json();
  const insertTrimQuery = `
        INSERT INTO make_model_trims (id, make_model_id, year, name, description, msrp, invoice, created, modified)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (id) DO NOTHING;
    `;

  await client.query(insertTrimQuery, [
    trimData.id,
    trimData.make_model_id,
    trimData.year,
    trimData.name,
    trimData.description,
    trimData.msrp,
    trimData.invoice,
    trimData.created,
    trimData.modified,
  ]);
}

// Function to ensure the trim exists, and fetch/insert if it doesn't
async function ensureTrimExists(client, trimId) {
  const trimExistsQuery = "SELECT 1 FROM make_model_trims WHERE id = $1";
  const trimResult = await client.query(trimExistsQuery, [trimId]);

  if (trimResult.rows.length === 0) {
    console.log(`Trim with ID ${trimId} does not exist, fetching...`);
    await fetchAndInsertTrim(client, trimId);
  }
}

// Fetch and save bodies to the table
async function fetchAndSaveBodies(year) {
  const baseUrl = "https://carapi.app/api/bodies";
  let url = `${baseUrl}?year=${year}`;
  let totalBodiesSaved = 0;

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

      for (const body of data) {
        await ensureTrimExists(client, body.make_model_trim_id);

        const insertQuery = `
                    INSERT INTO make_model_trim_bodies (
                        id, make_model_trim_id, type, doors, length, width, seats, height, wheel_base,
                        front_track, rear_track, ground_clearance, cargo_capacity, max_cargo_capacity,
                        curb_weight, gross_weight, max_payload, max_towing_capacity
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
                    ON CONFLICT (id) DO NOTHING;
                `;
        await client.query(insertQuery, [
          body.id,
          body.make_model_trim_id,
          body.type,
          body.doors,
          parseFloat(body.length),
          parseFloat(body.width),
          body.seats,
          parseFloat(body.height),
          parseFloat(body.wheel_base),
          body.front_track ? parseFloat(body.front_track) : null,
          body.rear_track ? parseFloat(body.rear_track) : null,
          parseFloat(body.ground_clearance),
          parseFloat(body.cargo_capacity),
          body.max_cargo_capacity ? parseFloat(body.max_cargo_capacity) : null,
          body.curb_weight,
          body.gross_weight,
          body.max_payload,
          body.max_towing_capacity,
        ]);
        totalBodiesSaved++;
      }

      await client.query("COMMIT");
    }

    console.log(`Total bodies saved for year ${year}: ${totalBodiesSaved}`);
  } catch (error) {
    console.error(`Error in fetchAndSaveBodies for year ${year}:`, error);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
}

async function fetchAndSaveBodiesForYears() {
  for (let year = 2015; year <= 2020; year++) {
    await fetchAndSaveBodies(year);
  }
}

fetchAndSaveBodiesForYears();
