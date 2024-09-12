import React from "react";
import "./About.css";
import IMAGES from "../../common/images";

const About = () => {
  return (
    <div className="underlined-links min-h-screen">
      <div className="mx-auto max-w-2xl space-y-6 text-left text-xl">
        <h2 className="text-2xl font-bold mt-20 mb-6">Hello friends.</h2>

        <p>
          Welcome to my site! I’m Swami. I’m an engineer, designer, and photographer, and co-founder of{" "}
          <a href="https://qtr.ai" target="_blank" rel="noopener noreferrer">
            QTR
          </a>
          .
        </p>
        <p>
          A little bit about me: I grew up near the beach in Chennai, moved to Malawi <i>(the warm heart of Africa)</i> during my high school years, went to college at{" "}
          <a href="https://asu.edu" target="_blank" rel="noopener noreferrer">
            ASU
          </a>
          , and currently live in sunny Pleasanton (California).
        </p>
        <img src={IMAGES.me} alt="Me" />

        <p>
          Somewhere along the way, I picked up an interest in photography. I think it was when my dad got me a video camera in the 90s. I took the camera to school and videotaped my classes, and{" "}
          <a href="https://www.swamiphoto.com/blog/a-day-in-st-andrews-malawi" target="_blank" rel="noopener noreferrer">
            those recordings
          </a>{" "}
          have become my most precious memories of Africa. Here’s Mr. Studd getting annoyed with the camera while trying to explain ligands.
        </p>
        <p>
          <iframe src="https://www.youtube.com/embed/J6FmpEuDBWE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen className="w-full aspect-video"></iframe>
        </p>

        <p>
          I'm currenty focusing on landscapes and portraits, especially <a href="/headshots">business headshots</a> (if you need one, let me know). I've shot <a href="/bollywood">Bollywood concerts</a> and{" "}
          <a href="/tennis" target="_blank" rel="noopener noreferrer">
            sports
          </a>
          , mainly tennis tournaments. In 2018, I was an official photographer at the BNP Paribas Open in Indian Wells.
        </p>

        <p>
          Last year, I started a podcast called the{" "}
          <a href="https://swamiphoto.substack.com" target="_blank" rel="noopener noreferrer">
            ShotStories Photography Podcast
          </a>{" "}
          where I interviewed some of the world's best landscape photographers about how they succeeded as an artist. While I had to suspend the podcast due to a <a href="https://swamiphoto.substack.com/p/big-life-change">life change</a>, I plan to start interviewing again early next year.
        </p>

        <p>
          Being a full-time engineer with multiple interests and side hustles, I’ve had to learn the hard way how to manage time effectively. I share these lessons on{" "}
          <a href="https://swamiphoto.medium.com" target="_blank" rel="noopener noreferrer">
            Medium
          </a>
          . These lessons have now become the foundation of a tool I've created called{" "}
          <a href="https://qtr.ai" target="_blank" rel="noopener noreferrer">
            QTR
          </a>
          . It's a simple, yet powerful tool that helps you manage your time well and achieve your goals faster.
        </p>

        <p>Thanks for stopping by. Hope you find something here that inspires you.</p>
        <p className="font-bold">
          Swami Venkataramani
          <br />
          <a href="mailto:swami@swamiphoto.com" className="font-normal">
            swami@swamiphoto.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
