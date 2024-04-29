import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center focus:outline-none mx-2"
      >
        <svg
          className="h-5 w-5 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute z-10 top-full right-0 mt-2 bg-white border rounded-md shadow-md py-2 px-4 w-48">
          <li className="mb-1 border-b border-gray-300">
            <Link
              to="/private/schedule"
              className="text-neutral-900 text-sm hover:text-gray-700"
            >
              Schedule
            </Link>
          </li>
          <li className="mb-1 border-b border-gray-300">
            <Link
              to="/private/seeAllForms"
              className="text-neutral-900 text-sm hover:text-gray-700"
            >
              Applied Events
            </Link>
          </li>
          <li>
            <Link
              to="/private/form"
              className="text-neutral-900 text-sm hover:text-gray-700"
            >
              Apply For Event
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
