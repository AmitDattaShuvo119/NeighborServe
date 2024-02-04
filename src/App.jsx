import React, { useState } from "react";

import "./App.css";
import Category from "./Component/Category/Category";
// import CustomerSupport from "./Component/CustomerSupport/CustomerSupport";
import FeatureProvider from "./Component/FeatureProvider/FeatureProvider";
import Footer from "./Component/Footer/Footer";
import { HeroSection } from "./Component/HeroSection/HeroSection";
import Navbar from "./Component/Navbar/Navbar";
import OfferCard from "./Component/OfferCard/OfferCard";
import CustomerSupportSection from "./Component/CustomerSupportSection/CustomerSupportSection";
import ChartSection from "./Component/chartSection/chartSection";
import Membership from "./Component/Membership/Membership";
import FAQ from "./Component/FAQ/FAQ";
import AboutUs from "./Component/AboutUs/AboutUs";
import Policy from "./Component/Policy/Policy";
import Chat_DB from "./Component/Chat_DashBoard/Chat_DB";
import Service_History from "./Component/Service_History/Service_History";

import SearchResult from "./Component/SearchResult";

function App() {
  const [results, setResults] = useState([]);

  console.log("app result", results);
  return (
    <>
      <Navbar results={results} setResults={setResults}></Navbar>
      <SearchResult results={results}></SearchResult>
      <HeroSection></HeroSection>
      <Category></Category>
      <OfferCard></OfferCard>
      <FeatureProvider></FeatureProvider>
      <Membership></Membership>
      <FAQ></FAQ>
      {/* <PricingSection></PricingSection> */}
      <CustomerSupportSection></CustomerSupportSection>
      <ChartSection></ChartSection>
      <Footer></Footer>
    </>
  );
}

export default App;
