import React from "react";
import Link from "next/link"; // Next.js client-side routing
import Hero from "../components/hero/Hero";
import { bucketUrl, getCloudimageUrl } from "../common/images";
import Head from "next/head";

const galleryData = [
  {
    name: "Admin",
    slug: "admin",
    imagesFolderUrl: "landscapes",
    isHidden: true,
  },
  {
    name: "Sunol Ridge",
    description: "I wanted to test my new Sigma 85mm portrait lens and asked Naga if she'd be my test model. We ended up hiking with her entire family and captured some shots after an hour-long hike up Sunol Ridge.",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/sunol/AR501526.jpg?width=500&quality=80`,
    slug: "naga-sunol",
    blocks: [
      {
        type: "masonry",
        imagesFolderUrl: "portraits/sunol",
      },
    ],
    layout: "stacked",
    showCover: true,
    enableSlideshow: true,
    slideshowSettings: {
      customDurations: { 24: 7000 },
      youtubeLinks: ["https://www.youtube.com/watch?v=PYujyluMxMU", "https://www.youtube.com/watch?v=qj4RiKoARPk"],
      captions: {
        // 24: "Photographer's favorite. Possibly my all time favorite.",
      },
      coverImageIndex: 24,
      mobileCoverImageIndex: 21,
      layout: "film-single",
    },
    enableClientView: true,
    clientSettings: {
      clientLogin: "wisteria",
      clientMessage: "Hello Naga & Bharath, here are some additional images — only you can see them. If you'd like to print any of these, send me the image urls so I can fine-tune them a bit more. Let me know your favorites!",
    },
  },
  {
    name: "Sunflower Portraits",
    description: "A dreamy evening with the sunflowers in Woodland. We were at the tailend of the sunflower season and took a chance to drive a couple hours to see them, but the light was perfect and the flowers were still in bloom.",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/naga-sunflowers/AR500896.jpg?width=500&quality=80`,
    slug: "naga-sunflowers",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "portraits/naga-sunflowers",
      },
    ],
    layout: "stacked",
    enableSlideshow: true,
    showCover: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=qj4RiKoARPk"],
      layout: "kenburns",
    },
    enableClientView: true,
    clientSettings: {
      clientLogin: "wisteria",
      clientMessage: "Hello Naga, here are some additional images — only you can see them. If you'd like to print any of these, send me the image urls so I can fine-tune them a bit more. Let me know your favorites!",
    },
  },
  {
    name: "Arizona",
    description: "I took a trip to Arizona with my friends, and we visited Sedona, Grand Canyon, Antelope Canyon, and Horseshoe Bend. I can't believe I've never been to Page having been in AZ since 1998.",
    thumbnailUrl: "https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/landscapes/arizona/AR503763-Enhanced-NR.jpg?width=500&quality=80",
    slug: "arizona",
    blocks: [
      {
        type: "text",
        content: "This is a text block that sits between galleries.",
      },
      {
        type: "stacked",
        imageUrls: ["https://storage.googleapis.com/swamiphoto/photos/landscapes/arizona/AR503763-Enhanced-NR.jpg", "https://storage.googleapis.com/swamiphoto/photos/landscapes/arizona/AR503809-Edit.jpg"],
      },
      {
        type: "masonry",
        imagesFolderUrl: "landscapes/arizona",
      },
      {
        type: "text",
        content: "This is a text block that sits between galleries.",
      },
    ],
    enableSlideshow: true,
    showCover: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=IvoAT-5HKwM"],
      layout: "kenburns",
    },
    isHidden: true,
  },
  {
    name: "Beautiful California",
    description:
      "California is pure magic. Whether it's the dramatic coastline, the rolling golden hills, or the towering forests, every corner feels like a world of its own. This gallery is a celebration of the landscapes that never fail to leave me in awe—scenes that remind me just how special this place is.",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/landscapes/california/AR501858.jpg?width=500&quality=80`,
    slug: "california",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "landscapes/california",
      },
    ],
    enableSlideshow: true,
    layout: "masonry",
    showCover: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=BciS5krYL80"],
      duration: 6000,
    },
  },
  {
    name: "Lavender",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/naga-lavendar/DSCF6486-Edit.jpg?width=500&quality=80`,
    slug: "naga-lavendar",
    description: "We took a drive an hour and a half north to photograph Naga's family in the beautiful lavender fields. Mala joined me, and it was our first time going out after the lockdown, which made the evening feel extra special and refreshing.",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "portraits/naga-lavendar",
      },
    ],
    enableSlideshow: true,
    enableClientView: true,
    clientSettings: {
      clientLogin: "wisteria",
      clientMessage: "Hi Naga, here are all the Lavendar images — send me the URLs of the ones you like, I'll make them public.",
    },
  },
  {
    name: "Japan",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/landscapes/japan/DSC00179-Edit-4.jpg?width=500&quality=80`,
    slug: "japan",
    description:
      "I didn't take a whole lot of photos in Japan, as I was traveling with Mala. It was funny...I visited the temples and other sites twice: once early in the morning as a photographer avoiding crowds, and again later in the day with Mala for sightseeing. Two trips to each sight...and worth it!",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "landscapes/japan",
      },
    ],
  },
  {
    name: "Anagha",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/anagha/DSC_0068.jpg?width=500&quality=80`,
    slug: "anagha",
    description: "Forgot how good a poser Anagha was as a kid!",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "portraits/anagha",
      },
    ],
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
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/anagha2/DSC_1309-Edit.jpg?width=500&quality=80`,
    slug: "anagha-family",
    description: "My first shoot with Anagha. She was a natural!",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "portraits/anagha2",
      },
    ],
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
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/naga-stanford/DSC_9221-Edit-Edit.jpg?width=500&quality=80`,
    slug: "naga-bharath",
    description: "My first shoot with Naga and Bharath. Naga was pregnant with Sathya",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "portraits/naga-stanford",
      },
    ],
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=JkfSV51U-64"],
      layout: "kenburns",
    },
    enableClientView: true,
    clientSettings: {
      clientLogin: "wisteria",
      clientMessage: "Hello Naga/Bharath...my first shoot with you...nostalgic! Here are the rest of the images only you can see.",
    },
  },
  {
    name: "Sathya",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5614.jpg?width=500&quality=80`,
    slug: "sathya",
    description: "First shoot with Sathya.",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "portraits/naga-adobe",
      },
    ],
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=puOnVzlkrQM"],
      layout: "film-stack",
      duration: 5000,
    },
    enableClientView: true,
    clientSettings: {
      clientLogin: "wisteria",
      clientMessage: "Hello Naga/Bharath...these are the images from Adobe Lodge...our first shoot with Sathya! Here are the rest of the images only you can see.",
    },
  },
  {
    name: "Young Boy Sathya",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/_DSC0510.jpg?width=500&quality=80`,
    slug: "young-boy-sathya",
    description: "Second shoot with Sathya.",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "portraits/naga-sanjose",
      },
    ],
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=puOnVzlkrQM"],
      layout: "kenburns",
    },
    enableClientView: true,
    clientSettings: {
      clientLogin: "wisteria",
      clientMessage: "Hello Naga/Bharath...here are all the images from our second shoot with Sathya!",
    },
  },
  {
    name: "Sathya and Sriman",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/naga-diablo/DSC_4122.jpg?width=500&quality=80`,
    slug: "sathya-sriman",
    description: "Sriman's first shoot",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "portraits/naga-diablo",
      },
    ],
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=hzGHrQBq_i4"],
      layout: "kenburns",
      duration: 9000,
    },
    enableClientView: true,
    clientSettings: {
      clientLogin: "wisteria",
      clientMessage: "Hello Naga/Bharath...here are all the images from our first shoot with Sriman (Mt. Diablo)! Remember the fox?!",
    },
  },
  {
    name: "Traditional Sriman",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/naga-home/DSC_4265-2.jpg?width=500&quality=80`,
    slug: "traditional-sriman",
    description: "Sriman in traditional attire",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "portraits/naga-home",
      },
    ],
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=PYujyluMxMU"],
      layout: "film-single",
      duration: 7000,
    },
    enableClientView: true,
    clientSettings: {
      clientLogin: "wisteria",
      clientMessage: "Hello Naga/Bharath...here are all the images from the shoot we did at your previous place. Naked baby shots.",
    },
  },
  {
    name: "Sai Suma",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/saisuma/DSC_2769-Edit-Edit-2-Edit-Edit-Edit.jpg?width=500&quality=80`,
    slug: "saisuma",
    description: "Modeling for Chiffon and Spice",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "portraits/saisuma",
      },
    ],
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
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/sathya-ishuwar/DSC_9082.jpg?width=500&quality=80`,
    slug: "sathyaishuwar",
    description: "Pre-wedding shoot",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "portraits/sathya-ishuwar",
      },
    ],
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
  {
    name: "The Journey",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/_DSC0510.jpg?width=500&quality=80`,
    slug: "naga-journey",
    description:
      "The first time I photographed Naga and Bharath, Naga was pregnant with Sathya. A couple of years later, I captured them again when Sathya was two. Then Sriman came along, and we added a few more memories to the collection. Now, Sathya is seven, and Sriman is four, and every time we meet, they are eager to play soccer with me. This is what I love about photography—I'm part of their journey!",
    imageUrls: [
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-stanford/DSC_9185-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-stanford/DSC_9214-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-stanford/DSC_9227-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-stanford/DSC_9222-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-stanford/DSC_9221-Edit-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-stanford/DSC_9283.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-stanford/DSC_9322.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-stanford/DSC_9265-Edit-Edit.jpg",

      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/protected/DSC_5761-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5529.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5566-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/protected/DSC_5801.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5568.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5571-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5567-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5613-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5581-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5626.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5634.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5642.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5691.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5636-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5725.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5739.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5825-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5728.jpg",

      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/DSC_1821.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/DSC_1862.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/DSC_1844.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/DSC_1852.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/DSC_1887.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/DSC_1943.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/DSC_2112.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/DSC_2120.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/_DSC0222.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/DSC_2131.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/DSC_2121.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/_DSC0225-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/_DSC0353.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/_DSC0510.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/DSC_2190.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/_DSC0438.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/_DSC0537-Edit-2.jpg",

      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-diablo/DSC_4122.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-diablo/DSC_4278-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-diablo/DSC_4307.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-diablo/DSC_4236-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-diablo/DSC_4175-Edit-2.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-diablo/DSC_4154-Edit-2.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-diablo/DSC_4284-Edit-Edit-2.jpg",

      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-home/DSC_4212.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-home/DSC_4187-Edit-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-home/DSC_4260.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-home/DSC_4293-Edit-2.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-home/DSC_4265-2.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-home/DSC_4302.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-home/DSC_4338.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-home/DSC_4354.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-home/DSC_4433.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-home/DSC_4449.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-home/protected/DSCF1442-2.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-home/protected/DSC_4154.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-home/protected/DSC_4169.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-home/protected/DSC_4635.jpg",

      "https://storage.googleapis.com/swamiphoto/photos/portraits/sunol/AR501414.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/sunol/AR501496.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/sunol/AR501499.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/sunol/AR501527.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/sunol/AR501490.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/sunol/AR501531.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/sunol/AR501674.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/sunol/AR501666.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/sunol/AR501715.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/sunol/AR501702.jpg",

      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sunflowers/AR500960-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sunflowers/AR500940-Edit-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sunflowers/AR500885-Edit-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sunflowers/AR500795-Edit-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sunflowers/AR500896.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sunflowers/AR501135-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sunflowers/AR501260.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-journey/IMG_3274-2.jpg",

      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-lavendar/DSCF6486-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-lavendar/DSC_5374-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-lavendar/DSC_5266-Edit.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-lavendar/DSC_5024.jpg",
      "https://storage.googleapis.com/swamiphoto/photos/portraits/naga-lavendar/DSC_5118-Edit.jpg",
    ],
    texts: {
      1: 'It was 2017. I got a call from Naga. She said, "I love your photos! Can we do a maternity shoot?" I\'d never done one before. I said, "sure, let\'s give it a shot."',
      3: "We met at Stanford, and Naga was glowing. Bharath was visibly excited. They were so natural together, and their chemistry was amazing to capture. These are still some of my favorite images.",
      6: 'After the shoot, Naga asked me, "Can we book you for 3, 6, and 9-month shoots?" She hadn\'t even seen the images yet but trusted me.',
      8: "Sathya was born. We did a shoot soon after at Adobe lodge. Sathya was a natural...he was so comfortable in front of the camera.",
      24: "Naga loves wisterias. We found a bunch and took a shot. Coz, why not.",
      26: "Sathya turned two, and it was time for another shoot. This time, we chose a spot near the Japanese gardens in San Jose.",
      43: "Sriman was born. It was peak of Covid, but we decided on a shoot at Mt. Diablo.",
      50: "A few months later, we did another shoot, this time at their home. Sriman looked so adorable in traditional attire!",
      63: "What's a photoshoot without some naked baby shots?",
      65: "Some of my favorite mother and son portraits. These aren't technically perfect—even the lighting isn't great...but, there's something about them I love. I think they remind me of me and my mom.",
      70: "There's always time for a few couple and solo shots!",
      75: "We'd talked about doing a sunflower shoot for years, and we finally made it happen. It was the tail end of the season, and we took a chance with a two-hour drive. But the light was perfect, and the flowers were still in bloom.",
      82: "Hope you enjoyed the show. This is what photography is to me. It's not the lighting, or the composition, or the gear. It's the connection. It's becoming a part of their journey.",
      83: "Almost forgot...we did a lavender shoot too! It was the first time Mala and I took a trip after the lockdown.",
    },
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=hzGHrQBq_i4"],
    },
    isHidden: true,
  },
  {
    name: "Atif Aslam",
    thumbnailUrl: `https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_4986 2.jpg`,
    slug: "atifaslam",
    description: "I loved shooting Atif. He is a blend of charm, style, class, and pure talent.",
    blocks: [
      {
        type: "stacked",
        imageUrls: [
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5061 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_4986 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5166 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5274 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5334 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5095 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5201 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5306 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5374 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5392 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5389 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5612 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5549 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5616 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5466 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5342 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5345 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5309 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5276 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5174 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5151 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5151 2.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/sonu-atif/DSC_5065 2.jpg",
        ],
      },
    ],
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=qmBW9-fUvag"],
    },
  },
  {
    name: "Prabhu Deva",
    thumbnailUrl: `https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_6844.jpg`,
    slug: "prabhudeva",
    description: "I grew up watching Prabhhu Deva, who's known as the Michael Jackson of India. It was surreal to see him dance in person.",
    blocks: [
      {
        type: "stacked",
        imageUrls: [
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_6843.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_6844.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_6850.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_6847.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_6870.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_6852.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_6845.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_6884.jpg",
        ],
      },
    ],
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=S61L1fpqFXE"],
    },
  },
  {
    name: "Katrina Kaif",
    thumbnailUrl: `https://storage.googleapis.com/swamiphoto/photos/bollywood/katrina.jpeg`,
    slug: "katrinakaif",
    description: "Katrina Kaif is a Bollywood actress, possibly the most famous. Her stunning looks, graceful presence, and playful energy were a treat to the lens.",
    blocks: [
      {
        type: "stacked",
        imageUrls: [
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/katrina.jpeg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/katrina2.jpeg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_7054.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_7037.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_7054.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_7138.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_7148.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_7055.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_7090.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_7042.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_7103.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_7066.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_7449.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_7450.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/bollywood/dabaang/DSC_7456.jpg",
        ],
      },
    ],
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=ZTmF2v59CtI"],
      layout: "film-single",
      duration: 5000,
    },
  },
  {
    name: "Classical Dance",
    thumbnailUrl: `https://storage.googleapis.com/swamiphoto/photos/portraits/sudha/DSC_0041.jpg`,
    slug: "classicaldance",
    description: "Sudha's fundraiser dance performance for Access Braille",
    blocks: [
      {
        type: "stacked",
        imageUrls: [
          "https://storage.googleapis.com/swamiphoto/photos/portraits/sudha/DSC_0041.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/portraits/sudha/DSC_0032.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/portraits/sudha/DSC_0034.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/portraits/sudha/DSC_0036.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/portraits/sudha/DSC_0037.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/portraits/sudha/DSC_0050.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/portraits/sudha/DSC_0057.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/portraits/sudha/DSC_0070.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/portraits/sudha/DSC_0078.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/portraits/sudha/DSC_0076.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/portraits/sudha/DSC_0072.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/portraits/sudha/DSC_0109.jpg",
        ],
      },
    ],
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=LD5W8W7-0II"],
    },
  },
  {
    name: "Pacific Coast Rocks ",
    thumbnailUrl: `https://storage.googleapis.com/swamiphoto/photos/landscapes/colorful-rocks/DSCF1412.jpg`,
    slug: "rocks",
    description: "The pacific coast highway is one long stretch of beautiful surprises. I found these colorful rocks on a random beach along the coast.",
    blocks: [
      {
        type: "stacked",
        imageUrls: [
          "https://storage.googleapis.com/swamiphoto/photos/landscapes/colorful-rocks/DSCF1406.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/landscapes/colorful-rocks/DSCF1412.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/landscapes/colorful-rocks/DSCF1411.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/landscapes/colorful-rocks/DSCF1408.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/landscapes/colorful-rocks/DSCF1415.jpg",
          "https://storage.googleapis.com/swamiphoto/photos/landscapes/colorful-rocks/DSCF1414.jpg",
        ],
      },
    ],
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=U1FZVpcKhGg"],
      layout: "film-single",
    },
  },
  {
    name: "Sarina",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/events/sarina-first-bday/AR502170.jpg?width=800&quality=80`,
    slug: "sarina-bday",
    description: "Birthday party at Broom street Ganesha temple",
    imagesFolderUrl: "events/sarina-first-bday",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "landscapes/california",
      },
    ],
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=g4M0hH1R2eU"],
    },
    isHidden: true,
  },
  {
    name: "Sarina",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/sarina/AR502585.jpg?width=800&quality=80`,
    slug: "sarina",
    description: "Portraits on Sarina's 1st birthday",
    imagesFolderUrl: "portraits/sarina",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "landscapes/california",
      },
    ],
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=mVsmFCgxc1o"],
      layout: "film-single",
    },
  },
  {
    name: "Nava Rasa",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/sudha-navarasa/AR503366-Edit-2-Edit.jpg`,
    slug: "sudha-nava-rasa",
    description: "Nava Rasa expressions by Sudha",
    imagesFolderUrl: "portraits/sudha-navarasa",
    blocks: [
      {
        type: "stacked",
        imagesFolderUrl: "landscapes/california",
      },
    ],
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=OBUauvQLrQQ"],
    },
  },
];

const stackVariants = [
  // Right bottom stack
  {
    first: "absolute -right-2 -bottom-2 w-full h-[400px] md:h-[500px] bg-gray-100 rotate-2 transition-transform duration-300 group-hover:translate-x-1 rounded-3xl",
    second: "absolute -right-1 -bottom-1 w-full h-[400px] md:h-[500px] bg-gray-50 rotate-1 transition-transform duration-300 group-hover:translate-x-0.5 rounded-3xl",
  },
  // Left bottom stack
  {
    first: "absolute -left-2 -bottom-2 w-full h-[400px] md:h-[500px] bg-gray-100 -rotate-2 transition-transform duration-300 group-hover:-translate-x-1 rounded-3xl",
    second: "absolute -left-1 -bottom-1 w-full h-[400px] md:h-[500px] bg-gray-50 -rotate-1 transition-transform duration-300 group-hover:-translate-x-0.5 rounded-3xl",
  },
  // Right top stack
  {
    first: "absolute -right-2 -top-2 w-full h-[400px] md:h-[500px] bg-gray-100 -rotate-2 transition-transform duration-300 group-hover:translate-x-1 rounded-3xl",
    second: "absolute -right-1 -top-1 w-full h-[400px] md:h-[500px] bg-gray-50 -rotate-1 transition-transform duration-300 group-hover:translate-x-0.5 rounded-3xl",
  },
  // Left top stack
  {
    first: "absolute -left-2 -top-2 w-full h-[400px] md:h-[500px] bg-gray-100 rotate-2 transition-transform duration-300 group-hover:-translate-x-1 rounded-3xl",
    second: "absolute -left-1 -top-1 w-full h-[400px] md:h-[500px] bg-gray-50 rotate-1 transition-transform duration-300 group-hover:-translate-x-0.5 rounded-3xl",
  },
];

const Galleries = () => {
  return (
    <>
      <Head>
        <title>Galleries — Swami Venkataramani</title>
      </Head>
      <main className="max-w-7xl mx-auto p-4">
        <Hero title="Galleries" showSubNav={false}>
          <p>A curated collection of galleries showcasing images from client sessions and personal shoots, including landscapes, portraits, travel, and more.</p>
        </Hero>

        <div className="space-y-8">
          {galleryData
            .filter((gallery) => !gallery.isHidden)
            .map((gallery) => {
              const stackStyle = stackVariants[Math.floor(Math.random() * stackVariants.length)];
              return (
                <Link href={`/galleries/${gallery.slug}`} key={gallery.name} className="flex flex-col md:flex-row gap-6 group hover:opacity-95 transition-opacity hover:no-underline">
                  <div className="relative md:w-7/12">
                    <div className="relative">
                      <div className={stackStyle.first}></div>
                      <div className={stackStyle.second}></div>
                      <div className="relative overflow-hidden shadow-lg rounded-3xl">
                        <img src={getCloudimageUrl(gallery.thumbnailUrl, { width: 1200, quality: 80 })} alt={gallery.name} className="w-full h-[400px] md:h-[500px] object-cover relative z-10 rounded-3xl" />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-5/12 space-y-3 py-2 flex flex-col justify-center text-left px-0 md:px-8">
                    <h2 className="text-4xl font-medium tracking-tight text-gray-900">{gallery.name}</h2>
                    {gallery.description && <p className="text-gray-600 text-xl">{gallery.description}</p>}
                  </div>
                </Link>
              );
            })}
        </div>
      </main>
    </>
  );
};

export default Galleries;
export { galleryData }; // Export gallery data for use in other components
