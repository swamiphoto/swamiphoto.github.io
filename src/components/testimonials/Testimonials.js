import React from "react";

const Testimonials = ({ testimonials }) => {
  return (
    <div className="relative isolate bg-white pb-32 pt-24 sm:pt-32">
      <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl" aria-hidden="true">
        <div
          className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
          style={{
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end" aria-hidden="true">
        <div
          className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]"
          style={{
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">We have worked with thousands of amazing people</p>
        </div>

        {/* Testimonials grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
              {columnGroup.map((testimonial, testimonialIdx) => (
                <figure key={testimonialIdx} className={`rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 ${testimonial.featured ? "sm:col-span-2 xl:col-start-2 xl:row-end-1" : ""}`}>
                  <blockquote className={`text-gray-900 ${testimonial.featured ? "text-lg sm:text-xl" : ""}`}>
                    <p>{`“${testimonial.body}”`}</p>
                  </blockquote>
                  {testimonial.author && (
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      {testimonial.author.imageUrl && <img className="h-10 w-10 rounded-full bg-gray-50" src={testimonial.author.imageUrl} alt={testimonial.author.name} />}
                      <div>
                        <div className="font-semibold">{testimonial.author.name}</div>
                        <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                      </div>
                      {testimonial.author.logoUrl && <img className="h-10 w-auto flex-none" src={testimonial.author.logoUrl} alt={`${testimonial.author.name}'s logo`} />}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
