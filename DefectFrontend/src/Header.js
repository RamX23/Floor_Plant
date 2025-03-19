import React from "react";
import {  FaBell, FaClipboard, FaBars } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../src/Images/bajajlogo.png";
import logo1 from "./Images/Thetalogo.png";

function Header({ toggleSidebar }) {
  return (
    <header
      className="bg-light text-white py-2 px-3 d-flex align-items-center justify-content-between overflow-X-hidden fixed sticky-top"
      style={{ fontFamily: "Montserrat, sans-serif", height: "60px" }}
    >
      <div className="d-flex align-items-center">
        {/* Toggle Button for Sidebar (Small Screens Only) */}
        <div className="d-lg-none me-3">
          <button
            className="btn btn-outline-light btn-sm border-0"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <FaBars size={20} />
          </button>
        </div>

        {/* Search Bar (Visible on Larger Screens Only) */}
        {/* <div className="d-none d-lg-flex align-items-center">
          <div className="input-group rounded bg-light">
            <span className="input-group-text bg-transparent border-0">
              <FaSearch className="text-secondary" />
            </span>
            <input
              type="text"
              className="form-control bg-transparent border-0"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </div> */}
        {/* Logo (Visible on Larger Screens Only) */}
<div className="d-none d-lg-flex align-items-center">
  <img
    src={logo1} // Replace with the path to your logo file
    alt="Logo"
    className="img-fluid"
    style={{ maxHeight: "40px" }} // Adjust the height of the logo as needed
  />
</div>

      </div>

      {/* Icons and Profile Section */}
      <div className="d-flex align-items-center gap-3">
        {/* <FaBell className="fs-5" /> */}
        {/* <FaClipboard className="fs-5" /> */}
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="Profile"
            className=" me-2"
            style={{ width: "100px", height: "50px" }}
          />
          {/* <span>John Snow</span> */}
        </div>
      </div>
    </header>
  );
}

export default Header;