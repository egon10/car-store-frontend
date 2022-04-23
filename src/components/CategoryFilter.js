/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react';
import CustomFilterSection from './CustomFilterSection';
import FilterSection from './FilterSection';
import PriceDropDown from './DropDowns/PriceDropDown';
import { CSSTransition } from 'react-transition-group';

const PriceSection = ({ minSelected, setMinSelected, maxSelected, setMaxSelected }) => {
  const priceOptions = [10000, 20000, 30000, 50000, 75000, 100000];

  return (
    <div>
      <div className="flex justify-between mt-1 space-x-2">
        <PriceDropDown
          text="Min"
          options={priceOptions}
          selected={minSelected}
          setSelected={setMinSelected}
          elementId={1}
        />
        <PriceDropDown
          text="Max"
          options={priceOptions}
          selected={maxSelected}
          setSelected={setMaxSelected}
          elementId={2}
        />
      </div>
    </div>
  );
};

// Categories And Filters
const CategoryFilter = ({ filterMenuOpened, setFilterMenuOpened, callback }) => {
  const carBrands = ['All', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Tesla', 'Toyota'];

  const fuelTypes = [
    { name: 'Petrol', checked: false },
    { name: 'Diesel', checked: false },
    { name: 'Electric', checked: false },
  ];

  const transmissionSpeeds = [
    { name: '5 Speeds', checked: false },
    { name: '6 Speeds', checked: false },
    { name: '7 Speeds', checked: false },
    { name: '8 Speeds', checked: false },
    { name: '9 Speeds', checked: false },
  ];

  const transmissionTypes = [
    { name: 'Automatic', checked: false },
    { name: 'Manual', checked: false },
  ];

  const [selectedFuelTypes, setSelectedFuelTypes] = useState(fuelTypes);
  const [selectedTransmissionSpeeds, setSelectedTransmissionSpeeds] = useState(transmissionSpeeds);
  const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState(transmissionTypes);

  const [minSelected, setMinSelected] = useState(0);
  const [maxSelected, setMaxSelected] = useState(0);

  useEffect(() => {
    callback({
      selectedFuelTypes,
      selectedTransmissionSpeeds,
      selectedTransmissionTypes,
      selectedPriceRange: {
        min: minSelected,
        max: maxSelected,
      },
    });
  }, [
    selectedFuelTypes,
    selectedTransmissionSpeeds,
    selectedTransmissionTypes,
    minSelected,
    maxSelected,
  ]);

  return (
    <Fragment>
      {/* mobile */}
      {filterMenuOpened && (
        <div className="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>
        </div>
      )}
      <CSSTransition
        in={filterMenuOpened}
        exit={!filterMenuOpened}
        timeout={1000}
        classNames="mobile-filter-menu"
        unmountOnExit
        onExited={() => setFilterMenuOpened(false)}>
        <div className="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
          <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
            <div>
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                  onClick={() => setFilterMenuOpened(false)}>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul className="font-medium text-gray-900 px-2 py-3">
                  {carBrands &&
                    carBrands.map((category, index) => (
                      <li key={index} className="block px-2 py-3">
                        <button
                          id="brand-category"
                          onClick={(e) => {
                            e.preventDefault();
                            callback({
                              selectedFuelTypes,
                              selectedTransmissionSpeeds,
                              selectedTransmissionTypes,
                              selectedCategory: carBrands.at(index),
                              selectedPriceRange: {
                                min: minSelected,
                                max: maxSelected,
                              },
                            });
                          }}>
                          {category}
                        </button>
                      </li>
                    ))}
                </ul>

                <CustomFilterSection
                  name="Price"
                  children={
                    <PriceSection
                      minSelected={minSelected}
                      setMinSelected={setMinSelected}
                      maxSelected={maxSelected}
                      setMaxSelected={setMaxSelected}
                    />
                  }
                  mobileMenu={true}
                />

                <FilterSection
                  name="Fuel Type"
                  filterTypes={fuelTypes}
                  selectedFilterTypes={selectedFuelTypes}
                  setSelectedFilterTypes={setSelectedFuelTypes}
                  mobileMenu={true}
                />

                <FilterSection
                  name="Transmission Type"
                  filterTypes={transmissionTypes}
                  selectedFilterTypes={selectedTransmissionTypes}
                  setSelectedFilterTypes={setSelectedTransmissionTypes}
                  mobileMenu={true}
                />

                <FilterSection
                  name="Transmission Speeds"
                  filterTypes={transmissionSpeeds}
                  selectedFilterTypes={selectedTransmissionSpeeds}
                  setSelectedFilterTypes={setSelectedTransmissionSpeeds}
                  mobileMenu={true}
                />
              </form>
            </div>
          </div>
        </div>
      </CSSTransition>

      {/* normal display */}

      <form className="hidden lg:block">
        <h3 className="sr-only">Categories</h3>
        <ul className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
          {carBrands &&
            carBrands.map((category, index) => (
              <li key={index}>
                <button
                  id="brand-category"
                  onClick={(e) => {
                    e.preventDefault();
                    callback({
                      selectedFuelTypes,
                      selectedTransmissionSpeeds,
                      selectedTransmissionTypes,
                      selectedCategory: carBrands.at(index),
                      selectedPriceRange: {
                        min: minSelected,
                        max: maxSelected,
                      },
                    });
                  }}>
                  {category}
                </button>
              </li>
            ))}
        </ul>

        <CustomFilterSection
          name="Price"
          children={
            <PriceSection
              minSelected={minSelected}
              setMinSelected={setMinSelected}
              maxSelected={maxSelected}
              setMaxSelected={setMaxSelected}
            />
          }
          mobileMenu={false}
        />
        <FilterSection
          name="Fuel Type"
          filterTypes={fuelTypes}
          selectedFilterTypes={selectedFuelTypes}
          setSelectedFilterTypes={setSelectedFuelTypes}
          mobileMenu={false}
        />
        <FilterSection
          name="Transmission Type"
          filterTypes={transmissionTypes}
          selectedFilterTypes={selectedTransmissionTypes}
          setSelectedFilterTypes={setSelectedTransmissionTypes}
          mobileMenu={false}
        />
        <FilterSection
          name="Transmission Speeds"
          filterTypes={transmissionSpeeds}
          selectedFilterTypes={selectedTransmissionSpeeds}
          setSelectedFilterTypes={setSelectedTransmissionSpeeds}
          mobileMenu={false}
        />
      </form>
    </Fragment>
  );
};

export default CategoryFilter;
