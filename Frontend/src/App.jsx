import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Singup from "./Components/Singup";
import Login from "./Components/Login";
import ProductDetailes from "./Components/productDetailes/productDetailes";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<Singup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/:id" element={<ProductDetailes />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
