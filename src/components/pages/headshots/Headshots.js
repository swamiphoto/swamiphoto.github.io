import React from "react";
import Photo from "../../photo/Photo";
import IMAGES from "../../../common/images";
import Gallery from "../../gallery/Gallery";
import Feature from "../../features/Features";
import Hero from "../../hero/Hero";
import CTA from "../../cta/CTA";
import Contact from "../../contact/Contact";
import "./Headshots.css";
import Testimonial from "../../testimonial/Testimonial";

const Headshots = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Hero title="Premium Headshots" showSubNav={false}>
        <p>Having shot Bollywood stars and sports icons like Roger Federer, I'm confident I can create a premium headshot for you that will transform your career.</p>

        <CTA className="mt-6 mb-2" />
      </Hero>

      <Photo src={IMAGES.headshots.ashwini} alt="Photo 1" />

      <Gallery layout="verticalPair">
        <Photo src={IMAGES.headshots.searce5} alt="Photo 2" />
        <Photo src={IMAGES.headshots.raj} alt="Photo 1" />
      </Gallery>

      <Testimonial
        imageSrc={IMAGES.headshots.vmirpuri}
        altText="Vijay's testimonial"
        testimony="Swami is easily one of the best photographers in the Bay Area. Having collaborated with him several times, I can vouch for the outstanding quality of his photos and his ability to make the sessions a fun experience. You won't find a more honest and reliable photographer. If you have the opportunity to work with him, just do it."
        name="Vijay Mirpuri"
        role=""
      />

      <Testimonial
        imageSrc={IMAGES.headshots.ashwini}
        altText="Ashwini's testimonial"
        testimony="Swami really has an intuitive sense of what will work for you and is very good at making you feel comfortable or making you laugh so you have a more natural smile. He took my first professional photos when I started my business, and I recently went back to get more headshots. Highly recommend! "
        name="Ashwini Addala"
        role=""
        reverse={true}
      />

      <Feature
        title="Command respect. Skyrocket your career."
        description="Most people don't realize how much a high-end headshot impacts their career. Studies show we make split-second decisions on who to collaborate with based just on how people appear!"
        imageUrl={IMAGES.headshots.searce1}
        reverse={false}
      />

      <Feature title="100% refund if you don't absolutely love it." description="I take pride in my work. If you don't absolutely love how you look, you'll get a refund, no questions asked." imageUrl={IMAGES.headshots.searce6} reverse={true} />
      <Feature title="Look trustworthy, genuine, and authentic." description="No cringeworthy smiles or artificial expressions. We'll work together to bring out your most genuine, authentic, and confident self." imageUrl={IMAGES.headshots.searce7} reverse={false} />
      <Feature
        title="Why work with me?"
        description="Anyone can buy a camera, master lighting and composition, and make a hi-res image. That isn't photography. When you work with me, it's never about my setup. It's about you. I've honed a unique style that blends three things: my connection with you, my artistic experience, and a deep understanding of what resonates in the corporate world."
        imageUrl={IMAGES.headshots.ashwini2}
        reverse={true}
      />

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default Headshots;
