// src/components/About/About.js

import React from "react";
import "./About.css"; // Tailwind CSS will be applied, ensure this file imports Tailwind CSS

const About = () => {
  return (
    <div className="about min-h-screen py-12">
      <h1 className="text-4xl font-bold mb-6">Why QTR?</h1>
      <div className="mx-auto max-w-2xl space-y-6 text-left text-lg">
        <p>
          There are 10,000 to-do apps that claim to make you more productive,
          with new ones popping up daily. Do we really need another planning
          app?
        </p>
        <p>
          One day I received an alert from a to-do app I was using: Task snoozed
          for 167 days. And that’s when it struck me: to-do apps are flawed.
        </p>
        <p>
          Don’t get me wrong–some of these apps are amazing–Asana, Notion,
          Trello, Todoist–I was a beta user for many of them, and they’ve helped
          me keep my life organized. In fact, I used to send product sketches
          regularly to the Todoist team with ideas on how to improve the app
          experience.
        </p>
        <p>
          But here’s the problem: these apps focus on task management rather
          than personal effectiveness. It’s fun to use these apps–they make you
          feel like you’re in control–especially when your lists get longer and
          you find creative ways to organize them. But you must ask yourself:
          you manage tasks efficiently, but are you managing your time
          effectively? Are you moving toward your long-term goals? Studies show
          only 6% of us do.
        </p>
        <p>
          Regardless of what app you use, may I suggest a tweak that will make
          you infinitely more effective?
        </p>
        <ol className="list-decimal list-inside">
          <li>
            Begin with the end in mind. What’s one thing, if accomplished, would
            make your day a success? Write this down as your goal for the day.
          </li>
          <li>
            Now, think backward. What tasks will help you achieve this goal? Add
            these to your to-do list.
          </li>
          <li>
            Add your tasks to your calendar. Like making appointments with
            yourself! Because until something’s on your calendar, your to-do
            list is just a wish list.
          </li>
        </ol>
        <p>
          I’ve done this daily for the last few years, and I've launched three
          startups, two podcasts, a YouTube channel, a Medium page, a
          photography business, and written 100+ pages of my upcoming
          illustrated photography book, all the while working on a full-time job
          as an engineer and having spare time to learn piano. People ask me how
          I manage to do all this without getting burnt out. It’s because I’m
          not just managing my tasks–I’m also managing my time. If you do this
          daily, you’ll be knocking off your most ambitious goals in no time.
        </p>
        <p>
          And this is exactly what QTR lets you do easily: set a goal, add your
          tasks, and drag them to time slots. You’re not just managing tasks
          anymore. You’re managing time, and you’re aligned with your goals.
        </p>
      </div>
    </div>
  );
};

export default About;
