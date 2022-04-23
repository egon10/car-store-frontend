import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const FilterSection = ({
  filterTypes,
  selectedFilterTypes,
  setSelectedFilterTypes,
  mobileMenu,
  name,
}) => {
  const handleFilterChange = (e) => {
    const { name, checked } = e.target;

    setSelectedFilterTypes(
      selectedFilterTypes.map((value) => {
        if (value.name === name) value.checked = checked;
        return value;
      })
    );
  };

  const [isOpen, setIsOpen] = useState(true);
  const DROPDOWN_ANIMATION_DELAY = 100;

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
          {
            <CSSTransition
              in={isOpen}
              exit={!isOpen}
              timeout={DROPDOWN_ANIMATION_DELAY * filterTypes.length}
              classNames="dropdown"
              unmountOnExit
              onExited={() => setIsOpen(false)}>
              <div className="pt-6" id={`filter-section-mobile-${name} `}>
                <div className="space-y-6">
                  {filterTypes &&
                    filterTypes.map((category, index) => (
                      <div className="flex items-center" key={index}>
                        <input
                          id={`filter-mobile-category-${name}-${index}`}
                          name={category.name}
                          type="checkbox"
                          className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          onChange={(e) => handleFilterChange(e)}
                          value={selectedFilterTypes[index].checked}
                          checked={selectedFilterTypes[index].checked}
                        />
                        <label
                          for={`filter-mobile-category-${name}-${index}`}
                          className="ml-3 min-w-0 flex-1 text-gray-500">
                          {' '}
                          {category.name}{' '}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </CSSTransition>
          }
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
            timeout={DROPDOWN_ANIMATION_DELAY * filterTypes.length}
            classNames="dropdown"
            unmountOnExit
            onExited={() => setIsOpen(false)}>
            <div className="pt-6" id={`filter-section-${name}`}>
              <div className="space-y-4">
                {filterTypes &&
                  filterTypes.map((category, index) => (
                    <div className="flex items-center" key={index}>
                      <input
                        id={`filter-category-${name}-${index}`}
                        name={category.name}
                        type="checkbox"
                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                        onChange={(e) => handleFilterChange(e)}
                        value={selectedFilterTypes[index].checked}
                        checked={selectedFilterTypes[index].checked}
                      />
                      <label
                        htmlFor={`filter-category-${name}-${index}`}
                        className="ml-3 text-sm text-gray-600">
                        {' '}
                        {category.name}{' '}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </CSSTransition>
        </div>
      )}
    </Fragment>
  );
};

FilterSection.propTypes = {
  filterTypes: PropTypes.array,
  selectedFilterTypes: PropTypes.array,
  setSelectedFilterTypes: PropTypes.func.isRequired,
  mobileMenu: PropTypes.bool,
  name: PropTypes.string,
};

FilterSection.defaultProps = {
  filterTypes: [],
  selectedFilterTypes: [],
  setSelectedFilterTypes: () => {},
  mobileMenu: false,
  name: 'Category',
};
export default FilterSection;
