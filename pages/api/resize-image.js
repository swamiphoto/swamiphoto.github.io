const sharp = require("sharp");
const fetch = require("node-fetch");

export default async function handler(req, res) {
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

  let imageUrl, cleanImageUrl;
  
  try {
    // Support both GET (query params) and POST (body) for backward compatibility
    let width, quality;
    
    // Check if client supports WebP
    const acceptsWebP = req.headers.accept && req.headers.accept.includes("image/webp");
    
    if (req.method === "GET") {
      // GET request: extract from query parameters
      imageUrl = req.query.url || req.query.imageUrl;
      width = req.query.width ? parseInt(req.query.width) : null;
      // Reduce default quality for faster loading (75 is a good balance)
      quality = req.query.quality ? parseInt(req.query.quality) : 75;
    } else {
      // POST request: extract from body (backward compatibility)
      imageUrl = req.body.imageUrl || req.body.url;
      width = req.body.width ? parseInt(req.body.width) : null;
      quality = req.body.quality ? parseInt(req.body.quality) : 75;
    }

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    // Clean up imageUrl - remove cloudimg.io prefix if present
    cleanImageUrl = imageUrl.replace(/^https?:\/\/[^\/]+\.cloudimg\.io\//, "");
    
    // If it doesn't start with http, add it
    if (!cleanImageUrl.startsWith("http")) {
      cleanImageUrl = `https://${cleanImageUrl}`;
    }

    // Fetch the image
    const response = await fetch(cleanImageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }
    
    // Get image buffer - node-fetch v2 uses .buffer() method
    const imageBuffer = await response.buffer();

    // Process with Sharp
    let sharpInstance = sharp(imageBuffer);

    // Apply width if specified (maintains aspect ratio)
    if (width) {
      sharpInstance = sharpInstance.resize(width, null, {
        withoutEnlargement: true, // Don't enlarge images smaller than requested width
        fit: "inside", // Maintain aspect ratio
        fastShrinkOnLoad: true, // Faster processing for large images
      });
    }

    // Determine output format - prefer WebP if supported (much smaller files)
    const originalFormat = cleanImageUrl.match(/\.(jpg|jpeg|png|webp|gif)$/i)?.[1]?.toLowerCase() || "jpeg";
    const useWebP = acceptsWebP && originalFormat !== "gif"; // Use WebP if supported, except for GIFs
    
    let outputBuffer;
    if (useWebP) {
      // WebP provides much better compression (30-50% smaller files)
      outputBuffer = await sharpInstance
        .webp({ 
          quality: quality,
          effort: 4, // Balance between compression and speed (0-6, 4 is good)
        })
        .toBuffer();
      res.setHeader("Content-Type", "image/webp");
    } else if (originalFormat === "png") {
      outputBuffer = await sharpInstance
        .png({ 
          compressionLevel: 9, // Maximum compression (0-9)
        })
        .toBuffer();
      res.setHeader("Content-Type", "image/png");
    } else {
      // JPEG with optimized settings for smaller file sizes
      outputBuffer = await sharpInstance
        .jpeg({ 
          quality: quality,
          progressive: true, // Progressive JPEG loads faster (shows low-res first)
          // mozjpeg: true, // Only if mozjpeg is installed (commented out for compatibility)
        })
        .toBuffer();
      res.setHeader("Content-Type", "image/jpeg");
    }

    // Cache headers for better performance
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

    res.send(outputBuffer);
  } catch (error) {
    console.error("Error processing image:", error);
    console.error("Image URL:", cleanImageUrl || imageUrl);
    // For image requests, we should return a proper error response
    // Since this is called from img src, we'll return a 500 status
    // The browser will show a broken image icon, which is acceptable
    res.status(500).json({ 
      message: "Error processing image", 
      error: error.message,
      url: cleanImageUrl || imageUrl || "unknown"
    });
  }
}

