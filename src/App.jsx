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
import AboutUs from './Component/AboutUs/AboutUs';
import Policy from './Component/Policy/Policy';
import Chat_DB from './Component/Chat_DashBoard/Chat_DB';
import Service_History from './Component/Service_History/Service_History';
function App() {
  return (

    <>
     <Navbar></Navbar>
     <HeroSection></HeroSection>
     <Category></Category>
     <OfferCard></OfferCard>
     <FeatureProvider></FeatureProvider>
     <CustomerSupport></CustomerSupport>
     <AboutUs></AboutUs>
     <Policy></Policy>
     <Service_History></Service_History>
     <Chat_DB></Chat_DB>
     <Footer></Footer>
    </>
  )
}

export default App;
