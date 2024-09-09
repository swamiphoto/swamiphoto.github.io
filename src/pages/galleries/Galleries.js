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
    showCover: false,
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
  },
  {
    name: "Sunflowers with Naga",
    description: "A dreamy evening with the sunflowers in Woodland.",
    thumbnailUrl: `${bucketUrl}/photos/portraits/naga-sunflowers/AR500896.jpg`,
    slug: "naga-sunflowers",
    imagesFolderUrl: "portraits/naga-sunflowers",
    layout: "masonry",
    showCover: false,
    enableSlideshow: true,
    slideshowSettings: {
      youtubeLinks: ["https://www.youtube.com/watch?v=qj4RiKoARPk"],
      layout: "film-stack",
    },
  },
  {
    name: "Golden Gate Bridge in Fog",
    description: "Golden Gate Bridge emerging from the fog.",
    thumbnailUrl: `${bucketUrl}/photos/landscapes/LFE/AR501858.jpg`,
    slug: "lfe",
    imagesFolderUrl: "landscapes/LFE",
    layout: "horizontal",
    showCover: true,
  },
  {
    name: "Sunset among the Windmills",
    thumbnailUrl: `${bucketUrl}/photos/landscapes/altamont-sunset/AR501956-Edit.jpg`,
    slug: "altamont-sunset",
    description: "A beautiful sunset with windmills at Altamont Pass.",
    imagesFolderUrl: "landscapes/altamont-sunset",
    layout: "horizontal",
    showCover: false,
    enableSlideshow: true,
  },
  {
    name: "Lavender Fields with Naga",
    thumbnailUrl: `${bucketUrl}/photos/portraits/naga-lavendar/DSCF6486-Edit.jpg`,
    slug: "naga-lavendar",
    description: "A purple evening with Naga's fmaily in the lavender fields.",
    imagesFolderUrl: "portraits/naga-lavendar",
    layout: "masonry",
    showCover: false,
    enableSlideshow: true,
  },
  {
    name: "Japan",
    thumbnailUrl: `${bucketUrl}/photos/landscapes/japan/DSC00179-Edit-4.jpg`,
    slug: "japan",
    description: "A collection of images from Japan.",
    imagesFolderUrl: "landscapes/japan",
    layout: "horizontal",
    showCover: false,
    enableSlideshow: true,
  },
];

const Galleries = () => {
  return (
    <main className="max-w-7xl mx-auto p-4">
      <Hero title="Galleries" showSubNav={false}>
        <p>A curated collection of galleries showcasing images from client sessions and personal shoots, inlcuding landscapes, portraits, travel, and more.</p>
      </Hero>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryData.map((gallery) => (
          <Link to={`/galleries/${gallery.slug}`} key={gallery.name} className="group">
            <div className="relative overflow-hidden shadow-lg">
              <img src={gallery.thumbnailUrl} alt={gallery.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <p className="text-center mt-2 text-md font-geist-mono tracking-tighter text-gray-600">{gallery.name}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Galleries;
export { galleryData }; // Export gallery data for use in other components
