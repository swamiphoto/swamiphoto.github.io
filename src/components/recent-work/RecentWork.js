import React from "react";
import Photo from "../../components/image-displays/photo/Photo"; // Import the existing Photo component
import IMAGES from "../../common/images"; // Ensure correct import of the images
import SectionHeader from "../section-header/SectionHeader";

const RecentWork = () => {
  return (
    <section className="py-12">
      <SectionHeader title="Recent Work" description="Here's some of my latest work" />

      <Photo src={IMAGES.landscapes.mac} caption="My attempt at recreating the scene from one of the iconic Mac wallpapers" />

      <Photo src={IMAGES.landscapes.gateway} caption="Capturing the majestic Gateway Arch during sunset." />

      <Photo src={IMAGES.portraits.amrita} caption="A serene portrait of Amrita in natural light." />

      <Photo src={IMAGES.landscapes.fog} caption="A foggy morning over the rolling hills, perfect for contemplation." />

      <Photo src={IMAGES.portraits.naga} caption="Portrait of Naga under a golden hour light." />

      <Photo src={IMAGES.bollywood.katrina} caption="Capturing Katrina's stunning performance at a concert." />
    </section>
  );
};

export default RecentWork;
