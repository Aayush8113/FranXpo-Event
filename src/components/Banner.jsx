import React, { useState, useEffect } from "react";
import "./Banner.css";
import ActionModal from "./ActionModal";

const Banner = () => {
  const images = [
    "https://erpnews.com/v2/wp-content/uploads/2022/09/Corporate-Event-1.webp",
    "https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE="
  ];

  const bannerTexts = [
    {
      title: "Good For Brands, Great For Business",
      subtitle: "Showcase your products at Franmax Expo 2025",
      button: "Book Your Stall"
    },
    {
      title: "Expand Your Network, Grow Your Franchise",
      subtitle: "Connect with industry leaders and partners",
      button: "Register Now"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const { title, subtitle, button } = bannerTexts[currentIndex];

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        id="home"
        className="banner"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="overlay">
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <button className="banner-btn" onClick={handleButtonClick}>
            {button}
          </button>
        </div>
      </div>

      {isModalOpen && <ActionModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Banner;
