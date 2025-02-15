import React from "react";
import IMAGES from "../common/images";
import Head from "next/head";

const About = () => {
  return (
    <>
      <Head>
        <title>About — Swami Venkataramani</title>
      </Head>
      <div className="underlined-links min-h-screen">
        <div className="mx-auto max-w-2xl space-y-6 text-left text-xl">
          <h2 className="text-2xl md:text-5xl mt-20 mb-6 font-serif2">Hello friends.</h2>

          <p>
            Welcome to my site! I’m Swami. I’m an engineer, product designer, photographer, and co-founder of{" "}
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
            , and currently live in Pleasanton (California) with my wife, Mala.
          </p>
          <img src={IMAGES.me} alt="Me" className="rounded-2xl shadow-lg" />

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
            I shoot landscapes and portraits. In the past, I've shot <a href="/bollywood">Bollywood concerts</a> and{" "}
            <a href="/tennis" target="_blank" rel="noopener noreferrer">
              sports
            </a>
            , mainly tennis tournaments. In 2018, I was an official photographer at the BNP Paribas Open in Indian Wells. The coolest part was getting to ask Roger Federer a question.
          </p>

          <p>
            <iframe
              src="https://www.youtube.com/embed/5z5oxIyY5q8?si=oN76U2Sj-dioqGUI&amp;start=287"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              className="w-full aspect-video"></iframe>
          </p>

          <p>
            Last year, I started a podcast called{" "}
            <a href="https://swamiphoto.substack.com/podcast" target="_blank" rel="noopener noreferrer">
              ShotMasters
            </a>{" "}
            where I had conversations with world-reknowned landscape photographers about how they succeeded as an artist. I had to suspend the podcast due to a{" "}
            <a href="https://swamiphoto.substack.com/p/big-life-change" target="_blank">
              life change
            </a>
            , but I'm currently hosting another podcast called{" "}
            <a href="https://swamiphoto.substack.com/s/how-i-got-here" target="_blank">
              How I Got Here
            </a>
            , where I interview{" "}
            <a href="https://swamiphoto.substack.com/s/how-i-got-here" target="_blank">
              remarkable people
            </a>{" "}
            about their career and life journeys.
          </p>

          <p>
            Being a full-time engineer with side hustles and multiple hobbies, I’ve had to learn the hard way how to manage my time effectively. I share these lessons in my{" "}
            <a href="https://swamiphoto.substack.com/s/productivity" target="_blank" rel="noopener noreferrer">
              newsletter
            </a>
            . These lessons have now become the foundation of a productivity tool I've created called{" "}
            <a href="https://qtr.ai" target="_blank" rel="noopener noreferrer">
              QTR
            </a>
            . It's a time management app that helps you achieve in 13 weeks what most people struggle to achieve in a year.
          </p>

          <p>Thanks for stopping by. Hope you find something here that inspires you!</p>
          <p className="font-bold">
            Swami Venkataramani
            <br />
            <a href="mailto:swami@swamiphoto.com" className="font-normal">
              swami@swamiphoto.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
