const fetch = require("node-fetch");
const { pool } = require("../configPg");

async function fetchAndSaveEngines(year) {
  const baseUrl = "https://carapi.app/api/engines";
  let url = `${baseUrl}?year=${year}`;
  let totalEnginesSaved = 0;

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

      for (const engine of data) {
        // Check if the make_model_trim_id exists in the make_model_trims table
        const trimExistsResult = await client.query(
          "SELECT EXISTS(SELECT 1 FROM make_model_trims WHERE id = $1)",
          [engine.make_model_trim_id]
        );
        if (!trimExistsResult.rows[0].exists) {
          console.warn(
            `Trim ID ${engine.make_model_trim_id} not found in make_model_trims table. Skipping.`
          );
          continue;
        }

        const insertQuery = `
            INSERT INTO make_model_trim_engines (
                id, make_model_trim_id, engine_type, fuel_type, cylinders, size, 
                horsepower_hp, horsepower_rpm, torque_ft_lbs, torque_rpm, valves, 
                valve_timing, cam_type, drive_type, transmission
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            ON CONFLICT (id) DO NOTHING;
        `;
        await client.query(insertQuery, [
          engine.id,
          engine.make_model_trim_id,
          engine.engine_type,
          engine.fuel_type,
          engine.cylinders,
          engine.size,
          engine.horsepower_hp,
          engine.horsepower_rpm,
          engine.torque_ft_lbs,
          engine.torque_rpm,
          engine.valves,
          engine.valve_timing,
          engine.cam_type,
          engine.drive_type,
          engine.transmission,
        ]);
      }

      await client.query("COMMIT");
      totalEnginesSaved += data.length;
    }

    console.log(`Total engines saved for year ${year}: ${totalEnginesSaved}`);
  } catch (error) {
    console.error(`Error in fetchAndSaveEngines for year ${year}:`, error);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
}

async function fetchAndSaveEnginesForYears() {
  for (let year = 2015; year <= 2020; year++) {
    await fetchAndSaveEngines(year);
  }
}

fetchAndSaveEnginesForYears();
