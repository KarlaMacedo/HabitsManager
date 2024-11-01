import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex flex-wrap items-center justify-between py-3 bg-indigo-500 mb-3 z-10">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className="text-sm font-bold leading-relaxed inline-block ml-4 py-2 whitespace-no-wrap uppercase text-white"
            href="/"
          >
            Habits Manager
          </a>
        </div>
      </div>
    </nav>
  );
};
