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
      const minOpacity = 0.3;

      const calculatedOpacity = 1 - scrollPosition / maxScroll;
      const newOpacity = Math.max(minOpacity, calculatedOpacity);

      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hideOnPath = ["/register", "/login", "/Home"];

  if (hideOnPath.includes(location.pathname)) {
    return null;
  }

  return (
    <div
      className="mobile-nav-container"
      style={{
        backgroundColor: `rgba(27, 32, 37, ${opacity})`,
        boxShadow: `0px 10px 20px rgba(0, 0, 0, ${opacity * 0.4})`,
        border: `1px solid rgba(255, 255, 255, ${opacity * 0.1})`,
      }}
    >
      {/* dashboard */}
      <button
        className="mobile-nav-button"
        onClick={() => navigate("/dashboard")}
      >
        <i class="bi bi-house-door fs-5"></i>
      </button>

      {/* charts */}
      <button className="mobile-nav-button" onClick={() => navigate("/charts")}>
        <i class="bi bi-graph-up fs-5"></i>
      </button>

      {/* notifications */}
      <button
        className="mobile-nav-button"
        onClick={() => navigate("/notifications")}
      >
        <i class="bi bi-bell fs-5"></i>
      </button>

      {/* AI */}
      <button className="mobile-nav-button" onClick={() => navigate("/ai")}>
        <i class="bi bi-robot fs-5"></i>
      </button>
    </div>
  );
};

export default MobileNavbar;
