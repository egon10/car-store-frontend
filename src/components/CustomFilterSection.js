import React, { Fragment, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const CustomFilterSection = ({ name, mobileMenu, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const DROPDOWN_ANIMATION_DELAY = 400;

  return (
    <Fragment>
      {mobileMenu ? (
        <div className="border-t border-gray-200 px-4 py-6">
          <h3 className="-mx-2 -my-4 flow-root">
            <button
              type="button"
              className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-mobile-1"
              aria-expanded="false">
              <span className="font-medium text-gray-900"> {name} </span>
              <span className="ml-6 flex items-center">
                {!isOpen ? (
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    onClick={() => setIsOpen(true)}>
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    onClick={() => setIsOpen(false)}>
                    <path
                      fillRule="evenodd"
                      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            </button>
          </h3>
          <CSSTransition
            in={isOpen}
            exit={!isOpen}
            timeout={DROPDOWN_ANIMATION_DELAY}
            classNames="dropdown"
            unmountOnExit
            onExited={() => setIsOpen(false)}>
            <div className="pt-6" id={`filter-section-mobile-${name} `}>
              <div className="space-y-6">{children}</div>
            </div>
          </CSSTransition>
        </div>
      ) : (
        <div className="border-b border-gray-200 py-6">
          <h3 className="-my-4 flow-root">
            <button
              type="button"
              className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500 "
              aria-controls="filter-section-1"
              aria-expanded="false"
              onDoubleClick={() => setIsOpen(!isOpen)}>
              <span className="font-medium text-gray-900" onClick={() => setIsOpen(!isOpen)}>
                {' '}
                {name}{' '}
              </span>
              <span className="ml-6 flex items-center">
                {!isOpen ? (
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    onClick={() => setIsOpen(true)}>
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    onClick={() => setIsOpen(false)}>
                    <path
                      fillRule="evenodd"
                      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            </button>
          </h3>

          <CSSTransition
            in={isOpen}
            exit={!isOpen}
            timeout={DROPDOWN_ANIMATION_DELAY}
            classNames="dropdown"
            unmountOnExit
            onExited={() => setIsOpen(false)}>
            <div className="pt-6" id={`filter-section-${name}`}>
              <div className="space-y-4">{children}</div>
            </div>
          </CSSTransition>
        </div>
      )}
    </Fragment>
  );
};

export default CustomFilterSection;
