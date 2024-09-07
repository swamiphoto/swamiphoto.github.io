import React from "react";
import { Link } from "react-router-dom";
import { bucketUrl } from "../../common/images";
import Hero from "../../components/hero/Hero";

const galleryData = [
  {
    name: "Hike with Naga and Bharath",
    thumbnailUrl: `${bucketUrl}/photos/portraits/sunol/AR501526.jpg?width=1300`,
    link: "/naga-sunol",
  },
  {
    name: "Sunflowers with Naga",
    thumbnailUrl: `${bucketUrl}/photos/portraits/naga-sunflowers/AR500896.jpg`,
    link: "/naga-sunflowers",
  },
  {
    name: "Golden Gate Bridge in Fog",
    thumbnailUrl: `${bucketUrl}/photos/landscapes/LFE/AR501858.jpg`,
    link: "/lfe",
  },
  {
    name: "Fog in Mt Tam",
    thumbnailUrl: `${bucketUrl}/photos/landscapes/mttam/AR500633.jpg`,
    link: "/mttam",
  },
];

const Galleries = () => {
  return (
    <main className="max-w-7xl mx-auto p-4">
      <Hero title="Galleries" showSubNav={false}>
        <p>A curated collection of galleries showcasing images from client sessions and personal shoots, including landscapes, travel, and more.</p>
      </Hero>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryData.map((gallery) => (
          <Link to={gallery.link} key={gallery.name} className="group">
            <div className="relative overflow-hidden shadow-lg">
              <img
                src={gallery.thumbnailUrl}
                alt={gallery.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" // Taller height
              />
            </div>
            <p className="text-center mt-2 text-md font-geist-mono tracking-tighter text-gray-600">{gallery.name}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Galleries;
