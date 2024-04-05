const fetch = require("node-fetch");
const { pool } = require("../configPg");

async function fetchAndSaveMakes() {
  const apiUrl = "https://carapi.app/api/makes";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const { data: makes } = await response.json();

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      for (const make of makes) {
        const insertQuery = `
          INSERT INTO make (id, name)
          VALUES ($1, $2)
          ON CONFLICT (id) DO NOTHING;
        `;
        await client.query(insertQuery, [make.id, make.name]);
      }

      await client.query("COMMIT");
      console.log(`${makes.length} makes have been successfully saved.`);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error in fetchAndSaveMakes:", error);
  }
}

fetchAndSaveMakes();

// Old scraper for old table
/*
const fetch = require("node-fetch");
const { pool } = require("./configPg");

// Function to fetch data from the Car API
async function fetchDataFromAPI() {
  const apiUrl = "https://carapi.app/api/engines?year=2020&verbose=yes&";
  const totalPages = 29;
  const allData = [];
  for (let page = 1; page <= totalPages; page++) {
    const pageUrl = `${apiUrl}&page=${page}`;
    const response = await fetch(pageUrl, {
      method: "GET",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjYXJhcGkuYXBwIiwic3ViIjoiNGI4M2EzNDQtMzNkNC00NDgwLTkzZGUtMGQ4ZTMxMmRiYjMyIiwiYXVkIjoiNGI4M2EzNDQtMzNkNC00NDgwLTkzZGUtMGQ4ZTMxMmRiYjMyIiwiZXhwIjoxNzEyMTc5Mjc3LCJpYXQiOjE3MTE1NzQ0NzcsImp0aSI6IjkyOTJjMWIwLWEzYTQtNDI4MS1hZTczLWZmMmJhN2IyMTIyZSIsInVzZXIiOnsic3Vic2NyaWJlZCI6ZmFsc2UsInN1YnNjcmlwdGlvbiI6bnVsbCwicmF0ZV9saW1pdF90eXBlIjoiaGFyZCIsImFkZG9ucyI6eyJhbnRpcXVlX3ZlaGljbGVzIjpmYWxzZX19fQ.ZtAM3LfVxKIw3CSTEzQZNAKkcVtsLXQrA8fXS7WTe4w",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching data from page ${page}: ${response.statusText}`
      );
    }

    const data = await response.json();
    allData.push(...data.data); // Assuming 'data' is the array of results
  }

  return allData;
}

async function saveDataToDatabase(carDataArray) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const insertQuery = `
            INSERT INTO car_catalog (
                make_model_name, engine_type, fuel_type, cylinders, size, horsepower_hp,
                horsepower_rpm, torque_ft_lbs, torque_rpm, valves, valve_timing, cam_type,
                drive_type, transmission, make_model_id, year, trim_name, description, msrp,
                invoice, make_name, created_at, modified_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
                $17, $18, $19, $20, $21, $22, $23)
        `;

    for (const item of carDataArray) {
      // Direct properties
      const {
        engine_type,
        fuel_type,
        cylinders,
        size,
        horsepower_hp,
        horsepower_rpm,
        torque_ft_lbs,
        torque_rpm,
        valves,
        valve_timing,
        cam_type,
        drive_type,
        transmission,
      } = item;

      // Assuming `make_model_trim` is a property of `item` and contains the nested data
      const {
        make_model_id,
        year,
        name: trim_name,
        description,
        msrp,
        invoice,
        make_model: {
          name: make_model_name,
          make: { name: make_name },
        },
      } = item.make_model_trim;

      const values = [
        make_model_name,
        engine_type,
        fuel_type,
        cylinders,
        size,
        horsepower_hp,
        horsepower_rpm,
        torque_ft_lbs,
        torque_rpm,
        valves,
        valve_timing,
        cam_type,
        drive_type,
        transmission,
        make_model_id,
        year,
        trim_name,
        description,
        msrp,
        invoice,
        make_name,
        new Date(), // Assuming NOW() for created_at
        new Date(), // Assuming NOW() for modified_at
      ];

      await client.query(insertQuery, values);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error during database transaction:", error);
  } finally {
    client.release();
  }
}

// Assume fetchDataFromAPI() returns the array directly or an object containing the array
async function main() {
  try {
    const carDataArray = await fetchDataFromAPI(); // This should be the array

    if (!Array.isArray(carDataArray)) {
      throw new Error("Data is not iterable. Expected an array of car data.");
    }

    await saveDataToDatabase(carDataArray);
    console.log("Data fetching and storing complete.");
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

main();
*/
