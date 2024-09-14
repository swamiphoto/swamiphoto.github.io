import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import IMAGES from "../../common/images";
import Photo from "../../components/image-displays/photo/Photo";
import Photos from "../../components/image-displays/photos/Photos";
import Hero from "../../components/hero/Hero";
import Testimonial from "../../components/testimonial/Testimonial";
import Text from "../../components/text/Text";
import SectionHeader from "../../components/section-header/SectionHeader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Podcast from "../../components/podcast/Podcast";
import RecentWork from "../../components/recent-work/RecentWork";
import WiggleLine from "../../components/wiggle-line/WiggleLine";

const Portfolio = () => {
  const baseSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const categories = [
    {
      name: "Landscapes & Cities",
      description:
        "Landscapes have always been at the heart of my photography. There’s something deeply inspiring about capturing the vast beauty of nature—from towering mountains to serene valleys. Standing in front of grand landscapes is a humbling experience, and each scene I capture often reflects my mood in that moment.",
      images: [IMAGES.landscapes.pastel, IMAGES.landscapes.mac, IMAGES.landscapes.bbridge],
      link: "/portfolio/landscapes",
      autoplaySpeed: 4000,
    },
    {
      name: "Portraits",
      description: "Capturing a person's character, beauty, and grace in a single frame is incredibly fulfilling. Over the years, I've photographed some truly kind-hearted and beautiful individuals. Here are a few of my favorites.",
      images: [IMAGES.portraits.naga, IMAGES.portraits.mala],
      link: "/portfolio/portraits",
      autoplaySpeed: 4500,
    },
    {
      name: "Bollywood",
      description: "I was fortunate to shoot some talented Bollywood actors, directors, and musicians. If you'd like to know how I got this opportunity, I've written about it here. Hope you enjoy this collection.",
      images: [IMAGES.bollywood.katrina, IMAGES.bollywood.katrina2, IMAGES.bollywood.nargis3],
      link: "/portfolio/bollywood",
      autoplaySpeed: 5000,
    },
  ];

  const testimonialsData = [
    {
      imageSrc: IMAGES.headshots.naga,
      testimony:
        "Having worked with Swami for over 7 years now, I can't come up with all the superlatives to describe how great it is to work with him. Thank you for your patience and professionalism. You have driven out far and wide for us and put up with two kids under five multiple times. You make everyone feel comfortable and helped capture some very precious moments of life for us. We love having you as our photographer.",
      name: "Naga Madhavapeddi",
      reverse: false,
      layout: "layout3",
    },
    {
      testimony: "Your photos are amazing—super high quality, especially the ones of Katrina. Out of all the photos from the six tours, yours are the best. The quality of your work proves you're one of the top photographers in the world. Thanks for sharing these stunning images!",
      name: "Vivek Gupta",
      layout: "layout2",
    },
    {
      testimony:
        "Swami is far more than just another photographer—his work has a distinct element of magic. One of his photographs of the Golden Gate Bridge was even featured in the National Geographic a few years ago. I’ve personally seen his creativity shine at several concerts, where he consistently stood out among the other photographers. With the love, passion, and dedication he pours into his craft, Swami’s pictures truly speak louder than a thousand words.",
      name: "Sirish M",
      layout: "layout2",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto">
      <Hero title="Portfolio" showSubNav={true}>
        <p>
          A collection of my best work, you could say. My heart has always been in{" "}
          <Link to="/landscapes" className="no-underline">
            landscapes
          </Link>{" "}
          and nature, but I also enjoy shooting{" "}
          <Link to="/portraits" className="no-underline">
            portraits
          </Link>
          .
        </p>
      </Hero>

      <Photo src={IMAGES.landscapes.mac} caption="My attempt at recreating the scene from one of the iconic Mac wallpapers" />
      <Photo
        src={IMAGES.landscapes.paris}
        caption="Sometimes, the best shots are the ones you don’t plan for. I started at Trocadéro for a sunrise shot, but the clouds were too thick. On my way back, the clouds suddenly broke, and I noticed the sun streaks. I quickly grabbed my camera and took this handheld shot."
      />

      <Testimonial {...testimonialsData[0]} />

      <Photo src={IMAGES.landscapes.fog} caption="National Geographic Editor's Favorite" captionDesign="design2" />
      <Photo src={IMAGES.landscapes.gateway} caption="This image was chosen as the official backdrop for the Social Media Week conference in Mumbai." captionDesign="design2" />

      <Photo
        src="https://storage.googleapis.com/swamiphoto/photos/recent/aurora2.jpg"
        layout="print"
        title="Auoara Borealis in California"
        caption="Who would’ve thought you could see the Aurora in California? As soon as I heard it was possible, I grabbed a few friends, and we dashed to Livermore to capture this rare, once-in-a-blue-moon shot. SFGATE featured this image in their publication the next morning."
      />

      <Text>
        <p>
          A lot of photographers stick to one genre, but I’ve always struggled with that. My heart is in landscapes and nature, but there’s something about capturing portraits I really love. It's the unique connection and story that comes with every person and family I photograph, and that’s
          something I cannot give up. So my portfolio is a mix of landscapes, portraits, and other genres I’ve dabbled in over the years.
        </p>
      </Text>

      <section className="pt-12">
        {categories.map((category, index) => (
          <div key={category.name} className={`flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""} mb-12`}>
            <div className="md:w-2/3 overflow-hidden bg-white">
              <Slider {...{ ...baseSettings, autoplaySpeed: category.autoplaySpeed }}>
                {category.images.map((image, imgIndex) => (
                  <Link to={category.link} key={imgIndex} className="block">
                    <img src={image} className="w-full h-auto rounded-lg shadow-lg hover:opacity-75 transition-opacity duration-300" />
                  </Link>
                ))}
              </Slider>
            </div>
            <div className="md:w-1/3 flex flex-col justify-center p-10 text-left">
              <Link to={category.link} className="no-underline hover:opacity-75 transition-opacity duration-300">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 no-underline">{category.name}</h2>
                <p className="text-xl no-underline">{category.description}</p>
              </Link>
            </div>
          </div>
        ))}
      </section>

      <Testimonial {...testimonialsData[1]} />

      <Photos layout="verticalPair">
        <Photo src={IMAGES.portraits.amrita} />
        <Photo src={IMAGES.portraits.suma2} />
      </Photos>

      <Testimonial {...testimonialsData[2]} />

      {/* <Podcast /> */}
      <RecentWork />
      <WiggleLine />
    </main>
  );
};

export default Portfolio;
