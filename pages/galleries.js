import React from "react";
import Link from "next/link"; // Next.js client-side routing
import Hero from "../components/hero/Hero";
import { bucketUrl, getCloudimageUrl } from "../common/images";
import Head from "next/head";

const galleryData = [
  {
    name: "Hike with Naga and Bharath",
    description: "An adventurous hike with Naga and Bharath.",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/sunol/AR501526.jpg?width=500&quality=80`,
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
      clientLogin: "wisteria",
      clientMessage: "Hello Naga & Bharath, here are some additional images — only you can see them. If you'd like to print any of these, send me the image urls so I can fine-tune them a bit more. Let me know your favorites!",
    },
  },
  {
    name: "Sunflowers with Naga",
    description: "A dreamy evening with the sunflowers in Woodland. We were at the tailend of the sunflower season and took a chance to drive a couple hours to see them, but the light was perfect and the flowers were still in bloom.",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/naga-sunflowers/AR500896.jpg?width=500&quality=80`,
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
      clientLogin: "wisteria",
      clientMessage: "Hello Naga, here are some additional images — only you can see them. If you'd like to print any of these, send me the image urls so I can fine-tune them a bit more. Let me know your favorites!",
    },
  },
  {
    name: "California",
    description:
      "California is pure magic. Whether it's the dramatic coastline, the rolling golden hills, or the towering forests, every corner feels like a world of its own. This gallery is a celebration of the landscapes that never fail to leave me in awe—scenes that remind me just how special this place is.",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/landscapes/california/AR501858.jpg?width=500&quality=80`,
    slug: "california",
    imagesFolderUrl: "landscapes/california",
    layout: "masonry",
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=BciS5krYL80"],
    },
  },
  {
    name: "Lavender Fields with Naga",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/naga-lavendar/DSCF6486-Edit.jpg?width=500&quality=80`,
    slug: "naga-lavendar",
    description: "A purple evening with Naga's fmaily in the lavender fields.",
    imagesFolderUrl: "portraits/naga-lavendar",
    layout: "masonry",
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
    description: "A collection of images from Japan.",
    imagesFolderUrl: "landscapes/japan",
    layout: "horizontal",
  },
  {
    name: "Anagha",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/anagha/DSC_0068.jpg?width=500&quality=80`,
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
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/anagha2/DSC_1309-Edit.jpg?width=500&quality=80`,
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
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/naga-stanford/DSC_9221-Edit-Edit.jpg?width=500&quality=80`,
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
      clientLogin: "wisteria",
      clientMessage: "Hello Naga/Bharath...my first shoot with you...nostalgic! Here are the rest of the images only you can see.",
    },
  },
  {
    name: "Sathya",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/naga-adobe/DSC_5614.jpg?width=500&quality=80`,
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
      clientLogin: "wisteria",
      clientMessage: "Hello Naga/Bharath...these are the images from Adobe Lodge...our first shoot with Sathya! Here are the rest of the images only you can see.",
    },
  },
  {
    name: "Young Boy Sathya",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/naga-sanjose/_DSC0510.jpg?width=500&quality=80`,
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
      clientLogin: "wisteria",
      clientMessage: "Hello Naga/Bharath...here are all the images from our second shoot with Sathya!",
    },
  },
  {
    name: "Sathya and Sriman",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/naga-diablo/DSC_4122.jpg?width=500&quality=80`,
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
      clientLogin: "wisteria",
      clientMessage: "Hello Naga/Bharath...here are all the images from our first shoot with Sriman (Mt. Diablo)! Remember the fox?!",
    },
  },
  {
    name: "Traditional Sriman",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/naga-home/DSC_4265-2.jpg?width=500&quality=80`,
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
      clientLogin: "wisteria",
      clientMessage: "Hello Naga/Bharath...here are all the images from the shoot we did at your previous place. Naked baby shots.",
    },
  },
  {
    name: "Sai Suma",
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/saisuma/DSC_2769-Edit-Edit-2-Edit-Edit-Edit.jpg?width=500&quality=80`,
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
    thumbnailUrl: `https://clsjpwsdca.cloudimg.io/storage.googleapis.com/swamiphoto/photos/portraits/sathya-ishuwar/DSC_9082.jpg?width=500&quality=80`,
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
      1: 'It was 2017. I got a call from Naga. She said, "I love your photos! Can we do a maternity shoot?" I\'d never done one before. I said, "sure, let’s give it a shot."',
      3: "We met at Stanford, and Naga was glowing. Bharath was visibly excited. They were so natural together, and their chemistry was amazing to capture. These are still some of my favorite images.",
      6: 'After the shoot, Naga asked me, "Can we book you for 3, 6, and 9-month shoots?" She hadn’t even seen the images yet but trusted me.',
      8: "Sathya was born. We did a shoot soon after at Adobe lodge. Sathya was a natural...he was so comfortable in front of the camera.",
      24: "Naga loves wisterias. We found a bunch and took a shot. Coz, why not.",
      26: "Sathya turned two, and it was time for another shoot. This time, we chose a spot near the Japanese gardens in San Jose.",
      43: "Sriman was born. It was peak of Covid, but we decided on a shoot at Mt. Diablo.",
      50: "A few months later, we did another shoot, this time at their home. Sriman looked so adorable in traditional attire!",
      63: "What’s a photoshoot without some naked baby shots?",
      65: "Some of my favorite mother and son portraits. These aren’t technically perfect—even the lighting isn't great...but, there’s something about them I love. I think they remind me of me and my mom.",
      70: "There's always time for a few couple and solo shots!",
      75: "We’d talked about doing a sunflower shoot for years, and we finally made it happen. It was the tail end of the season, and we took a chance with a two-hour drive. But the light was perfect, and the flowers were still in bloom.",
      82: "Hope you enjoyed the show. This is what photography is to me. It’s not the lighting, or the composition, or the gear. It’s the connection. It’s becoming a part of their journey.",
      83: "Almost forgot...we did a lavender shoot too! It was the first time Mala and I took a trip after the lockdown.",
    },

    layout: "horizontal",
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=hzGHrQBq_i4"],
    },
    isHidden: true,
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData
            .filter((gallery) => !gallery.isHidden)
            .map((gallery) => (
              <Link href={`/galleries/${gallery.slug}`} key={gallery.name}>
                <div className="relative overflow-hidden shadow-lg">
                  <img src={getCloudimageUrl(gallery.thumbnailUrl, { width: 500, quality: 80 })} alt={gallery.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 hover:opacity-90" />
                </div>
                <p className="text-center mt-2 text-md tracking-tighter text-gray-600">{gallery.name}</p>
              </Link>
            ))}
        </div>
      </main>
    </>
  );
};

export default Galleries;
export { galleryData }; // Export gallery data for use in other components
