import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Feature Management
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/add" className="text-white">
            Add Feature
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;