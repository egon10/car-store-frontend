const DEFAULT_CURRENCY = '€';

export const utils = {
  priceify: (value, spaceBetween = true, currency = DEFAULT_CURRENCY) => {
    var chars = value.toString().split('').reverse();
    var withCommas = [];
    for (var i = 1; i <= chars.length; i++) {
      withCommas.push(chars[i - 1]);
      if (i % 3 == 0 && i != chars.length) {
        withCommas.push('.');
      }
    }
    return `${currency}${spaceBetween ? ' ' : null}${withCommas.reverse().join('')}`;
  },
  sortByPrice: (cars, desc) => {
    if (!cars) return [];
    return [...cars].sort((a, b) => (desc ? a.price - b.price : b.price - a.price));
  },

  sortByDate: (cars) => {
    if (!cars) return [];
    return [...cars].sort((a, b) => (a.year > b.year ? -1 : 1));
  },
  chunk: (arr, chunkSize) => {
    let temp = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      temp.push(arr.slice(i, i + chunkSize));
    }
    return temp;
  },
  filterByPrice: (cars, filters) => {
    if (!cars) return [];
    let tempCars = [...cars];
    const { min, max } = filters.selectedPriceRange;

    if (min) tempCars = tempCars.filter((car) => car.price >= min);

    if (max) tempCars = tempCars.filter((car) => car.price <= max);

    return tempCars;
  },
  filterCars: (cars, filters) => {
    if (!cars) return [];

    let filteredCars = [...cars];

    const { selectedFuelTypes, selectedTransmissionTypes, selectedTransmissionSpeeds } = filters;

    // This is handled in the backend but when search is used, the filter is not applied
    if (filters.selectedCategory && filters.selectedCategory !== 'All') {
      filteredCars = filteredCars.filter((car) => car.brand === filters.selectedCategory);
    }

    let fuelTypesToFilter = selectedFuelTypes
      .filter((item) => item.checked)
      .map(({ name }) => name);

    let transmissionTypesToFilter = selectedTransmissionTypes
      .filter((item) => item.checked)
      .map(({ name }) => name);

    let transmissionSpeedsToFilter = selectedTransmissionSpeeds
      .filter((item) => item.checked)
      .map(({ name }) => name[0]);

    if (fuelTypesToFilter.length)
      filteredCars = filteredCars.filter((car) => fuelTypesToFilter.includes(car.fuel_type));

    if (transmissionTypesToFilter.length)
      filteredCars = filteredCars.filter((car) =>
        transmissionTypesToFilter.includes(car.transmission.split(' ')[1])
      );

    if (transmissionSpeedsToFilter.length)
      filteredCars = filteredCars.filter((car) =>
        transmissionSpeedsToFilter.includes(car.transmission.split('v')[0])
      );

    return filteredCars;
  },
};
