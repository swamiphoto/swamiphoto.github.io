import React, { useState } from "react";
import Head from "next/head";
import ReactPlayer from "react-player";

// Sample lessons data - this would come from a database/API in production
const lessons = [
  {
    id: 1,
    title: "Introduction to Photography",
    week: 1,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video URL
    description: "Welcome to your 12-week photography journey! In this first lesson, we'll cover the fundamentals of photography. You'll learn about understanding your camera and its settings, the basics of composition, and how to see light differently. This week's assignment: Take 10 photos focusing on composition. Look for interesting lines, patterns, and framing in your everyday environment.",
  },
  {
    id: 2,
    title: "Mastering Light",
    week: 2,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video URL
    description: "Light is everything in photography. This week, we'll dive deep into understanding and working with different types of light. We'll cover natural vs. artificial light, golden hour and blue hour, and using shadows creatively. Assignment: Capture the same subject in three different lighting conditions and observe how the mood changes.",
  },
  {
    id: 3,
    title: "Portrait Photography Basics",
    week: 3,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video URL
    description: "Learn how to capture compelling portraits that tell a story and reveal personality. Topics covered include posing and directing your subject, finding the right background, and creating connection through the lens. Assignment: Take portraits of three different people, focusing on capturing their unique personality.",
  },
  {
    id: 4,
    title: "Landscape Photography",
    week: 4,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "Explore the art of capturing stunning landscapes. Learn about composition techniques, working with natural light, and creating depth in your images.",
  },
  {
    id: 5,
    title: "Understanding Composition",
    week: 5,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "Master the fundamental rules of composition and learn when to break them. We'll cover the rule of thirds, leading lines, framing, and more.",
  },
];

const CoursePlatform = () => {
  const [selectedLesson, setSelectedLesson] = useState(lessons[0]);

  return (
    <>
      <Head>
        <title>12-Week Program — Swami Venkataramani</title>
        <meta name="description" content="Access your 12-week photography mastery program lessons and materials." />
      </Head>

      <div className="h-screen bg-white overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Pane - Lessons List */}
          <div className="lg:w-64 lg:h-screen lg:border-r lg:border-gray-200 lg:shadow-[2px_0_4px_rgba(0,0,0,0.05)] lg:overflow-y-auto">
            <div className="px-6 py-8">
              <div className="space-y-1">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`w-full text-left px-4 py-3 text-lg font-sans ${
                      selectedLesson.id === lesson.id
                        ? "text-gray-900 font-medium bg-gray-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    } transition-colors`}
                  >
                    {lesson.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Pane - Video and Description */}
          <div className="flex-1 lg:h-screen lg:overflow-y-auto">
            <div className="px-6 lg:px-12 py-8">
              {selectedLesson && (
                <>
                  {/* Lesson Title */}
                  <h1 className="text-3xl font-medium text-gray-900 mb-6 text-left">
                    {selectedLesson.title}
                  </h1>

                  {/* Video Player */}
                  {selectedLesson.videoUrl && (
                    <div className="mb-6 bg-gray-900">
                      <div className="relative" style={{ paddingTop: "56.25%" }}>
                        <div className="absolute top-0 left-0 w-full h-full">
                          <ReactPlayer
                            url={selectedLesson.videoUrl}
                            width="100%"
                            height="100%"
                            controls
                            playing={false}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {selectedLesson.description && (
                    <div className="text-gray-600 text-xl leading-relaxed text-left">
                      {selectedLesson.description}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePlatform;
