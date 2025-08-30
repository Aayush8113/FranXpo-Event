// import React from "react";
// import "./Navbar.css";
// import logo from "../assets/logo/logo.png";

// const Navbar = () => {
//   return (
//     <nav className="top-navbar">
//       <div className="logo">
//         <img src={logo} alt="Logo" />
//       </div>
//       <ul className="nav-links">
//         <li><a href="#home">Home</a></li>
//         <li><a href="#about">About Us</a></li>
//         <li><a href="#exclusive-rights">Exclusivity</a></li>
//         <li><a href="#contact">Contact</a></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;





import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "./navlinks.js";
import "./Navbar.css";
import logo from "../assets/logo/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleAnchorClick = (link) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.querySelector(link.path);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const section = document.querySelector(link.path);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="top-navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

    <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
  {navLinks
    .filter(link => link.showInNavbar) // only show links marked for Navbar
    .map((link) =>
      link.type === "anchor" ? (
        <li key={link.name}>
          <a
            href={link.path}
            onClick={(e) => {
              e.preventDefault();
              handleAnchorClick(link);
            }}
          >
            {link.name}
          </a>
        </li>
      ) : (
        <li key={link.name}>
          <Link to={link.path} onClick={() => setMenuOpen(false)}>
            {link.name}
          </Link>
        </li>
      )
    )}
</ul>


      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
