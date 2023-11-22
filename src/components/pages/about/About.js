import React from "react";
import "./About.css";
import IMAGES from "../../../common/images";
import Photo from "../../photo/Photo";

const About = () => {
  return (
    <div className="underlined-links min-h-screen">
      <div className="mx-auto max-w-2xl space-y-6 text-left text-lg">
        <h2 className="text-2xl font-bold mt-20 mb-6">Hello friends.</h2>

        <p>
          I’m Swami. I’m an engineer, designer, and photographer, and co-founder of{" "}
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
          are my most precious memories of Africa. Here’s a clip of my chemistry teacher getting pissed of at me for recording him while he was trying to explaining ligands.
        </p>
        <p>
          <iframe src="https://www.youtube.com/embed/J6FmpEuDBWE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen className="w-full aspect-video"></iframe>
        </p>

        <p>
          I'm currenty focuced on shooting <a href="/headshots">premium headshots</a> in my garage studio, <a href="portraits">portraits</a>, and <a href="/landscapes">landscapes</a>. I've also done <a href="/bollywood">Bollywood concerts</a> and{" "}
          <a href="/tennis" target="_blank" rel="noopener noreferrer">
            sports
          </a>
          , mainly tennis tournaments. In 2018, I was one of the official photographer at the BNP Paribas Open in Indian Wells.
        </p>

        <p>
          Last year, I started a podcast called the{" "}
          <a href="https://swamiphoto.substack.com" target="_blank" rel="noopener noreferrer">
            ShotStories Photography Podcast
          </a>{" "}
          where I interviewed some of the world's best landscape photographers about how they succeeded as an artist. While I had to suspend the podcast due to a <a href="https://swamiphoto.substack.com/p/big-life-change">life change</a>, I plan to start interviewing again early next year.
        </p>

        <p>
          Being an engineer with multiple interests and side hustles, I’ve had to learn the hard way how to manage time effectively. I share these lessons on{" "}
          <a href="https://swamiphoto.medium.com" target="_blank" rel="noopener noreferrer">
            Medium
          </a>
          .
        </p>

        <p>Thanks for stopping by. Hope you find something here that inspires you.</p>
        <p className="font-bold">— Swami</p>
      </div>
    </div>
  );
};

export default About;
