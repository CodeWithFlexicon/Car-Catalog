const fetch = require("node-fetch");
const { pool } = require("../configPg");

async function fetchAndSaveMileages(year) {
  const baseUrl = "https://carapi.app/api/mileages";
  let url = `${baseUrl}?year=${year}`;
  let totalMileagesSaved = 0;

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

      for (const mileage of data) {
        // Check if the make_model_trim_id exists in the make_model_trims table
        const trimExistsResult = await client.query(
          "SELECT EXISTS(SELECT 1 FROM make_model_trims WHERE id = $1)",
          [mileage.make_model_trim_id]
        );
        if (!trimExistsResult.rows[0].exists) {
          console.warn(
            `Trim ID ${mileage.make_model_trim_id} not found in make_model_trims table. Skipping.`
          );
          continue;
        }

        const insertQuery = `
            INSERT INTO make_model_trim_mileage (
                id, make_model_trim_id, fuel_tank_capacity, combined_mpg, epa_city_mpg, 
                epa_highway_mpg, range_city, range_highway, battery_capacity_electric, 
                epa_time_to_charge_hr_240v_electric, epa_kwh_100_mi_electric, range_electric, 
                epa_highway_mpg_electric, epa_city_mpg_electric, epa_combined_mpg_electric
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            ON CONFLICT (id) DO NOTHING;
        `;
        await client.query(insertQuery, [
          mileage.id,
          mileage.make_model_trim_id,
          mileage.fuel_tank_capacity,
          mileage.combined_mpg,
          mileage.epa_city_mpg,
          mileage.epa_highway_mpg,
          mileage.range_city,
          mileage.range_highway,
          mileage.battery_capacity_electric,
          mileage.epa_time_to_charge_hr_240v_electric,
          mileage.epa_kwh_100_mi_electric,
          mileage.range_electric,
          mileage.epa_highway_mpg_electric,
          mileage.epa_city_mpg_electric,
          mileage.epa_combined_mpg_electric,
        ]);
      }

      await client.query("COMMIT");
      totalMileagesSaved += data.length;
    }

    console.log(`Total mileages saved for year ${year}: ${totalMileagesSaved}`);
  } catch (error) {
    console.error(`Error in fetchAndSaveMileages for year ${year}:`, error);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
}

async function fetchAndSaveMileagesForYears() {
  for (let year = 2015; year <= 2020; year++) {
    await fetchAndSaveMileages(year);
  }
}

fetchAndSaveMileagesForYears();
