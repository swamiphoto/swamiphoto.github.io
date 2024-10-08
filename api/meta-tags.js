const bucketUrl = "https://storage.googleapis.com/swamiphoto";
export default async function handler(req, res) {
  const { slug } = req.query;

  const galleryData = [
    {
      name: "Hike with Naga and Bharath",
      description: "An adventurous hike with Naga and Bharath.",
      thumbnailUrl: `${bucketUrl}/photos/portraits/sunol/AR501526.jpg`,
      slug: "naga-sunol",
      imagesFolderUrl: "portraits/sunol",
      layout: "masonry",
      enableSlideshow: true,
      slideshowSettings: {
        customDurations: { 24: 7000 },
        youtubeLinks: ["https://www.youtube.com/watch?v=PYujyluMxMU", "https://www.youtube.com/watch?v=qj4RiKoARPk"],
        captions: {
          24: "Photographer's favorite. Possibly my all time favorite.",
        },
        coverImageIndex: 24,
        mobileCoverImageIndex: 21,
        layout: "kenburns",
      },
      enableClientView: true,
      clientSettings: {
        clientLogin: "rattlesnake", // Encrypted password
        clientMessage: "Hello Naga & Bharath, here are some additional images — only you can see them. If you'd like to print any of these, send me the image urls so I can fine-tune them a bit more. Let me know your favorites!",
      },
    },
    {
      name: "Sunflowers with Naga",
      description: "A dreamy evening with the sunflowers in Woodland.",
      thumbnailUrl: `${bucketUrl}/photos/portraits/naga-sunflowers/AR500896.jpg`,
      slug: "naga-sunflowers",
      imagesFolderUrl: "portraits/naga-sunflowers",
      layout: "masonry",
      enableSlideshow: true,
      slideshowSettings: {
        youtubeLinks: ["https://www.youtube.com/watch?v=qj4RiKoARPk"],
        layout: "kenburns",
      },
      enableClientView: true,
      clientSettings: {
        clientLogin: "wisteria", // Encrypted password
        clientMessage: "Hello Naga, here are some additional images — only you can see them. If you'd like to print any of these, send me the image urls so I can fine-tune them a bit more. Let me know your favorites!",
      },
    },
    {
      name: "California",
      description: "Possibly the most beautiful place on earth.",
      thumbnailUrl: `${bucketUrl}/photos/landscapes/california/AR501858.jpg`,
      slug: "california",
      imagesFolderUrl: "landscapes/california",
      layout: "masonry",
      enableSlideshow: true,
      slideshowSettings: {
        youtubeLinks: ["https://www.youtube.com/watch?v=1opgh7ky2nU", "https://www.youtube.com/watch?v=hes6FYmLXmQ"],
      },
    },
    {
      name: "Lavender Fields with Naga",
      thumbnailUrl: `${bucketUrl}/photos/portraits/naga-lavendar/DSCF6486-Edit.jpg`,
      slug: "naga-lavendar",
      description: "A purple evening with Naga's fmaily in the lavender fields.",
      imagesFolderUrl: "portraits/naga-lavendar",
      layout: "masonry",
      enableSlideshow: true,
    },
    {
      name: "Japan",
      thumbnailUrl: `${bucketUrl}/photos/landscapes/japan/DSC00179-Edit-4.jpg`,
      slug: "japan",
      description: "A collection of images from Japan.",
      imagesFolderUrl: "landscapes/japan",
      layout: "horizontal",
    },
    {
      name: "Anagha",
      thumbnailUrl: `${bucketUrl}/photos/portraits/anagha/DSC_0068.jpg`,
      slug: "anagha",
      description: "Forgot how good a poser Anagha was as a kid!",
      imagesFolderUrl: "portraits/anagha",
      layout: "masonry",
      enableSlideshow: true,
      slideshowSettings: {
        youtubeLinks: ["https://www.youtube.com/watch?v=_iktURk0X-A"],
        layout: "film-stack",
        duration: 5000,
      },
      enableClientView: true,
      clientSettings: {
        clientLogin: "harmonium",
        clientMessage: "Hello Megha/Adithya, here are some additional images — only you can see them. If you'd like to print any of these, send me the image urls so I can fine-tune them a bit more. Let me know your favorites!",
      },
    },
    {
      name: "Anagha at Adobe Lodge",
      thumbnailUrl: `${bucketUrl}/photos/portraits/anagha2/DSC_1309-Edit.jpg`,
      slug: "anagha-family",
      description: "My first shoot with Anagha. She was a natural!",
      imagesFolderUrl: "portraits/anagha2",
      layout: "masonry",
      enableSlideshow: true,
      slideshowSettings: {
        youtubeLinks: ["https://www.youtube.com/watch?v=BeUSuSXBqMQ"],
        layout: "film-single",
      },
      enableClientView: true,
      clientSettings: {
        clientLogin: "harmonium",
        clientMessage: "Hello Megha/Adithya, here are some additional images — only you can see them. If you'd like to print any of these, send me the image urls so I can fine-tune them a bit more. Let me know your favorites!",
      },
    },
    {
      name: "Naga and Bharath",
      thumbnailUrl: `${bucketUrl}/photos/portraits/naga-stanford/DSC_9221-Edit-Edit.jpg`,
      slug: "naga-bharath",
      description: "My first shoot with Naga and Bharath. Naga was pregnant with Sathya",
      imagesFolderUrl: "portraits/naga-stanford",
      layout: "masonry",
      enableSlideshow: true,
      slideshowSettings: {
        youtubeLinks: ["https://www.youtube.com/watch?v=JkfSV51U-64"],
        layout: "kenburns",
      },
      enableClientView: true,
      clientSettings: {
        clientLogin: "sathya",
        clientMessage: "Hello Naga/Bharath...my first shoot with you...nostalgic! Here are the rest of the images only you can see.",
      },
    },
    {
      name: "Sathya",
      thumbnailUrl: `${bucketUrl}/photos/portraits/naga-adobe/DSC_5614.jpg`,
      slug: "sathya",
      description: "First shoot with Sathya.",
      imagesFolderUrl: "portraits/naga-adobe",
      layout: "masonry",
      enableSlideshow: true,
      slideshowSettings: {
        youtubeLinks: ["https://www.youtube.com/watch?v=puOnVzlkrQM"],
        layout: "film-stack",
        duration: 5000,
      },
      enableClientView: true,
      clientSettings: {
        clientLogin: "sathya",
        clientMessage: "Hello Naga/Bharath...these are the images from Adobe Lodge...our first shoot with Sathya! Here are the rest of the images only you can see.",
      },
    },
    {
      name: "Young Boy Sathya",
      thumbnailUrl: `${bucketUrl}/photos/portraits/naga-sanjose/_DSC0510.jpg`,
      slug: "young-boy-sathya",
      description: "Second shoot with Sathya.",
      imagesFolderUrl: "portraits/naga-sanjose",
      layout: "masonry",
      enableSlideshow: true,
      slideshowSettings: {
        youtubeLinks: ["https://www.youtube.com/watch?v=puOnVzlkrQM"],
        layout: "kenburns",
      },
      enableClientView: true,
      clientSettings: {
        clientLogin: "sathya",
        clientMessage: "Hello Naga/Bharath...here are all the images from our second shoot with Sathya!",
      },
    },
    {
      name: "Sathya and Sriman",
      thumbnailUrl: `${bucketUrl}/photos/portraits/naga-diablo/DSC_4122.jpg`,
      slug: "sathya-sriman",
      description: "Sriman's first shoot",
      imagesFolderUrl: "portraits/naga-diablo",
      layout: "masonry",
      enableSlideshow: true,
      slideshowSettings: {
        youtubeLinks: ["https://www.youtube.com/watch?v=hzGHrQBq_i4"],
        layout: "kenburns",
        duration: 9000,
      },
      enableClientView: true,
      clientSettings: {
        clientLogin: "sriman",
        clientMessage: "Hello Naga/Bharath...here are all the images from our first shoot with Sriman (Mt. Diablo)! Remember the fox?!",
      },
    },
    {
      name: "Traditional Sriman",
      thumbnailUrl: `${bucketUrl}/photos/portraits/naga-home/DSC_4265-2.jpg`,
      slug: "traditional-sriman",
      description: "Sriman in traditional attire",
      imagesFolderUrl: "portraits/naga-home",
      layout: "masonry",
      enableSlideshow: true,
      slideshowSettings: {
        youtubeLinks: ["https://www.youtube.com/watch?v=PYujyluMxMU"],
        layout: "film-single",
        duration: 7000,
      },
      enableClientView: true,
      clientSettings: {
        clientLogin: "nakedbaby",
        clientMessage: "Hello Naga/Bharath...here are all the images from the shoot we did at your previous place. Naked baby shots.",
      },
    },
    {
      name: "Sai Suma",
      thumbnailUrl: `${bucketUrl}/photos/portraits/saisuma/DSC_2769-Edit-Edit-2-Edit-Edit.jpg`,
      slug: "saisuma",
      description: "Modeling for Chiffon and Spice",
      imagesFolderUrl: "portraits/saisuma",
      layout: "masonry",
      enableSlideshow: true,
      slideshowSettings: {
        youtubeLinks: ["https://www.youtube.com/watch?v=PYujyluMxMU"],
        layout: "film-single",
        duration: 7000,
      },
      enableClientView: true,
      clientSettings: {
        clientLogin: "chiffon",
        clientMessage: "Hi Suma...here are a few more images from the shoot that only you can see.",
      },
    },
    {
      name: "Sathya and Ishuwar",
      thumbnailUrl: `${bucketUrl}/photos/portraits/sathya-ishuwar/DSC_9082.jpg`,
      slug: "sathyaishuwar",
      description: "Pre-wedding shoot",
      imagesFolderUrl: "portraits/sathya-ishuwar",
      layout: "masonry",
      enableSlideshow: true,
      slideshowSettings: {
        youtubeLinks: ["https://www.youtube.com/watch?v=6P5zx_rxlhI"],
        layout: "film-stack",
        duration: 7000,
      },
      enableClientView: true,
      clientSettings: {
        clientLogin: "stanford",
        clientMessage: "Hi Sathya/Ishuwar...so long ago and yet feels like yesterday! Here are more images only you can see.",
      },
    },
  ];

  const gallery = galleryData[slug];

  if (!gallery) {
    return res.status(404).json({ error: "Gallery not found" });
  }

  res.setHeader("Content-Type", "text/html");
  res.send(`
      <html>
        <head>
          <meta property="og:title" content="${gallery.name}" />
          <meta property="og:description" content="${gallery.description}" />
          <meta property="og:image" content="${gallery.thumbnailUrl}" />
          <meta property="og:url" content="https://swamiphoto.com/galleries/${slug}" />
          <meta property="twitter:title" content="${gallery.name}" />
          <meta property="twitter:description" content="${gallery.description}" />
          <meta property="twitter:image" content="${gallery.thumbnailUrl}" />
        </head>
        <body></body>
      </html>
    `);
}
