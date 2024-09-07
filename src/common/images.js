const bucketUrl = "https://storage.googleapis.com/swamiphoto"; // Base URL for your bucket
const apiKey = "AIzaSyB0Avp_4ydF9e0NFwE3qg8lbX2H0tQhCvs"; // Your Google Cloud API key

const IMAGES = {
  landscapes: {
    fog: `${bucketUrl}/photos/landscapes/fog.jpg`,
    fuzzyfall: `${bucketUrl}/photos/landscapes/fuzzyfall.jpg`,
    astro: `${bucketUrl}/photos/landscapes/astro.jpg`,
    bbridge: `${bucketUrl}/photos/landscapes/bbridge.jpg`,
    falltrees: `${bucketUrl}/photos/landscapes/falltrees.jpg`,
    kerala: `${bucketUrl}/photos/landscapes/kerala.jpg`,
    kerala2: `${bucketUrl}/photos/landscapes/kerala2.jpg`,
    mac: `${bucketUrl}/photos/landscapes/mac.jpg`,
    pastel: `${bucketUrl}/photos/landscapes/pastel.jpg`,
    ghost: `${bucketUrl}/photos/landscapes/ghost.jpg`,
    paris: `${bucketUrl}/photos/landscapes/paris.jpeg`,
    comet: `${bucketUrl}/photos/landscapes/comet.jpeg`,
    esierra: `${bucketUrl}/photos/landscapes/esierra.jpeg`,
    hotcreek: `${bucketUrl}/photos/landscapes/hotcreek.jpeg`,
    walton: `${bucketUrl}/photos/landscapes/walton.jpeg`,
    alviso: `${bucketUrl}/photos/landscapes/alviso.jpeg`,
    alviso2: `${bucketUrl}/photos/landscapes/alviso2.jpeg`,
    gateway: `${bucketUrl}/photos/landscapes/gatewayofindia.jpg`,
  },
  portraits: {
    amrita: `${bucketUrl}/photos/portraits/amrita.jpeg`,
    amrita2: `${bucketUrl}/photos/portraits/amrita2.jpeg`,
    mala: `${bucketUrl}/photos/portraits/mala.jpeg`,
    mala2: `${bucketUrl}/photos/portraits/mala2.jpeg`,
    mala3: `${bucketUrl}/photos/portraits/mala3.jpeg`,
    naga: `${bucketUrl}/photos/portraits/naga.jpeg`,
    naga2: `${bucketUrl}/photos/portraits/naga2.jpg`,
    suma: `${bucketUrl}/photos/portraits/suma.jpeg`,
    suma2: `${bucketUrl}/photos/portraits/suma2.jpeg`,
  },
  bollywood: {
    alia: `${bucketUrl}/photos/bollywood/alia.jpg`,
    atif: `${bucketUrl}/photos/bollywood/atif.jpeg`,
    bollywood: `${bucketUrl}/photos/bollywood/bollywood.jpeg`,
    dance: `${bucketUrl}/photos/bollywood/dance.jpeg`,
    glamour: `${bucketUrl}/photos/bollywood/glamour.jpeg`,
    katrina: `${bucketUrl}/photos/bollywood/katrina.jpeg`,
    katrina2: `${bucketUrl}/photos/bollywood/katrina2.jpeg`,
    nargis: `${bucketUrl}/photos/bollywood/nargis.jpeg`,
    nargis2: `${bucketUrl}/photos/bollywood/nargis2.jpeg`,
    nargis3: `${bucketUrl}/photos/bollywood/nargis3.jpeg`,
    prabhu: `${bucketUrl}/photos/bollywood/prabhu.jpeg`,
    shreya: `${bucketUrl}/photos/bollywood/shreya.jpeg`,
  },
  tennis: {
    federer: {
      fed1: `${bucketUrl}/photos/tennis/federer/fed1.jpg`,
      fed2: `${bucketUrl}/photos/tennis/federer/fed2.jpg`,
      fed3: `${bucketUrl}/photos/tennis/federer/fed3.jpg`,
      fed4: `${bucketUrl}/photos/tennis/federer/fed4.jpg`,
      fed5: `${bucketUrl}/photos/tennis/federer/fed5.jpg`,
      fed6: `${bucketUrl}/photos/tennis/federer/fed6.jpeg`,
      fed7: `${bucketUrl}/photos/tennis/federer/fed7.jpeg`,
      fed8: `${bucketUrl}/photos/tennis/federer/fed8.jpeg`,
      fed9: `${bucketUrl}/photos/tennis/federer/fed9.jpeg`,
      fed10: `${bucketUrl}/photos/tennis/federer/fed10.jpeg`,
      fed11: `${bucketUrl}/photos/tennis/federer/fed11.jpeg`,
      fed12: `${bucketUrl}/photos/tennis/federer/fed12.jpeg`,
      fed13: `${bucketUrl}/photos/tennis/federer/fed13.jpeg`,
      fed14: `${bucketUrl}/photos/tennis/federer/fed14.jpeg`,
    },
    novak: `${bucketUrl}/photos/tennis/novak.jpeg`,
    osaka: `${bucketUrl}/photos/tennis/osaka.jpeg`,
    dimitrov: `${bucketUrl}/photos/tennis/dimitrov.jpeg`,
    grateful: `${bucketUrl}/photos/tennis/grateful.jpeg`,
    venus: `${bucketUrl}/photos/tennis/venus.jpeg`,
  },
  headshots: {
    naga: `${bucketUrl}/photos/headshots/naga.jpg`,
    naga2: `${bucketUrl}/photos/headshots/naga2.jpg`,
    naga3: `${bucketUrl}/photos/headshots/naga3.jpg`,
    mala: `${bucketUrl}/photos/headshots/mala.jpg`,
    mala2: `${bucketUrl}/photos/headshots/mala2.jpg`,
    sudha: `${bucketUrl}/photos/headshots/sudha.jpg`,
    sudha2: `${bucketUrl}/photos/headshots/sudha2.jpg`,
    sudha3: `${bucketUrl}/photos/headshots/sudha3.jpg`,
    ashwini: `${bucketUrl}/photos/headshots/ashwini.jpg`,
    ashwini2: `${bucketUrl}/photos/headshots/ashwini2.jpeg`,
    vijay: `${bucketUrl}/photos/headshots/vijay.jpg`,
    vmirpuri: `${bucketUrl}/photos/headshots/vmirpuri.jpg`,
    raj: `${bucketUrl}/photos/headshots/raj.jpg`,
    searce1: `${bucketUrl}/photos/headshots/searce1.jpg`,
    searce2: `${bucketUrl}/photos/headshots/searce2.jpg`,
    searce3: `${bucketUrl}/photos/headshots/searce3.jpg`,
    searce4: `${bucketUrl}/photos/headshots/searce4.jpg`,
    searce5: `${bucketUrl}/photos/headshots/searce5.jpg`,
    searce6: `${bucketUrl}/photos/headshots/searce6.jpg`,
    searce7: `${bucketUrl}/photos/headshots/searce7.jpg`,
  },
  me: `${bucketUrl}/photos/me.jpeg`,
};

