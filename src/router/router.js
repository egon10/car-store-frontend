import React, { Fragment } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Header from '../components/Header';
import CarPage from '../pages/Cars';

export const MainRouter = () => {
  const location = useLocation();

  return (
    <Fragment>
      {location.pathname === '/' && <Navigate to="/cars" />}
      <Header />
      <Routes>
        <Route exact path="/cars" element={<CarPage />} />
      </Routes>
    </Fragment>
  );
};
