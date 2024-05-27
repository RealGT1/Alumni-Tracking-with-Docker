import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Navbar from "./NavBar";
import MyComponent from "./HomePage1";

const HomePage = () => {
  return (
    <div style={{ overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
      <Navbar />
      <MyComponent />
    </div>
  );
};

export default HomePage;