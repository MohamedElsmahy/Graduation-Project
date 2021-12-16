import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { connect } from 'react-redux';
import { checkAuth } from './../actions/auth';

const Layout = ({ children, checkAuth }) => {
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default connect(null, { checkAuth })(Layout);
