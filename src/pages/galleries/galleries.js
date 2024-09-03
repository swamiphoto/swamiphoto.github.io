import React from "react";
import { Link } from "react-router-dom";

const galleryData = [
  { name: "Portraits", image: "/path/to/portrait-thumbnail.jpg", link: "/galleries/portraits" },
  { name: "Landscapes", image: "/path/to/landscape-thumbnail.jpg", link: "/galleries/landscapes" },
  { name: "Urban", image: "/path/to/urban-thumbnail.jpg", link: "/galleries/urban" },
  // Add more galleries here
];

const Galleries = () => {
  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Galleries</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryData.map((gallery) => (
          <Link to={gallery.link} key={gallery.name} className="group">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img src={gallery.image} alt={gallery.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <p className="text-center mt-2 text-lg font-medium">{gallery.name}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Galleries;
