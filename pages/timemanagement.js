import React, { useRef } from "react";
import IMAGES from "../common/images";
import Head from "next/head";
import WiggleLine from "../components/wiggle-line/WiggleLine";

const TimeManagement = () => {
  const formRef = useRef(null);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formData = {
      email: event.target.email.value,
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
        alert("Thank you for signing up! Check your inbox for more details.");
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
      <div className="underlined-links min-h-screen font-sans mb-20">
        <div className="mx-auto max-w-2xl space-y-6 text-left text-xl">
          <h1 className="text-5xl font-bold mt-20 mb-6">The Art of Time Management</h1>
          <h2 className="text-2xl font-bold mt-20 mb-6">Achieve in 13 weeks what most people struggle to accomplish in a year.</h2>
          <p>
            Most people spend 8 hours working but only get 3 hours of actual work done. Why not work only 3 hours and use the extra 5 hours for whatever else? And here’s another sobering fact—only 6% of people achieve meaningful goals each year. The rest of us are stuck in a cycle of busyness,
            juggling tasks that don’t truly move the needle on what matters most.
          </p>
          <p>It's time to break free from old patterns. I'll teach you how to manage your time, and accomplish in 13 weeks what others take a year to achieve.</p>
          <p>
            <iframe src="https://www.youtube.com/embed/jZ0c7pvgOGA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full aspect-video"></iframe>
          </p>
          <form ref={formRef} onSubmit={handleSignUp} className="space-y-4 mt-10">
            <div className="flex flex-col md:flex-row items-stretch md:space-x-4">
              <div className="flex-grow">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required className="w-full px-4 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" />
              </div>
              <div>
                <button type="submit" className="w-full md:w-auto px-6 py-3 bg-gray-800 text-white font-bold text-lg rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900">
                  I'm Interested!
                </button>
              </div>
            </div>
          </form>
          <div className="mt-8">
            <WiggleLine />
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeManagement;
