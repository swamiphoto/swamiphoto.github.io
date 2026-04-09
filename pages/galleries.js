import React from "react";
import Link from "next/link"; // Next.js client-side routing
import Hero from "../components/hero/Hero";
import { bucketUrl, getCloudimageUrl } from "../common/images";
import Head from "next/head";

import { galleryData } from "../common/galleryData";
export { galleryData };


//the gallery stack look
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
                        <img 
                          src={getCloudimageUrl(gallery.thumbnailUrl, { width: 900, quality: 75 })} 
                          alt={gallery.name} 
                          className="w-full h-[400px] md:h-[500px] object-cover relative z-10 rounded-3xl" 
                          onError={(e) => {
                            console.error("Failed to load gallery thumbnail:", gallery.thumbnailUrl, "Gallery:", gallery.name);
                            if (e.target instanceof HTMLImageElement) {
                              e.target.style.display = 'none';
                            }
                          }}
                        />
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
