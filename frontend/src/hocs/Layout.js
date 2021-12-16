import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { connect } from 'react-redux';
import { checkAuth } from './../actions/auth';
import { loadProfile } from '../actions/profile';

const Layout = ({ children, checkAuth, loadProfile }) => {
  useEffect(() => {
    checkAuth();
    loadProfile();
  }, []);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default connect(null, { checkAuth, loadProfile })(Layout);
