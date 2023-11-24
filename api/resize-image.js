const sharp = require("sharp");
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust this in production
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept");
  res.setHeader("Access-Control-Allow-Origin", "https://www.swamiphoto.com");

  // OPTIONS request handling
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Assuming the request contains a JSON body with an image URL
    const { imageUrl } = req.body;

    const response = await fetch(imageUrl);
    const imageBuffer = await response.buffer();

    const resizedImage = await sharp(imageBuffer).resize(300, 200).toBuffer();

    res.setHeader("Content-Type", "image/jpeg");
    res.send(resizedImage);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Error processing image" });
  }
};
