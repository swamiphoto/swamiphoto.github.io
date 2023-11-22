import React from "react";
import "./About.css";
import IMAGES from "../../../common/images";
import Hero from "../../hero/Hero";
import Photo from "../../photo/Photo";

const About = () => {
  return (
    <div className="about min-h-screen">
      <div className="mx-auto max-w-2xl space-y-6 text-left text-lg font-serif">
        {/* <Hero title="About Me" showSubNav={false} /> */}
        <h2 className="text-2xl font-bold mt-20 mb-6">Hi, I'm Swami.</h2>

        <p>I use this site to showcase my photography, share life lessons, and insights from my podcast.</p>
        <p>A little bit about me: I grew up in Chennai, moved to Malawi during my high school years, went to college at ASU, and currently live in San Jose. I’m an engineer at Reputation.com, and cofounder of ShotStories.</p>
        <p>Somewhere along the way, I picked up an interest in photography. I think it was when my dad got me a video camera in the mid-90s. I took the camera to school and videotaped my classes, and those recordings are my most precious memories of Africa.</p>

        <Photo src={IMAGES.me} alt="Me" />

        <p>
          I shoot landscapes, portraits, and corporate headshots. I also used to shoot Bollywood concerts and sports, mainly tennis tournaments. In 2018, I was an official photographer at the BNP Paribas Open in Indian Wells. Here is a fun question I asked Roger Federer after his semifinal match.
        </p>
        <p>In 2019, my Golden Gate Bridge photo was displayed in the Escaype Art Gallery in San Francisco. The event inspired me to create ShotStories, a digital art gallery platform for photographers, which I’m about to launch soon.</p>
        <p>I host the ShotStories Photography Podcast, where I have in-depth conversations with the world's best landscape photographers about the art, craft, and business of photography.</p>
        <p>On Medium, I write articles on how I juggle my time between work, hobbies, and side hustles.</p>
        <p>Thanks for stopping by. Hope you find something inspiring here!</p>
        <p className="font-bold">— Swami</p>
      </div>
    </div>
  );
};

export default About;
