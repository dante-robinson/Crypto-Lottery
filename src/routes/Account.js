import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WinningNumbers from "../components/WinningNumbers";
import PlayerPreviousNumbers from "../components/Account/PlayerPreviousNumbers";
import PlayerCurrentNumbers from "../components/Account/PlayerCurrentNumbers";
import { useWeb3React } from "@web3-react/core";

const Account = (props) => {
  const { active, account, library, connector, activate } = useWeb3React();

  const CheckNumbers = async () => {
    await props.lottery.methods.checkNumbers().send({ from: account });
  };

  const Content = () => {
    if (window.ethereum && active) {
      return (
        <div className="min-h-screen p-4 grid grid-cols-3 gap-4 grid-rows-account">
          {/* By declaring another div around the imported items made for the other
            components we can override there placement without duplicating the code */}
          <div className="col-span-3">
            <Header />
          </div>
          <div className="row-start-2 self-end text-center relative bottom-16">
            <WinningNumbers lottery={props.lottery} />
          </div>
          <PlayerPreviousNumbers lottery={props.lottery} account={account} />
          <PlayerCurrentNumbers lottery={props.lottery} account={account} />
          <button className="bg-blue-500 hover:bg-blue-700 rounded-lg">
            Choose Numbers
          </button>
          <button
            onClick={CheckNumbers}
            className="col-start-3 bg-blue-500 hover:bg-blue-700 rounded-lg"
          >
            Check Numbers
          </button>
          <div className="row-start-5 col-start-3 justify-self-end">
            <Footer />
          </div>
        </div>
      );
    } else if (window.ethereum && !active) {
      return (
        <div className="min-h-screen p-4 grid grid-cols-3 gap-4 grid-rows-account">
          {/* By declaring another div around the imported items made for the other
            components we can override there placement without duplicating the code */}
          <div className="col-span-3">
            <Header />
          </div>
          <h1 className="row-start-3 col-span-3 text-5xl font-extrabold text-center self-center">
            PLEASE LOGIN TO METAMASK
          </h1>
          <div className="row-start-5 col-start-3 justify-self-end">
            <Footer />
          </div>
        </div>
      );
    } else {
      return (
        <div className="min-h-screen p-4 grid grid-cols-3 gap-4 grid-rows-account">
          {/* By declaring another div around the imported items made for the other
            components we can override there placement without duplicating the code */}
          <div className="col-span-3">
            <Header />
          </div>
          <h1 className="row-start-3 col-span-3 text-5xl font-extrabold text-center self-center">
            PLEASE INSTALL METAMASK TO VIEW THIS PAGE
          </h1>
          <div className="row-start-5 col-start-3 justify-self-end">
            <Footer />
          </div>
        </div>
      );
    }
  };

  return <div>{Content()}</div>;
};
export default Account;
