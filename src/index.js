import React from "react";
import ReactDOM from "react-dom";
import Lottery from "./artifacts/Lottery.json";
import App from "./App";
import "./index.css";
import { MetaMaskProvider } from "metamask-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from "web3";
import HowItWorks from "./routes/HowItWorks";
import PreviousWinners from "./routes/PreviousWinners";

const web3 = new Web3(window.ethereum);
const LotteryAddress = "0x42E82fa85E3A34d5DAA0ea14f203096c74b9021D";
const lottery = new web3.eth.Contract(Lottery.abi, LotteryAddress, {
  data: Lottery.DeployedBytecode,
});

ReactDOM.render(
  <BrowserRouter>
    <MetaMaskProvider>
      <Routes>
        <Route path="/" element={<App lottery={lottery} />} />
        <Route path="HowItWorks" element={<HowItWorks />} />
        <Route
          path="Previous-Winners"
          element={<PreviousWinners lottery={lottery} />}
        />
        <Route path="Account" element={<HowItWorks />} />
      </Routes>
    </MetaMaskProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
