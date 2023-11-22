import React from "react";
import "./Contact.css";
import SectionHeader from "../section-header/SectionHeader";
import CustomButton from "../custom-button/CustomButton";

const Contact = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader title="Get in touch" description="Let me know what you need, and I'll get back to you ASAP." />
      <form action="" className="mx-auto mb-0 mt-8 max-w-lg space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input type="text" id="name" placeholder="Name" className="input" />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input type="email" id="email" placeholder="Email" className="input" />
        </div>

        <div>
          <label htmlFor="phone" className="sr-only">
            Phone Number
          </label>
          <input type="tel" id="phone" placeholder="Phone Number" className="input" />
        </div>

        <div>
          <label htmlFor="message" className="sr-only">
            What are you looking for?
          </label>
          <textarea id="message" placeholder="What are you looking for?" rows="4" className="input"></textarea>
        </div>

        {/* <button type="submit" className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
          Submit
        </button> */}

        <CustomButton label="Send" className="w-full rounded" />
      </form>
    </div>
  );
};

export default Contact;
