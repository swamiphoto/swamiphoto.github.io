import React from "react";
import "./About.css";
import IMAGES from "../../../common/images";
import Photo from "../../photo/Photo";

const About = () => {
  return (
    <div className="underlined-links min-h-screen">
      <div className="mx-auto max-w-2xl space-y-6 text-left text-lg">
        <h2 className="text-2xl font-bold mt-20 mb-6">Hi, I'm Swami.</h2>

        <p>
          I use this site to{" "}
          <a href="https://swamiphoto-bf6ce1.webflow.io/portfolio" target="_blank" rel="noopener noreferrer">
            showcase my photography
          </a>
          , share my{" "}
          <a href="https://swamiphoto-bf6ce1.webflow.io/tips" target="_blank" rel="noopener noreferrer">
            tips
          </a>
          ,{" "}
          <a href="https://swamiphoto-bf6ce1.webflow.io/blog" target="_blank" rel="noopener noreferrer">
            life lessons
          </a>
          , and insights I've gained from other photographers.
        </p>
        <p>
          A little bit about me: I grew up in Chennai, moved to Malawi during my high school years, went to college at{" "}
          <a href="https://asu.edu" target="_blank" rel="noopener noreferrer">
            ASU
          </a>
          , and currently live in San Jose. I’m an{" "}
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            engineer
          </a>{" "}
          at{" "}
          <a href="https://reputation.com" target="_blank" rel="noopener noreferrer">
            Reputation.com
          </a>
          , and cofounder of{" "}
          <a href="https://shotstories.co" target="_blank" rel="noopener noreferrer">
            ShotStories
          </a>
          .
        </p>
        <p>
          Somewhere along the way, I picked up an interest in photography. I think it was when my dad got me a video camera in the mid-90s. I took the camera to school and videotaped my classes, and{" "}
          <a href="https://swamiphoto-bf6ce1.webflow.io/recordings" target="_blank" rel="noopener noreferrer">
            those recordings
          </a>{" "}
          are my most precious memories of Africa.
        </p>

        <Photo src={IMAGES.me} alt="Me" />

        <p>
          I mostly shoot{" "}
          <a href="https://swamiphoto-bf6ce1.webflow.io/landscapes" target="_blank" rel="noopener noreferrer">
            landscapes
          </a>
          , though I mix in{" "}
          <a href="https://swamiphoto-bf6ce1.webflow.io/portraits" target="_blank" rel="noopener noreferrer">
            portraits
          </a>{" "}
          at times. Earlier, I've shot{" "}
          <a href="https://swamiphoto-bf6ce1.webflow.io/bollywood" target="_blank" rel="noopener noreferrer">
            Bollywood concerts
          </a>{" "}
          and{" "}
          <a href="https://swamiphoto-bf6ce1.webflow.io/sports" target="_blank" rel="noopener noreferrer">
            sports
          </a>
          , mainly tennis tournaments. In 2018, I was an official photographer at the BNP Paribas Open in Indian Wells. Here is a fun{" "}
          <a href="https://youtu.be/questionRogerFederer" target="_blank" rel="noopener noreferrer">
            question I asked Roger Federer
          </a>{" "}
          after his semifinal match.
        </p>
        <p>
          One of my passions is helping new photographers become pros. Because of my experience in multiple genres, I'm able to bring in the different perspectives a new photographer needs before they can start to specialize. I teach using{" "}
          <a href="https://swamiphoto-bf6ce1.webflow.io/illustrations" target="_blank" rel="noopener noreferrer">
            hand-drawn illustrations
          </a>{" "}
          because I've found that to be an effective way to convey complex photography techniques.
        </p>

        <p>
          My podcast,{" "}
          <a href="https://shotmasters.co" target="_blank" rel="noopener noreferrer">
            ShotMasters
          </a>
          , is launching soon. I'm currently interviewing landscape photographers about the techniques and mindsets that helped them succeed as an artist. Last year, I spoke to photographers from genres outside my comfort zone: wildlife, fashion, travel, macro, impressionism, and street. Those
          interviews are on my{" "}
          <a href="https://youtube.com/ShotStoriesChannel" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>{" "}
          channel.
        </p>

        <p>
          On the{" "}
          <a href="https://swamiphoto-bf6ce1.webflow.io/blog" target="_blank" rel="noopener noreferrer">
            blog
          </a>
          , I share my thoughts on photography and life—mostly lessons learned around things I’ve been dealing with the last few years—managing time, finding focus, and being happy.
        </p>

        <p>Thanks for stopping by. Hope you find something inspiring here!</p>
        <p className="font-bold">— Swami</p>
      </div>
    </div>
  );
};

export default About;
