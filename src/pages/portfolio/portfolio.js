import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import IMAGES from "../../common/images";
import Photo from "../../components/image-displays/photo/Photo";
import Photos from "../../components/image-displays/photos/Photos";
import Hero from "../../components/hero/Hero";
import Testimonial from "../../components/testimonial/Testimonial";
import Text from "../../components/text/Text";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Portfolio = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const categories = [
    {
      name: "Landscapes",
      description:
        "Landscapes have always been at the heart of my photography. There’s something deeply inspiring about capturing the vast beauty of nature—from towering mountains to serene valleys. Standing in front of grand landscapes is a humbling experience, and each scene I capture often reflects my mood in that moment.",
      images: [IMAGES.landscapes.pastel, IMAGES.landscapes.mac, IMAGES.landscapes.gateway],
      link: "/portfolio/landscapes",
    },
    {
      name: "Portraits",
      description: "Capturing a person's character, beauty, and grace in a single frame is incredibly fulfilling. Over the years, I've photographed some truly kind-hearted and beautiful individuals. Here are a few of my favorites.",
      images: [IMAGES.portraits.naga, IMAGES.portraits.mala],
      link: "/portfolio/portraits",
    },
    {
      name: "Bollywood",
      description: "I was fortunate to shoot some talented Bollywood actors, directors, and musicians. If you'd like to know how I got this opportunity, I've written about it here. Hope you enjoy this collection.",
      images: [IMAGES.bollywood.katrina, IMAGES.bollywood.atif],
      link: "/portfolio/bollywood",
    },
    {
      name: "Tennis",
      description: "As one of the official photographers for the BNP Paribas Open at Indian Wells in 2018, I enjoyed capturing some of the world's best tennis players in action. Here are some of my favorite shots.",
      images: [IMAGES.tennis.federer.fed1, IMAGES.tennis.federer.fed2, IMAGES.tennis.novak],
      link: "/portfolio/tennis",
    },
  ];

  const testimonialsData = [
    {
      testimony:
        "Having worked with Swami for over 7 years now, I can't come up with all the superlatives to describe how great it is to work with him. Thank you for your patience and professionalism. You have driven out far and wide for us and put up with two kids under five multiple times. You make everyone feel comfortable and helped capture some very precious moments of life for us. We love having you as our photographer.",
      name: "Naga Madhavapeddi",
      reverse: false,
      layout: "layout2",
    },
    {
      altText: "Vivek Gupta",
      testimony: "Your photos are amazing—super high quality, especially the ones of Katrina. Out of all the photos from the six tours, yours are the best. The quality of your work proves you're one of the top photographers in the world. Thanks for sharing these stunning images!",
      name: "Vivek Gupta",
      role: "",
      layout: "layout2",
    },
    {
      altText: "Sirish M",
      testimony:
        "Swami is far more than just another photographer—his work has a distinct element of magic. One of his photographs of the Golden Gate Bridge was even featured in the National Geographic a few years ago. I’ve personally seen his creativity shine at several concerts, where he consistently stood out among the other photographers. With the love, passion, and dedication he pours into his craft, Swami’s pictures truly speak louder than a thousand words.",
      name: "Sirish M",
      role: "",
      layout: "layout2",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto">
      <Hero title="Portfolio" showSubNav={true}>
        <p>
          A collection of my best work, you could say. My heart has always been in <a href="/landscapes">landscapes</a> and nature, but I also enjoy shooting <a href="/portraits">portraits</a>.
        </p>
      </Hero>

      <Photo src={IMAGES.landscapes.mac} alt="Sample Landscape" title="Majestic Mountains" caption="A breathtaking view of the mountains during sunrise." />
      <Photo src={IMAGES.landscapes.paris} alt="Sample Portrait" title="Captivating Portrait" caption="Capturing emotions through the lens." />

      <section className="py-12">
        <Testimonial {...testimonialsData[0]} />
      </section>

      <Photo src={IMAGES.landscapes.fog} alt="Sample Portrait" title="Captivating Portrait" caption="Capturing emotions through the lens." />
      <h3 className="mb-5 font-medium text-xl tracking-wide uppercase text-red-700">National Geographic Editor's Favorite</h3>

      <Text>
        <p>
          A lot of photographers stick to one genre, but I’ve always struggled with that. My heart is in landscapes and nature—there’s something about capturing portraits I really love. There's a unique connection and story that comes with every person I photograph, and that’s something I don’t want
          to give up. So my portfolio is a mixed bag of serene landscapes and beautiful people!
        </p>
      </Text>

      <section className="py-12">
        {categories.map((category, index) => (
          <div key={category.name} className={`flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""} mb-12`}>
            <div className="md:w-2/3">
              <Slider {...settings}>
                {category.images.map((image, imgIndex) => (
                  <img key={imgIndex} src={image} alt={category.name} className="w-full h-auto rounded-lg shadow-lg" />
                ))}
              </Slider>
            </div>
            <div className="md:w-1/3 flex flex-col justify-center p-10 text-left">
              <Link to={category.link} className="no-underline">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 hover:opacity-75 transition-opacity duration-300">{category.name}</h2>
                <p className="text-xl hover:opacity-75 transition-opacity duration-300">{category.description}</p>
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="py-12">
        <Testimonial {...testimonialsData[1]} />
      </section>

      <Photos layout="verticalPair">
        <Photo src={IMAGES.portraits.amrita} alt="Photo 1" />
        <Photo src={IMAGES.portraits.suma2} alt="Photo 2" />
      </Photos>

      <Testimonial {...testimonialsData[2]} />

      <section className="py-12">
        {categories.map((category, index) => (
          <div key={category.name} className={`flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""} mb-12`}>
            <div className="md:w-2/3">
              <Slider {...settings}>
                {category.images.map((image, imgIndex) => (
                  <img key={imgIndex} src={image} alt={category.name} className="w-full h-auto rounded-lg shadow-lg" />
                ))}
              </Slider>
            </div>
            <div className="md:w-1/3 flex flex-col justify-center p-10 text-left">
              <Link to={category.link} className="no-underline">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 hover:opacity-75 transition-opacity duration-300">{category.name}</h2>
                <p className="text-xl hover:opacity-75 transition-opacity duration-300">{category.description}</p>
              </Link>
            </div>
          </div>
        ))}
      </section>

      <Photo src={IMAGES.bollywood.atif} alt="Photo 1" />
    </main>
  );
};

export default Portfolio;
