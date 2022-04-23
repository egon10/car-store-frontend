import { gql } from '@apollo/client';

export const GET_ALL_CARS_QUERY = gql`
  query {
    allCars {
      brand
      car_model
      fuel_type
      transmission
      year
      price
      image_url
    }
  }
`;

export const GET_CARS_FILTERED_QUERY = gql`
  query filteredCars($filter: CarFilterDto!, $limit: Float!, $offset: Float!) {
    filteredCars(filter: $filter, limit: $limit, offset: $offset) {
      brand
      car_model
      fuel_type
      transmission
      year
      price
      image_url
    }
  }
`;

export const SEARCH_CAR_QUERY = gql`
  query searchCars($text: String!) {
    searchCars(text: $text) {
      brand
      car_model
      fuel_type
      transmission
      year
      price
      image_url
    }
  }
`;
