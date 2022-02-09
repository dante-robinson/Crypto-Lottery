import React from "react";
import Lottery from "./artifacts/Lottery.json";
import Main from "./components/Main";

const Web3 = require("web3");

const web3 = new Web3(window.ethereum);
const LotteryAddress = "0x42E82fa85E3A34d5DAA0ea14f203096c74b9021D";
const lottery = new web3.eth.Contract(Lottery.abi, LotteryAddress, {
  data: Lottery.DeployedBytecode,
});

const App = () => {
  return (
    <div>
      <Main lottery={lottery} />
    </div>
  );
};

export default App;
