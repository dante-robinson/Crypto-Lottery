import React from "react";
import ContractAddress from "../components/Home/ContractAddress";
import CurrentPrizePool from "../components/Home/CurrentPrizePool";
import DeveloperWallet from "../components/Home/DeveloperWallet";
import Footer from "../components/Footer";
import LotteryWallet from "../components/Home/LotteryWallet";
import Header from "../components/Header";
import TimeTillDraw from "../components/Home/TimeTillDraw";
import WinningNumbers from "../components/WinningNumbers";

const App = (props) => {
  return (
    <div className="min-h-screen p-4 grid grid-cols-3 gap-4 grid-rows-home">
      <Header />
      <CurrentPrizePool lottery={props.lottery} />
      <TimeTillDraw />
      <WinningNumbers lottery={props.lottery} />
      <DeveloperWallet />
      <LotteryWallet lottery={props.lottery} />
      <ContractAddress lottery={props.lottery} />
      <Footer />
    </div>
  );
};

export default App;
