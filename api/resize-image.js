const sharp = require("sharp");
const fetch = require("node-fetch"); // You'll need to install node-fetch if you don't already have it

module.exports = async (req, res) => {
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
