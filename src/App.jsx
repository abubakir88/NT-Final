import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Layout/header/Header";
import Home from "./app/home/Home";
import Details from "./app/Detail/Details";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>404 NotFound Page</h1>} />
        <Route path="/detail/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
