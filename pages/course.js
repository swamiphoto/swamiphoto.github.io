import React from "react";
import Head from "next/head";

const Course = () => {
  return (
    <>
      <Head>
        <title>12-Week Photography Mastery Program for High Schoolers — Swami Venkataramani</title>
        <meta
          name="description"
          content="Give your teen a skill that sets them apart. 12-week photography mastery program for high schoolers. Only 10 spots available."
        />
        <meta property="og:title" content="12-Week Photography Mastery Program for High Schoolers" />
        <meta
          property="og:description"
          content="Give your teen a skill that sets them apart. 12-week photography mastery program for high schoolers. Only 10 spots available."
        />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-24 md:py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-bold text-gray-900 shadow-lg animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-900 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-900"></span>
              </span>
              10 spots available
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif2 font-bold mb-8 leading-[1.1] tracking-tight">
              Give Your Teen a Skill That Actually{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                Sets Them Apart
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
              12-Week Photography Mastery Program for High Schoolers
            </p>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-gray-900 text-xl font-bold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 transform"
            >
              APPLY FOR YOUR TEEN'S SPOT
              <span className="text-2xl">→</span>
            </a>
            <p className="mt-6 text-gray-400 text-sm">
              Limited enrollment • Next cohort starts soon
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="inline-block mb-6 px-4 py-1.5 bg-red-50 text-red-700 text-sm font-semibold rounded-full">
              The Uncomfortable Truth
            </div>
            <h2 className="text-4xl md:text-5xl font-serif2 font-bold mb-10 text-gray-900 leading-tight">
              Here's the uncomfortable truth:
            </h2>
            <div className="space-y-6 text-xl text-gray-700 leading-relaxed">
              <p className="text-2xl font-medium text-gray-900">
                Your teen is about to graduate high school without mastering anything creative.
              </p>
              <p>
                They're good at school. Maybe decent at a sport. But ask what they've truly mastered — something that makes them different, valuable, memorable — and there's usually silence.
              </p>
              <div className="bg-gray-50 border-l-4 border-red-500 p-6 rounded-r-lg my-8">
                <p className="text-xl font-bold text-gray-900 mb-2">
                  College won't fix this.
                </p>
                <p className="text-lg text-gray-700">
                  Most kids graduate at 22 still searching for "their thing."
                </p>
              </div>
              <p className="text-3xl font-bold text-gray-900 mt-10">
                You have a 12-week window to change that.
              </p>
            </div>
          </div>
        </section>

        {/* Transformation Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-4 py-1.5 bg-green-50 text-green-700 text-sm font-semibold rounded-full">
                The Transformation
              </div>
              <h2 className="text-4xl md:text-5xl font-serif2 font-bold mb-6 text-gray-900">
                What Changes in 12 Weeks
              </h2>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-2xl font-bold text-gray-900">
                  Your teen becomes <span className="text-yellow-600">the photographer</span> in every circle they're in.
                </p>
                <p className="text-xl text-gray-600 italic">
                  Not "pretty good at photos." Not "takes nice pictures sometimes."
                </p>
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl my-6">
                  <p className="text-xl font-bold text-gray-900">
                    The one everyone turns to.
                  </p>
                  <p className="text-lg text-gray-700 mt-2">
                    At parties. On trips. For senior photos. For college applications. For memories that matter.
                  </p>
                </div>
                <p>
                  This becomes part of their identity. A reputation. A skill that opens doors you can't predict yet.
                </p>
                <p className="text-xl font-semibold text-gray-900 mt-6">
                  More importantly: they learn to see beauty where others don't. To think like an artist. To create something from nothing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Photography Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif2 font-bold mb-12 text-gray-900 text-center">
              Why Photography? Why Now?
            </h2>
            <div className="space-y-8">
              <div>
                <p className="text-xl text-gray-700 mb-6">Most creative skills take 5+ years to master:</p>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <p className="font-bold text-gray-900 text-lg mb-1">Piano</p>
                    <p className="text-gray-600">5-7 years</p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <p className="font-bold text-gray-900 text-lg mb-1">Painting</p>
                    <p className="text-gray-600">Similar timeline</p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <p className="font-bold text-gray-900 text-lg mb-1">Instruments</p>
                    <p className="text-gray-600">Years of grinding</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
                <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Photography? 12 weeks to genuine expertise.
                </p>
              </div>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  This is the only art form where your teen can go from beginner to expert in one summer. From "I don't know what I'm doing" to "I'm the best photographer my age that I know."
                </p>
                <p>
                  The clock is ticking. They're about to spend four years in college without this skill. Most will graduate still without it.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <p className="text-xl font-bold text-gray-900">
                    You're looking at a tiny window where 12 focused weeks can give them something almost nobody their age has.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instructor Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif2 font-bold mb-6 text-gray-900">
                Who's Teaching This?
              </h2>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-3xl md:text-4xl font-serif2 font-bold mb-3 text-gray-900">
                  Swami Jayaraman
                </h3>
                <p className="text-xl text-gray-600">
                  Professional photographer for 15+ years
                </p>
              </div>
              <div className="mb-8">
                <p className="text-lg font-bold text-gray-900 mb-4">Credits:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <span className="text-2xl">📸</span>
                    <p className="text-gray-700">Published in National Geographic</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <span className="text-2xl">🎾</span>
                    <p className="text-gray-700">Official ATP Tour photographer (shot Federer, Nadal, top tennis players)</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <span className="text-2xl">🎬</span>
                    <p className="text-gray-700">Photographed 30+ Bollywood celebrities</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <span className="text-2xl">🏛️</span>
                    <p className="text-gray-700">Work featured in galleries, books, major publications worldwide</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <p className="text-lg font-bold text-gray-900 mb-3">
                  But here's what actually matters:
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  I've coached teens for years. I know how to unlock their creative eye without drowning them in technical jargon that makes them quit.
                </p>
                <p className="text-xl font-bold text-gray-900 mb-2">
                  Most photography teachers teach cameras and settings.
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  I teach them to see and capture beauty.
                </p>
                <p className="text-lg text-gray-700 mt-4 italic">
                  That's the difference between someone who owns a camera and someone who creates art.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Program Details Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif2 font-bold mb-6 text-gray-900">
                The Program
              </h2>
              <p className="text-xl text-gray-600">Built for Busy Teens</p>
            </div>
            <div className="mb-12">
              <p className="text-xl font-bold text-gray-900 mb-6">Format:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="text-3xl mb-3">📹</div>
                  <p className="font-bold text-gray-900 text-lg mb-2">Weekly Video Lesson</p>
                  <p className="text-gray-700">1 short video per week (no fluff, just what matters)</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <div className="text-3xl mb-3">💬</div>
                  <p className="font-bold text-gray-900 text-lg mb-2">Live Group Calls</p>
                  <p className="text-gray-700">1 call every week (Q&A + photo critique)</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <div className="text-3xl mb-3">📸</div>
                  <p className="font-bold text-gray-900 text-lg mb-2">Photo Assignments</p>
                  <p className="text-gray-700">Weekly projects (real work, not busywork)</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
                  <div className="text-3xl mb-3">👥</div>
                  <p className="font-bold text-gray-900 text-lg mb-2">Private Chat Group</p>
                  <p className="text-gray-700">Direct access to me + their cohort</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-xl text-center">
                <div className="text-4xl mb-4">⏱️</div>
                <p className="font-bold text-xl mb-2">Duration</p>
                <p className="text-3xl font-bold text-yellow-400">12 weeks</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-xl text-center">
                <div className="text-4xl mb-4">👥</div>
                <p className="font-bold text-xl mb-2">Group Size</p>
                <p className="text-3xl font-bold text-yellow-400">Max 10</p>
                <p className="text-sm text-gray-300 mt-2">Real attention for everyone</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-xl text-center">
                <div className="text-4xl mb-4">💻</div>
                <p className="font-bold text-xl mb-2">Delivery</p>
                <p className="text-lg font-bold text-yellow-400">100% Online</p>
                <p className="text-sm text-gray-300 mt-2">Fits around school, sports, life</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif2 font-bold mb-6 text-gray-900">
                What Your Teen Gets
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: "🎯", title: "Technical mastery", desc: "They'll know their camera inside-out (any camera, even their phone)" },
                { icon: "👁️", title: "Artist's eye", desc: "They'll see compositions, light, and moments others miss" },
                { icon: "📚", title: "Portfolio", desc: "12 weeks of work they're genuinely proud of" },
                { icon: "⭐", title: "Reputation", desc: "They become 'the photographer' in every group" },
                { icon: "💪", title: "Confidence", desc: "The feeling of being world-class at something creative" },
                { icon: "♾️", title: "Lifetime skill", desc: "This doesn't expire. They'll have this forever." }
              ].map((benefit, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{benefit.icon}</div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</p>
                      <p className="text-gray-700 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentiation Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif2 font-bold mb-12 text-gray-900 text-center">
              What Makes This Different
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
                <p className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">❌</span> Most photography courses:
                </p>
                <ul className="space-y-4 text-gray-700">
                  {[
                    "Overwhelm kids with technical jargon",
                    "Focus on equipment and settings",
                    "Taught by people who've never worked with teens",
                    "Generic feedback, if any",
                    "No real community"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-red-500 text-xl">×</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
                <p className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">✓</span> This program:
                </p>
                <ul className="space-y-4 text-gray-700">
                  {[
                    "Speaks your teen's language (I've coached high schoolers for years)",
                    "Focuses on vision first, technique second",
                    "Small cohort (max 10) = real feedback on every photo",
                    "Direct access to me in the chat group",
                    "Built specifically for busy teenage schedules"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-600 text-xl">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Section */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif2 font-bold mb-10 text-gray-900 text-center">
              Real Talk: The Investment
            </h2>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-2xl font-bold text-gray-900">
                  This program isn't cheap.
                </p>
                <p className="text-xl font-semibold text-gray-900">Why?</p>
                <p>
                  Because I'm not running a factory. I'm capping this at 10 students so everyone gets real attention, real feedback, real transformation.
                </p>
                <p>
                  I've spent 15 years mastering this craft and coaching others to do the same. That expertise isn't available at Udemy prices.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-6">
                  <p className="font-bold text-gray-900 mb-3">This is for parents who understand:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>12 weeks of focused mastery > 4 years of dabbling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>A skill that sets your teen apart is priceless</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>The best time to invest in your kid is before they leave your house</span>
                    </li>
                  </ul>
                </div>
                <p className="text-xl font-semibold text-gray-900">
                  If you're looking for cheap, this isn't it.
                </p>
                <p className="text-xl font-bold text-gray-900">
                  If you're looking for your teen to actually become exceptional at something creative before college, keep reading.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-yellow-400 to-yellow-500">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-4 border-yellow-600">
              <h2 className="text-4xl md:text-5xl font-serif2 font-bold mb-8 text-gray-900 text-center">
                My Guarantee
              </h2>
              <p className="text-2xl font-bold text-gray-900 mb-6 text-center">Why You Can't Lose</p>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-2xl font-bold text-gray-900 text-center mb-6">
                  Here's my promise:
                </p>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-xl text-gray-900 mb-4">
                    At the end of 12 weeks, if you don't feel your teen received more value than you paid — if they didn't transform into a genuinely skilled photographer — I'll refund you completely.
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    No questions. No hassle. No hard feelings.
                  </p>
                </div>
                <p className="text-center">
                  I've staked my reputation on this work for 15 years. I'm not about to cut corners now.
                </p>
                <p className="text-3xl font-bold text-gray-900 text-center mt-8">
                  You risk nothing. Your teen gains everything.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reality Check Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif2 font-bold mb-10 text-gray-900 text-center">
              The Reality Check
            </h2>
            <div className="space-y-8">
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
                <p className="text-xl font-bold text-gray-900 mb-4">This isn't for everyone.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 text-xl">❌</span>
                    <span>Not for parents looking for cheap entertainment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 text-xl">❌</span>
                    <span>Not for teens who won't show up</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 text-xl">❌</span>
                    <span>Not for families hoping their kid "finds themselves" through passive participation</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
                <p className="text-xl font-bold text-gray-900 mb-4">This IS for:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 text-xl">✓</span>
                    <span>Parents who want to give their teen a real, marketable creative skill</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 text-xl">✓</span>
                    <span>Teens who are ready to show up and do the work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 text-xl">✓</span>
                    <span>Families who understand that mastery requires commitment</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-10 text-center shadow-2xl">
                <p className="text-4xl md:text-5xl font-bold mb-4">
                  10 spots. That's it.
                </p>
                <p className="text-xl text-gray-300">
                  Once they're gone, the next cohort won't start until next quarter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="apply" className="py-20 md:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-serif2 font-bold mb-10">
              What Happens Next
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-10 text-left">
              {[
                { num: "1", title: "Fill out application", desc: "Click the button below and complete the short form" },
                { num: "2", title: "Personal review", desc: "I'll review it and reach out within 24 hours" },
                { num: "3", title: "Quick call", desc: "We'll chat to make sure this is the right fit" },
                { num: "4", title: "Transformation begins", desc: "Your teen starts their 12-week journey" }
              ].map((step, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-400 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1">{step.title}</p>
                      <p className="text-gray-300">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#apply"
              className="inline-flex items-center gap-3 px-12 py-6 bg-white text-gray-900 text-2xl font-bold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 transform mb-6"
            >
              APPLY FOR YOUR TEEN'S SPOT
              <span className="text-3xl">→</span>
            </a>
            <p className="text-gray-400 text-sm">
              10 spots available • Next cohort starts [DATE]
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif2 font-bold mb-12 text-gray-900 text-center">
              FAQ
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Does my teen need any photography experience?",
                  a: "No. I'll teach them everything from scratch. All they need is a camera (even a smartphone works to start)."
                },
                {
                  q: "What if my teen is too busy with school/sports?",
                  a: "The program is designed for busy schedules. 1 video lesson + 1 group call per week. That's it. If they can't commit 2-3 hours per week, this isn't the right time."
                },
                {
                  q: "What kind of camera do they need?",
                  a: "Any camera works — DSLR, mirrorless, even a smartphone. I teach vision first, equipment second."
                },
                {
                  q: "What if my teen loses interest halfway through?",
                  a: "That's on me. If I can't keep them engaged and excited, I haven't done my job. Remember: full refund if you're not satisfied."
                },
                {
                  q: "Is this live or pre-recorded?",
                  a: "Hybrid. Video lessons are pre-recorded (so they can watch on their schedule). Group calls are live every week (so they get real-time feedback and community)."
                },
                {
                  q: "Can my teen really become an expert in 12 weeks?",
                  a: "Yes. Photography is unique — it's the only art form where you can go from beginner to genuinely skilled in months, not years. I've seen it happen dozens of times."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Q: {faq.q}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    A: {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-serif2 font-bold mb-8">
              Last Thing
            </h2>
            <div className="space-y-6 text-xl text-gray-300 leading-relaxed mb-10">
              <p>
                Your teen is about to leave for college.
              </p>
              <p>
                They'll either leave with a creative skill that sets them apart — something they're genuinely proud of, something that opens doors — or they'll leave like most kids: competent but unremarkable.
              </p>
              <p className="text-3xl md:text-4xl font-bold text-white mt-8">
                12 weeks. 10 spots.
              </p>
              <p>
                If you'd like to gift your teen this transformation, apply below.
              </p>
            </div>
            <a
              href="#apply"
              className="inline-flex items-center gap-3 px-12 py-6 bg-white text-gray-900 text-2xl font-bold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 transform"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              SECURE YOUR TEEN'S SPOT
              <span className="text-3xl">→</span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default Course;
