import React, { useContext, useEffect, useState, Fragment } from 'react';
import { DatabaseContext } from '../providers/DatabaseProvider';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useQuery } from '@apollo/client';

import { GET_CARS_FILTERED_QUERY, SEARCH_CAR_QUERY } from '../queries/queries';
import { utils } from '../utils/utils';

import '../animations.css';

import { Pagination, MAX_ITEMS_PER_PAGE } from '../components/Pagination';
import DropDown from '../components/DropDowns/DropDown';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';

const ProductCard = ({ car, index }) => {
  let delay = index * 150;
  return (
    <div style={{ transitionDelay: `${delay}ms` }}>
      <div className="group relative">
        <div className="w-full rounded-md overflow-hidden group-hover:opacity-75 duration-700 lg:h-70 lg:aspect-none">
          <img className="rounded-t-lg md:pb-2 w-auto h-auto" src={car.image_url} alt="product" />

          <div className="mt-4 flex justify-between space-x-3">
            <div>
              <h3 className="text-sm text-gray-700">
                {car.brand} {car.car_model}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{car.fuel_type}</p>
            </div>
            <p className="text-base font-medium text-gray-900">{utils.priceify(car.price)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CarPage = () => {
  const { client } = useContext(DatabaseContext);

  let [queriedCars, setQueriedCars] = useState([]);

  let [page, setPage] = useState({
    currentPage: 1,
    totalProducts: 0,
    totalPages: 1,
  });

  const { currentPage } = page;

  let [selectedCategory, setSelectedCategory] = useState('All');
  let [filterMenuOpened, setFilterMenuOpened] = useState(false);

  let [sort, setSort] = useState({ selected: '', index: 0 });

  let [filters, setFilters] = useState({
    selectedFuelTypes: [],
    selectedTransmissionSpeeds: [],
    selectedTransmissionTypes: [],
    selectedPriceRange: {
      min: 0,
      max: 0,
    },
  });

  let [searchText, setSearchText] = useState('');

  const { loading, data, refetch } = useQuery(GET_CARS_FILTERED_QUERY, {
    variables: {
      filter: {},
      limit: 0,
      offset: 0,
    },
    client,
  });

  const updateQueriedCars = async ({ filter, search }) => {
    if (filter) {
      const { data, loading } = await refetch({ filter });

      if (!loading && data) setQueriedCars(utils.filterCars(data.filteredCars, filters));
    } else {
      if (!search.length) {
        let filter = {
          brand: selectedCategory,
        };

        if (filter.brand === 'All') delete filter.brand;

        const { data, loading } = await refetch({ filter });
        if (!loading && data) return setQueriedCars(utils.filterCars(data.filteredCars, filters));
      }

      const { data, loading } = await client.query({
        query: SEARCH_CAR_QUERY,
        variables: { text: search },
      });
      if (!loading) {
        setQueriedCars(utils.filterCars(data.searchCars, filters));
      }
    }
  };

  useEffect(() => {
    if (data) setQueriedCars(data.filteredCars);
  }, [data]);

  useEffect(() => {
    updateQueriedCars({ search: searchText });
  }, [searchText.length]);

  const queriedCarsFiltered = utils.filterByPrice(
    utils.filterCars(
      sort.index <= 1
        ? utils.sortByPrice(queriedCars, sort.index === 0)
        : utils.sortByDate(queriedCars),
      filters
    ),
    filters
  );

  const currentPageCars = utils.chunk(queriedCarsFiltered, MAX_ITEMS_PER_PAGE)[currentPage - 1];

  useEffect(() => {
    if (queriedCarsFiltered && queriedCarsFiltered.length) {
      setPage({
        currentPage: 1,
        totalProducts: queriedCarsFiltered.length,
        totalPages: Math.ceil(queriedCarsFiltered.length / MAX_ITEMS_PER_PAGE),
      });
    } else {
      setPage({
        currentPage: 1,
        totalProducts: 0,
        totalPages: 1,
      });
    }
  }, [queriedCarsFiltered.length, filters]);

  if (loading && !data) return null;

  return (
    <Fragment>
      <div className="bg-white py-24 md:py-0">
        <main className="container m-auto max-w-8xl mx-auto px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-4 md:pt-16 pb-6 border-b border-gray-200">
            <h1 className="text-xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              {selectedCategory} {selectedCategory === 'All' ? 'Cars' : ''} (
              {queriedCarsFiltered ? queriedCarsFiltered.length : 0})
            </h1>

            <div className="flex items-center justify-center space-x-5">
              <SearchBar mobile={false} text={searchText} setText={setSearchText} />
              <div className="relative inline-block text-left">
                <DropDown
                  name="Sort"
                  options={['Low to High', 'High to Low', 'Newest']}
                  callback={(args) => setSort(args)}
                />
              </div>

              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setFilterMenuOpened(!filterMenuOpened)}>
                <span className="sr-only">Filters</span>

                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="container flex justify-center py-4 md:pt-16 border-b border-gray-200 md:hidden">
            <SearchBar mobile={true} text={searchText} setText={setSearchText} />
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              <CategoryFilter
                filterMenuOpened={filterMenuOpened}
                setFilterMenuOpened={setFilterMenuOpened}
                callback={(args) => {
                  setFilters(args);

                  (async () => {
                    let filter = {
                      brand: args.selectedCategory || selectedCategory,
                    };

                    if (filter.brand === 'All') delete filter.brand;

                    updateQueriedCars({ filter });
                  })();

                  if (args.selectedCategory) setSelectedCategory(args.selectedCategory);
                }}
              />
              <div className="lg:col-span-3">
                <div className="m-2 h-96 lg:h-full">
                  <CSSTransition
                    in={queriedCarsFiltered && queriedCarsFiltered.length == 0}
                    timeout={500}
                    classNames="fade"
                    unmountOnExit>
                    <div className="sm:row-start-2 sm:col-start-2 text-center">
                      <div className="flex flex-col place-items-center place-content-center space-y-2 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-24 w-24 text-gray-800"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <h1 className="font-medium text-2xl">No Results</h1>
                        <p className="text-base text-gray-600">Try removing some filters</p>
                      </div>
                    </div>
                  </CSSTransition>

                  <TransitionGroup
                    className="mt-6 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 grid-rows-non1 gap-y-10 gap-x-6 xl:gap-x-8 pb-8 mb-8 sm:pb-0 sm:mb-8"
                    id="fade-list">
                    {currentPageCars && currentPageCars.length ? (
                      currentPageCars.map((car, index) => (
                        <CSSTransition
                          in={true}
                          appear={true}
                          timeout={index * 50}
                          classNames="fade">
                          {(state) => <ProductCard car={car} index={index} key={index} />}
                        </CSSTransition>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </TransitionGroup>

                  <div id="pagination">
                    <Pagination Page={page} setPage={setPage} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Fragment>
  );
};

export default CarPage;
