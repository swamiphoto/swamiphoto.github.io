import React from "react";
import { Link } from "react-router-dom";
import Hero from "../../components/hero/Hero";
import { bucketUrl } from "../../common/images"; // Use your existing bucketUrl

const galleryData = [
  {
    name: "Hike with Naga and Bharath",
    description: "An adventurous hike with Naga and Bharath.",
    thumbnailUrl: `${bucketUrl}/photos/portraits/sunol/AR501526.jpg?width=1300`,
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
      layout: "kenburns",
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
      youtubeLinks: ["https://www.youtube.com/watch?v=qj4RiKoARPk"],
      layout: "film-single",
    },
    enableClientView: true,
    clientSettings: {
      clientLogin: "harmonium",
      clientMessage: "Hello Megha/Adithya, here are some additional images — only you can see them. If you'd like to print any of these, send me the image urls so I can fine-tune them a bit more. Let me know your favorites!",
    },
  },
  {
    name: "Naga and Bharath (Maternity)",
    thumbnailUrl: `${bucketUrl}/photos/portraits/naga-stanford/DSC_9221-Edit-Edit.jpg`,
    slug: "naga-bharath",
    description: "My first shoot with Naga and Bharath. Naga was pregnant with Sathya",
    imagesFolderUrl: "portraits/naga-stanford",
    layout: "masonry",
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=JHkx2XOtlpU"],
      layout: "kenburns",
    },
    enableClientView: true,
    clientSettings: {
      clientLogin: "sathya",
      clientMessage: "Hello Naga/Bharath...my first shoot with you...nostalgic! Here are the rest of the images only you can see.",
    },
  },
  {
    name: "Naga, Bharath, and Sathya",
    thumbnailUrl: `${bucketUrl}/photos/portraits/naga-adobe/DSC_5614.jpg`,
    slug: "naga-bharath-sathya",
    description: "First shoot with Sathya.",
    imagesFolderUrl: "portraits/naga-adobe",
    layout: "masonry",
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=puOnVzlkrQM"],
      layout: "kenburns",
    },
    enableClientView: true,
    clientSettings: {
      clientLogin: "sathya",
      clientMessage: "Hello Naga/Bharath...these are the images form Adobe Lodge...our first shoot with Sathya! Here are the rest of the images only you can see.",
    },
  },
];

const Galleries = () => {
  return (
    <main className="max-w-7xl mx-auto p-4">
      <Hero title="Galleries" showSubNav={false}>
        <p>A curated collection of galleries showcasing images from client sessions and personal shoots, including landscapes, portraits, travel, and more.</p>
      </Hero>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryData.map((gallery) => (
          <Link to={`/galleries/${gallery.slug}`} key={gallery.name} className="group">
            <div className="relative overflow-hidden shadow-lg">
              <img src={gallery.thumbnailUrl} alt={gallery.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <p className="text-center mt-2 text-md tracking-tighter text-gray-600">{gallery.name}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Galleries;
export { galleryData }; // Export gallery data for use in other components
