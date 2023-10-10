import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Driver from "./components/Driver";
import BookRide from "./components/BookRide";
import Error from "./components/Error";
/**
 * Render the main application component.
 *
 * @return {JSX.Element} The rendered application component.
 */
const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookride" element={<BookRide />} />
            <Route path="/driver" element={<Driver />} />
            <Route element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
