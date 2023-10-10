import React, { useContext, useState, useRef, useEffect } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { BookingRideContext } from "../context/BookingRideContext";
import { shortenAddress } from "../utils/shortenAddress";
import Autocomplete from "react-google-autocomplete";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

/**
 * Renders an input component.
 *
 * @param {string} placeholder - The placeholder text for the input field.
 * @param {string} name - The name of the input field.
 * @param {string} type - The type of the input field.
 * @param {string} value - The value of the input field.
 * @param {function} handleChange - The event handler for input changes.
 * @return {JSX.Element} - The input component.
 */
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    name={name}
    type={type}
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

/**
 * Renders the Home component.
 *
 * @return {JSX.Element} The rendered component.
 */
function Home() {
  const today = new Date().toISOString().slice(0, 16);

  const {
    createBooking,
    currentAccount,
    connectWallet,
    disConnectWallet,
    handleChange,
    transactions,
  } = useContext(BookingRideContext);
  console.log(transactions);

  const originRef = useRef();
  const destiantionRef = useRef();
  const [startLocation, setStartLocation] = useState([]);
  const [dropLocation, setDropLocation] = useState([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [rest, setRest] = useState([]);

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyCXbMf-XXrTqEmR_vawob7x1kfC7HB6FX0",
  //   libraries: ["places"],
  // });

  /**
   * Handles the form submission event.
   *
   * @param {Event} event - The form submission event.
   * @return {void} - Does not return a value.
   */

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const date = event.target.date.value;
    const start = event.target.start.value;
    const dropoff = event.target.dropoff.value;
    const people = event.target.people.value;

    //Calculate distance
    if (!originRef.current.value || !destiantionRef.current.value) {
      return;
    }
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();

    const route = {
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: "DRIVING",
      provideRouteAlternatives: false,
    };

    directionsService.route(route, function (response, status) {
      // anonymous function to capture directions
      if (status !== "OK") {
        window.alert("Directions request failed due to " + status);
        return;
      } else {
        directionsRenderer.setDirections(response); // Add route to the map
        var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
        if (!directionsData) {
          window.alert("Directions request failed");
          return;
        } else {
          setDistance(directionsData.distance.value);
          setDuration(directionsData.duration.value);
          let newdt = new Date(date).valueOf();
          createBooking(
            name,
            newdt,
            start,
            dropoff,
            people,
            directionsData.distance.value,
            directionsData.duration.value
          );
        }
      }
    });
  };

  return (
    <div className="flex w-full justify-center items-center" id="rider">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Find Your <br /> Ride cheaper <br /> than ever
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Pay to your ride using Crypto, No
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p> </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            {currentAccount && (
              <>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
                  />
                  <input
                    type="datetime-local"
                    placeholder="Date"
                    name="date"
                    min={today}
                    required
                    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
                  />
                  <Autocomplete
                    ref={originRef}
                    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
                    apiKey="AIzaSyCXbMf-XXrTqEmR_vawob7x1kfC7HB6FX0"
                    placeholder="Pick up location"
                    required
                    name="start"
                    debounce={1000}
                    options={{
                      types: ["address"],
                      fields: [
                        "address_component",
                        "formatted_address",
                        "geometry",
                      ],
                      componentRestrictions: { country: "nz" },
                    }}
                    defaultValue=""
                    onPlaceSelected={(place) => {
                      setStartLocation((inputs) => [...inputs, place]);
                      console.log(place);
                    }}
                  />
                  <Autocomplete
                    ref={destiantionRef}
                    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
                    apiKey="AIzaSyCXbMf-XXrTqEmR_vawob7x1kfC7HB6FX0"
                    placeholder="Drop off location"
                    required
                    name="dropoff"
                    debounce={1000}
                    options={{
                      types: ["address"],
                      fields: [
                        "address_component",
                        "formatted_address",
                        "geometry",
                      ],
                      componentRestrictions: { country: "nz" },
                    }}
                    defaultValue=""
                    onPlaceSelected={(place) => {
                      setDropLocation((inputs) => [...inputs, place]);
                      console.log(place);
                    }}
                  />

                  <input
                    type="number"
                    placeholder="People"
                    name="people"
                    step="1"
                    min="1"
                    max="10"
                    className="my-2 w-full rounded-sm p-2  bg-transparent text-white border-none text-sm white-glassmorphism"
                  />
                  <button
                    type="submit"
                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                  >
                    Request Ride
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
