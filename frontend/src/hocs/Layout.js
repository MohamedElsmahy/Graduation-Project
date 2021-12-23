import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { connect } from 'react-redux';
import { checkAuth } from './../actions/auth';
import { loadProfile } from '../actions/profile';
import { loadCategories } from '../actions/jobs';


const Layout = ({ children, checkAuth, loadProfile, loadCategories }) => {
  useEffect(() => {
    checkAuth();
    loadProfile();
    loadCategories();
    
  }, []);
  return (
    <>
      <NavBar/>
      
        {children}
      <Footer />

    
      
    </>
  );
};

export default connect(null, { checkAuth, loadProfile, loadCategories })(Layout);
