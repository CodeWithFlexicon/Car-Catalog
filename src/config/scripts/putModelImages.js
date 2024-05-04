const { pool } = require("../configPg");

const images = [
  {
    name: "ILX",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/13357/2020-Acura-ILX-front_13357_032_2400x1800_WX.png",
  },
  {
    name: "2 Series",
    imageUrl:
      "https://65e81151f52e248c552b-fe74cd567ea2f1228f846834bd67571e.ssl.cf1.rackcdn.com/ldm-images/2020-BMW-2-Series-Gran-Coupe-Hero.png",
  },
  {
    name: "200",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/04/2017-chrysler-200-limited-platinum-sedan-angular-front.png",
  },
];

const insertModelImageQuery = `
  UPDATE make_models
  SET imageurl = data.imageurl 
  FROM (
    VALUES
      ${images
        .map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
        .join(", ")}
  ) AS data(name, imageurl)
  WHERE make_models.name = data.name;
`;

async function insertImages() {
  const client = await pool.connect();

  try {
    const params = images.reduce(
      (acc, item) => [...acc, item.name, item.imageUrl],
      []
    );

    await client.query(insertModelImageQuery, params);
    console.log("Image URLs successfully inserted");
  } catch (err) {
    console.error("Error inserting image URLs:", err);
  } finally {
    client.release();
  }
}

insertImages();
