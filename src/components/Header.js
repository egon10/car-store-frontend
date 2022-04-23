import React, { useEffect, useState } from 'react';
import { AiFillCar } from 'react-icons/ai';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';

const navigationOptions = [
  //{ name: 'Home', link: '/home', selected: false },
  //{ name: 'Cars', link: '/cars', selected: false },
  //{ name: 'About us', link: '/about-us', selected: false },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(1920);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        setWidth(window.innerWidth);
        setIsOpen(false);
      },
      false
    );
  }, [width]);

  const pathName = useLocation().pathname;

  navigationOptions.forEach((option) => {
    if (pathName === option.link) option.selected = true;
  });

  return (
    <div className="bg-gray-800/95 mb-4 fixed w-screen md:w-auto md:sticky  top-0 backdrop-blur-lg z-30">
      <div className="container max-w-8xl mx-auto px-8 ">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              onClick={() => setIsOpen(!isOpen)}>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <AiFillCar className="h-9 w-auto fill-white m-2" />
              <h2 className="text-white font-semibold text-2xl">EFT Cars</h2>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex items-center h-12">
                {navigationOptions.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.link}
                    className={`
                        ${
                          item.selected
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer select-none'
                        } px-3 py-2 rounded-md text-sm font-medium`}
                    aria-current={item.current ? 'page' : undefined}>
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="">
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <a href="/cart">
                <HiOutlineShoppingCart className="h-6 w-6 mr-4 sm:mr-2" aria-hidden="true" />
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