// Generate a deterministic unique ID for each image based on its key and category
const generateUniqueId = (key) => {
  return key; // Simply return the key as the unique ID
};

// Generate a mapping of unique IDs to image URLs
const generateImageMapping = (images) => {
  const mapping = {};

  const createMapping = (imageObj) => {
    Object.keys(imageObj).forEach((key) => {
      if (typeof imageObj[key] === "string") {
        const uniqueId = generateUniqueId(key); // Use the key directly
        mapping[uniqueId] = imageObj[key];
      } else {
        createMapping(imageObj[key]);
      }
    });
  };

  Object.keys(images).forEach((category) => {
    createMapping(images[category]);
  });

  console.log(mapping);
  return mapping;
};
const imageMapping = generateImageMapping(IMAGES);

const fetchImageUrls = async (folder) => {
  try {
    const response = await fetch(`https://storage.googleapis.com/storage/v1/b/swamiphoto/o?prefix=photos/${folder}/&key=${apiKey}`);
    const data = await response.json();
    const urls = data.items
      .filter((item) => item.name.match(/\.(jpg|jpeg|png|gif)$/i)) // Filter out non-image URLs
      .map((item) => `${bucketUrl}/${item.name}`);
    return urls;
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    return [];
  }
};

export default IMAGES;
export { imageMapping, fetchImageUrls, generateUniqueId };
