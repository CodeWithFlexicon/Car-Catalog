const { pool } = require("../configPg");

const insertModelImageQuery = `
  UPDATE make_models
  SET imageurl = data.imageurl 
  FROM (
    VALUES
      ()
  ) AS data(name, imageurl)
  WHERE make_models.name = data.name;
`;

async function insertImages() {
  const client = await pool.connect();

  try {
    await client.query(insertModelImageQuery);
    console.log("ImageURL's successfully inserted");
  } catch (err) {
    console.error("Error inserting imageURL's", err);
  } finally {
    client.release();
  }
}

insertImages();
