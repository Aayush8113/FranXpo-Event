import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "./navlinks.js";
import "./Footer.css";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

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
  };

  return (
    <footer className="footer">
      <p>
        {navLinks.map((link, index, arr) => (
          <span key={link.name}>
            {link.type === "anchor" ? (
              <a
                href={link.path}
                className="footer-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleAnchorClick(link);
                }}
              >
                {link.name}
              </a>
            ) : (
              <Link to={link.path} className="footer-link">
                {link.name}
              </Link>
            )}
            {index < arr.length - 1 ? " | " : ""}
          </span>
        ))}
      </p>
      <p className="footer-copy">
        © {new Date().getFullYear()} Franmax India. All rights reserved.
      </p>
    </footer>
  );
}
