import React from "react";
import { Link } from "react-router-dom";
import { bucketUrl } from "../../common/images";
import Hero from "../../components/hero/Hero";

const galleryData = [
  {
    name: "Evening Hike with Naga and Bharath",
    thumbnailUrl: `${bucketUrl}/photos/portraits/sunol/AR501463.jpg`,
    link: "/naga-sunol",
  },
  {
    name: "Naga with Sunflowers",
    thumbnailUrl: `${bucketUrl}/photos/portraits/naga-sunflowers/AR500795-Edit-Edit.jpg`,
    link: "/naga-sunflowers",
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
            <p className="text-center mt-2 text-lg font-medium">{gallery.name}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Galleries;
