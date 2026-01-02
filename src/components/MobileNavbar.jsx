import "./MobileNavbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MobileNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 200;
      let newOpacity = 1 - scrollPosition / maxScroll;
      if (newOpacity < 0) newOpacity = 0;

      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hideOnPath = ["/register", "/login", "/home", "/"];

  if (hideOnPath.includes(location.pathname.toLowerCase())) {
    return null;
  }

  return (
    <div
      className="mobile-nav-container"
      style={{
        opacity: opacity,
        pointerEvents: opacity <= 0 ? "none" : "auto",
      }}
    >
      {/* dashboard */}
      <button
        className="mobile-nav-button"
        onClick={() => navigate("/dashboard")}
      >
        <i className="bi bi-house-door fs-5 mobile-nav-button"></i>
      </button>

      {/* charts */}
      <button className="mobile-nav-button" onClick={() => navigate("/charts")}>
        <i className="bi bi-graph-up fs-5 mobile-nav-button"></i>
      </button>

      {/* notifications */}
      <button
        className="mobile-nav-button"
        onClick={() => navigate("/notifications")}
      >
        <i className="bi bi-bell fs-5 mobile-nav-button"></i>
      </button>

      {/* AI */}
      <button className="mobile-nav-button" onClick={() => navigate("/AI")}>
        <i className="bi bi-robot fs-5 mobile-nav-button"></i>
      </button>
    </div>
  );
};

export default MobileNavbar;
