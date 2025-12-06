import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const Footer = () => {
  // FIX 1: Correctly destructure useState, using brackets [ ] instead of braces { }
  // FIX 2: Correctly define the state variables (currentYear and setCurrentYear)
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    const now = dayjs();
    const yearString = now.format('YYYY');
    
    // FIX 3: Uncomment and use the state setter function
    setCurrentYear(yearString);
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <div>
      <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-gray-100 border-t border-gray-200 shadow-sm md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-gray-600 sm:text-center">
          {/* FIX 4: Move the year inside the copyright symbol, or place it logically */}
         {currentYear}©  {' '}
          <Link to={"/"} className="hover:underline">
            TodoApp
          </Link>
          . All Rights Reserved.
        </span>

        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-600 sm:mt-0">
          <li>
            <Link to={"/about"}  className="hover:underline me-4 md:me-6">
              About
            </Link>
          </li>
          <li>
            <Link to={"/"} className="hover:underline me-4 md:me-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to={"/"} className="hover:underline me-4 md:me-6">
              Licensing
            </Link>
          </li>
          <li>
            <Link to={"/contact"}  className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;