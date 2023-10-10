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
  // useEffect(() => {
  //   getBookings().then((dataBookings) => {
  //     setData(dataBookings);
  //   });
  // }, []);
  useLayoutEffect(() => {
    getBookings().then((dataBookings) => {
      setData(dataBookings);
    });
  }, []);
  console.log(data);
  return (
    <div className="container mx-auto">
      <div className="flex w-full justify-center items-center" id="rider">
        <div className="container relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-l-lg">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Pickup
                </th>
                <th scope="col" className="px-6 py-3 rounded-r-lg">
                  Dropoff
                </th>
                <th scope="col" className="px-6 py-3 rounded-r-lg">
                  Date / Time
                </th>
                <th scope="col" className="px-3 py-3 rounded-r-lg">
                  Fare
                </th>
                <th scope="col" className="px-3 py-3 rounded-r-lg">
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
                    {transaction.user}
                  </th>
                  <td className="px-6 py-4">{transaction.pickup}</td>
                  <td className="px-6 py-4">{transaction.dropoff}</td>
                  <td className="px-6 py-4">{transaction.timestamp}</td>
                  <td className="px-3 py-4">{transaction.fare}</td>
                  <td className="px-3 py-3">{transaction.people}</td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      value={index}
                      onClick={handleClick}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Take this Job
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                ></th>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-3 py-4"></td>
                <td className="px-3 py-3"></td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={handleAddDriverClick}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Add Driver
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Driver;
