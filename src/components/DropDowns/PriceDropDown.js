import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { utils } from '../../utils/utils';

import { CSSTransition } from 'react-transition-group';

const PriceDropDown = ({ text, options, elementId, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      const { parentElement } = e.target;

      if (parentElement.id === `menu-button-icon-close`) setIsOpen(false);

      if (parentElement.id === `menu-button-${elementId}`) return;
      if (parentElement.id !== `a-dropdown-menu-${elementId}`) setIsOpen(false);
    };

    document.addEventListener('click', handleClick);
  }, []);

  return (
    <div className="relative inline-block text-left w-full">
      <div className="" id={`a-dropdown-menu-${elementId}`}>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm text-gray-600 hover:bg-gray-50 "
          id={`menu-button-${elementId}`}
          onClick={() => setIsOpen(!isOpen)}>
          <span id="input-title">{selected ? utils.priceify(selected) : text}</span>
          {selected ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-mr-1 ml-2 h-5 w-5"
              viewBox="0 0 20 20"
              id="menu-button-icon-close"
              fill="currentColor"
              onClick={() => setSelected(null)}>
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              id="menu-button-icon"
              aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
      <CSSTransition
        in={isOpen}
        exit={!isOpen}
        timeout={1000}
        classNames="dropdown"
        unmountOnExit
        onExited={() => setIsOpen(false)}>
        {
          <div
            className="origin-top-right absolute right-0 mt-2 w-full rounded-lg shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5 focus:outline-none"
            id="dropdown-menu">
            <div className="py-1" role="none">
              {options &&
                options.map((option, index) => (
                  <p
                    className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                    onClick={() => setSelected(option)}
                    key={index}
                    id={`menu-item-${index}`}>
                    {utils.priceify(option)}
                  </p>
                ))}
            </div>
          </div>
        }
      </CSSTransition>
    </div>
  );
};

PriceDropDown.propTypes = {
  text: PropTypes.string,
  options: PropTypes.array,
  elementId: PropTypes.number,
  selected: PropTypes.number,
  setSelected: PropTypes.func,
};

export default PriceDropDown;
