import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../utils/index";
export const BookingRideContext = React.createContext();

const { ethereum } = window;

/**
 * Creates an Ethereum booking contract.
 *
 * @return {Object} The bookingRideContract object.
 */
const createEthereumBookingContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const bookingRideContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );

  return bookingRideContract;
};

/**
 * A description of the entire function.
 *
 * @param {object} children - The children of the BookingRideProvider component.
 * @return {ReactNode} - The rendered BookingRideProvider component.
 */
export const BookingRideProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  //Check wallet is connected or not, then connect wallet if not
  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Connects the wallet and sets the current account.
   *
   * @return {Promise<void>} - Promise that resolves when the wallet is connected and the current account is set.
   */
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      if (error.code == 4001) {
        console.log("Please connect to MetaMask.");
      } else {
        console.log(error);
      }

      //throw new Error("No ethereum object");
    }
  };

  /**
   * Creates a booking using the provided form data.
   *
   * @return {Promise<void>} Returns a promise that resolves when the booking is created.
   */
  const createBooking = async (
    name,
    date,
    start,
    dropoff,
    people,
    distance,
    duration
  ) => {
    try {
      const bookingRideContract = createEthereumBookingContract();
      const bookingFix = (distance / 1000) * 1; // price per kilometer is 0.1 and formula can change

      const fare = ethers.utils.parseEther(bookingFix.toString()); // Replace with the fare amount in Ether

      console.log(
        currentAccount,
        name,
        date,
        start,
        dropoff,
        people,
        distance,
        duration,
        fare
      );

      try {
        const createBookingTx = await bookingRideContract.createBooking(
          name,
          fare,
          start,
          dropoff,
          date,
          people
        );
        await createBookingTx.wait();
        console.log(createBookingTx);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * Disconnects the wallet.
   *
   * @return {Promise<void>} - Returns a promise that resolves when the wallet is disconnected.
   */
  const disConnectWallet = async () => {
    try {
      setCurrentAccount("");
      setTimeout(() => {
        window.location.reload();
      }, 50);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  // Accept a booking (assuming you're a driver)
  const driverAcceptBooking = async (bookingIdToAccept) => {
    try {
      const bookingRideContract = createEthereumBookingContract();
      const bookingIdToAccept = 1; // Replace with the booking ID you want to accept, id need to pass from front end
      try {
        const acceptBookingTx = await bookingRideContract.acceptBooking(
          bookingIdToAccept
        );
        await acceptBookingTx.wait();
        console.log(acceptBookingTx);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Complete a booking (assuming you're the assigned driver)
  const completeBooking = async () => {
    try {
      const bookingRideContract = createEthereumBookingContract();
      const bookingIdToComplete = 1; // Replace with the booking ID you want to complete , id need to pass from front end
      try {
        const completeBookingTx = await bookingRideContract.completeBooking(
          bookingIdToComplete
        );
        await completeBookingTx.wait();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Initiate payment (assuming you're the booking user)
  const payDriver = async (bookingIdToPay) => {
    try {
      const bookingRideContract = createEthereumBookingContract();
      //const bookingIdToPay = 1; // Replace with the booking ID you want to pay for , id need to pass from front end
      try {
        const payDriverTx = await bookingRideContract.payDriver(bookingIdToPay);
        await payDriverTx.wait();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addDriver = async () => {
    try {
      const bookingRideContract = createEthereumBookingContract();
      try {
        const addDriverTx = await bookingRideContract.addDriver();
        await addDriverTx.wait();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setDriverAvailability = async () => {
    try {
      const bookingRideContract = createEthereumBookingContract();
      const isAvailable = 1; // Replace with the booking ID you want to pay for , id need to pass from front end
      try {
        const setDriverAvailabilityTx =
          await bookingRideContract.setDriverAvailability(isAvailable);
        await setDriverAvailabilityTx.wait();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const withdrawFunds = async () => {
    try {
      const bookingRideContract = createEthereumBookingContract();
      try {
        const withdrawFundsTx = await bookingRideContract.withdrawFunds();
        await withdrawFundsTx.wait();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBookings = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumBookingContract();
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const availablePromise = await transactionsContract.getBookings();
        //const availableTransactions = await availablePromise;
        console.log(availablePromise);
        const structuredTransactions = availablePromise.map((transaction) => ({
          user: transaction.user,
          name: transaction.name,
          datetime: transaction.date.toNumber(),
          timestamp: new Date(transaction.date.toNumber()).toLocaleString(),
          pickup: transaction.pickup,
          dropoff: transaction.dropoff,
          people: parseInt(transaction.people._hex),
          fare: parseInt(transaction.fare._hex) / 10 ** 18,
          driver: transaction.driver,
        }));
        //setTransactions(structuredTransactions);
        //const varLab = ["123", "234", "345"];
        return structuredTransactions;
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <BookingRideContext.Provider
      value={{
        connectWallet,
        disConnectWallet,
        currentAccount,
        createBooking,
        driverAcceptBooking,
        completeBooking,
        withdrawFunds,
        setDriverAvailability,
        addDriver,
        payDriver,
        getBookings,
      }}
    >
      {children}
    </BookingRideContext.Provider>
  );
};
