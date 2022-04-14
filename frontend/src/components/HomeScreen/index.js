import React from "react";
import Header from "../Header";
import {Link} from "react-router-dom";
import Footer from "../Footer";

const HomeScreen = () => {
  return (
      <div>
      <Header/>
      <div  className="align-bottom">
        <Footer />
      </div>
      </div>
  )
};

export default HomeScreen;