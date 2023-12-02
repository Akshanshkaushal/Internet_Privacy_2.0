 // Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-4 w-full">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Photo Gallary. All Rights Reserved.
        </p> 
        <p className="text-sm mt-2">
          Find us on GitHub:
          <a
            href="https://github.com/Akshanshkaushal/internet_privacy_2.0"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-blue-400 hover:underline"
          >
          GitHub 
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
