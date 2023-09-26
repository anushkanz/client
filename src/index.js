import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BookingRideProvider } from "./context/BookingRideContext";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <BookingRideProvider>
    <App />
  </BookingRideProvider>
);
//ReactDOM.render(<App />, document.getElementById("root"));
