import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-600">
                ByteGurukul
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block">
            <div className="flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="/courses" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                Courses
              </a>
              <a href="/resources" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                Resources
              </a>
              <a href="/projects" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                Projects
              </a>
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="btn-secondary">
              Login
            </button>
            <button className="btn-primary">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;