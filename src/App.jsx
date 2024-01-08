import React from 'react';
// import Login from './Login/Login';
// import Registration from './Registration';
// import Service from './Service';
import './App.css'
import Category from './Component/Category/Category'
import CustomerSupport from './Component/CustomerSupport/CustomerSupport'
import FeatureProvider from './Component/FeatureProvider/FeatureProvider'
import Footer from './Component/Footer/Footer'
import { HeroSection } from './Component/HeroSection/HeroSection'
import Navbar from './Component/Navbar/Navbar'
import OfferCard from './Component/OfferCard/OfferCard'


import PricingSection from './Component/Pricing/Pricing2';
import CustomerSupportSection from './Component/CustomerSupportSection/CustomerSupportSection';
import ChartSection from './Component/chartSection/chartSection';

function App() {
  return (

    <>
     <Navbar></Navbar>
      <HeroSection></HeroSection>
     <Category></Category>
     <OfferCard></OfferCard>
     <FeatureProvider></FeatureProvider>
    
     {/* <PricingSection></PricingSection> */}
     <CustomerSupportSection></CustomerSupportSection>
     <ChartSection></ChartSection>
     <Footer></Footer> 
    </>
  )
}

export default App;
