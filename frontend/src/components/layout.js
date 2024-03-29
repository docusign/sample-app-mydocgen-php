import React from 'react';
import PropTypes from 'prop-types';
import { Header } from './header';
import { Footer } from './footer';

export const Layout = ({ children }) => {
  return (
    <>
      <div className='background-container' />
      <Header />
      <main role='main' className='content'>
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};
