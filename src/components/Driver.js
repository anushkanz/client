import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { BookingRideContext } from "../context/BookingRideContext";
import { shortenAddress } from "../utils/shortenAddress";
const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
function Driver() {
  const now = new Date().toISOString();
  const {
    createBooking,
    currentAccount,
    connectWallet,
    disConnectWallet,
    handleChange,
    getBookings,
    addDriver,
    driverAcceptBooking,
  } = useContext(BookingRideContext);
  const handleClick = (e) => {
    e.preventDefault();
    driverAcceptBooking(e.target.value);
    console.log(e.target.value);
  };

  const handleAddDriverClick = (e) => {
    e.preventDefault();
    addDriver();
  };
  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    getBookings().then((dataBookings) => {
      setData(dataBookings);
    });
  }, []);
  return (
    <div className="container mx-auto">
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
            <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
              Find Your <br /> Ride cheaper <br /> than ever
            </h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              Pay to your ride using Crypto, No
            </p>

            <button
              type="button"
              onClick={handleAddDriverClick}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Login as Driver
              </p>
            </button>

            <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10"></div>
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
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center ">
              {currentAccount && <></>}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center" id="rider">
        <div className="container relative overflow-x-auto">
          {data?.length === 0 ? (
            <></>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-l-lg">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pickup
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Dropoff
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date / Time
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Fare
                  </th>
                  <th scope="col" className="px-3 py-3">
                    People Count
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-r-lg"></th>
                </tr>
              </thead>
              <tbody>
                {data?.map((transaction, index) => (
                  <tr className="bg-white dark:bg-gray-800" key={index}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <p>{transaction.name}</p>
                      <p>{shortenAddress(transaction.user)}</p>
                    </th>
                    <td className="px-6 py-4">{transaction.pickup}</td>
                    <td className="px-6 py-4">{transaction.dropoff}</td>
                    <td className="px-6 py-4">{transaction.timestamp}</td>
                    <td className="px-3 py-4">{transaction.fare}</td>
                    <td className="px-3 py-3">{transaction.people}</td>
                    <td className="px-6 py-4">
                      {transaction.driver ===
                      "0x0000000000000000000000000000000000000000" ? (
                        <button
                          type="button"
                          value={index}
                          onClick={handleClick}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Take this Job
                        </button>
                      ) : (
                        <p>Booked by {shortenAddress(transaction.driver)}</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
export default Driver;
