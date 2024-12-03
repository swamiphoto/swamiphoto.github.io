import React, { useRef } from "react";
import Head from "next/head";
import WiggleLine from "../components/wiggle-line/WiggleLine";

const TimeManagement = () => {
  const formRef = useRef(null);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formData = {
      email: event.target.email.value,
      name: event.target.name.value,
      message: "New sign up for time management course",
    };

    try {
      const response = await fetch("https://swamiphoto-github-io.vercel.app/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Time Management Sign Up",
          message: `New sign-up with email: ${formData.email}`,
        }),
      });

      if (response.ok) {
        console.log("Sign-up email sent successfully");
        alert("Thank you for signing up! I'll let you know when the course is ready.");
      } else {
        console.error("Error sending sign-up email");
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending sign-up email:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      formRef.current.reset();
    }
  };

  return (
    <>
      <Head>
        <title>Time Management Course</title>
      </Head>
      <div className="min-h-screen font-sans flex flex-col lg:flex-row">
        {/* Left Side (Video Section) */}
        <div className="bg-gray-100 w-full lg:w-3/5 p-8 flex flex-col items-center justify-center">
          <iframe src="https://www.youtube.com/embed/jZ0c7pvgOGA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full aspect-video max-w-lg lg:max-w-none"></iframe>
          <p className="mt-4 text-center italic max-w-lg">
            Learn time management from Swami Venkataramani, founder of{" "}
            <a href="https://qtr.ai" target="_blank" rel="noopener noreferrer" className="text-blue-900 underline">
              QTR
            </a>
            , the world's most advanced quarterly planner and goal achievement platform.
          </p>
        </div>

        {/* Right Side (Text and Form Section) */}
        <div className="w-full lg:w-2/5 p-6 lg:p-16 text-left shadow-xl border-l-gray-300 border-l">
          <h1 className="text-4xl font-bold">The Art of Time Management</h1>
          <h2 className="text-2xl font-medium text-gray-700 italic mt-4">Achieve in 13 weeks what most people struggle to accomplish in a year.</h2>
          <WiggleLine />
          <p className="mt-4">
            <span className="bg-yellow-200">Most people spend 8 hours working but only get 3 hours of actual work done.</span> Why not work only 3 hours and use the extra 5 hours for whatever else? And here’s another sobering fact—
            <span className="bg-yellow-200">only 6% of people achieve meaningful goals each year.</span> The rest of us are always busy, juggling tasks that don’t move the needle.
          </p>
          <p className="mt-4">
            Ready to break free from old patterns? <span className="bg-yellow-200">I'll teach you how to manage your time</span>, and accomplish in 13 weeks what others take a year to achieve.
          </p>

          <form ref={formRef} onSubmit={handleSignUp} className="space-y-4 mt-8">
            <div>
              <span className="text-2xl font-bold">
                Sign up now and <span className="bg-yellow-200">save 85%</span>
              </span>
              <span className="ml-2 text-2xl line-through">$299</span>
              <span className="ml-2 text-2xl font-bold">$47</span>
              <div className="italic text-sm text-red-500 font-bold">Sign up today to lock in the discounted price—no payment needed now!</div>
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input type="text" id="name" name="name" placeholder="Your name" required className="w-full md:w-[350px] px-4 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input type="email" id="email" name="email" placeholder="Your email" required className="w-full md:w-[400px] px-4 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" />
            </div>
            <div>
              <button type="submit" className="w-full md:w-[200px] px-6 py-3 bg-gray-800 text-white font-bold text-lg rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900">
                I'm Interested!
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TimeManagement;
