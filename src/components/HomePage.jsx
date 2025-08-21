import React from "react";
import './HomePage.css';
import Banner from './Banner';
import AboutSection from './AboutSection';
import ExclusiveRights from "./ExclusiveRights";
import ContactSection from "./ContactSection";
import OurPartners from "./OurPartners";
import CountdownTimer from "./CountdownTimer";
import OpportunitiesSection from "./OpportunitiesSection";
const Homepage = () => {
  return (
    <div className="homepage">
      <main className="main-content">
        <Banner />
        <AboutSection />
        <ExclusiveRights />
        
        <CountdownTimer />
        
        <OurPartners />
        <ContactSection />
       

       
      </main>
    </div>
  );
};

export default Homepage;
