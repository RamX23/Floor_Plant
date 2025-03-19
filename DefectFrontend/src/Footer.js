
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer
      className="footer text-dark fw-bold text-center py-0"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: '#ff7f0e',
        zIndex: 9999, // Ensure it stays above the content
        padding: '1rem',
        fontFamily: "Montserrat, sans-serif"
      }}
    >
      &copy; 2024 Thetavega Tech Pvt. Ltd.
    </footer>
  );
};

export default Footer;