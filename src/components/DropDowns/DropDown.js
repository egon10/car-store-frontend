import React, { Fragment, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import { CSSTransition } from 'react-transition-group';

import '../../animations.css';
const DropDown = ({ name, options, callback, exitOnSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Fragment>
      <div>
        <button
          type="button"
          className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
          id="menu-button"
          onClick={() => setIsOpen(!isOpen)}>
          {name}
          <svg
            className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <CSSTransition
          in={isOpen}
          exit={!isOpen}
          timeout={1000}
          classNames="dropdown"
          unmountOnExit
          onExited={() => setIsOpen(false)}>
          {
            <div
              className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              tabindex="-1">
              <div className="py-1" role="none">
                {options.map((option, index) => (
                  <button
                    className={`${
                      selectedIndex == index ? 'font-medium text-gray-900' : 'text-gray-500 text-sm'
                    } block px-4 py-2 text-sm`}
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                    key={index}
                    onClick={() => {
                      setSelectedIndex(index);
                      callback({ selected: option, index: index });

                      if (exitOnSelect) setIsOpen(false);
                    }}>
                    {' '}
                    {option}{' '}
                  </button>
                ))}
              </div>
            </div>
          }
        </CSSTransition>
      </div>
    </Fragment>
  );
};

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  callback: PropTypes.func,
  exitOnSelect: PropTypes.bool,
};

DropDown.defaultProps = {
  name: '',
  options: [],
  callback: () => {},
  exitOnSelect: true,
};

export default DropDown;
