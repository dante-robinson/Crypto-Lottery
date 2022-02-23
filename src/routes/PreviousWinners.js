import React, { useState, useEffect } from "react";
import env from "react-dotenv";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PreviousWinners = (props) => {
  //Set value in advance to avoid error when mapping over array
  const [previousWinners, setPreviousWinners] = useState([]);

  const getPreviousWinners = async () => {
    // Contract
    const address = await props.lottery.options.address;
    // Lottery Wallet
    const wallet = await props.lottery.methods.poolOwner().call();

    const etherscan =
      "https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=" +
      wallet +
      "&startblock=10113432&endblock=99999999&page=1&offset=10&sort=asc&apikey=" +
      env.ETHERSCAN_API;

    axios.get(etherscan).then((response) => {
      const result = response.data.result;
      for (let i = 0; i < result.length; i++) {
        if (
          result[i].to === "0x01be23585060835e02b77ef475b0cc51aa1e0709" ||
          result[i].to === "0xb3dccb4cf7a26f6cf6b120cf5a73875b7bbc655b" ||
          result[i].to === "0xe592427a0aece92de3cdee1f18e0157c05861564" ||
          result[i].to === "0xb27308f9f90d607463bb33ea1bebb41c27cE5ab6" ||
          result[i].to === wallet.toLowerCase() ||
          result[i].to === address.toLowerCase() ||
          result[i].to === "" ||
          result[i] === undefined
        ) {
        } else {
          setPreviousWinners((previousWinners) => [
            ...previousWinners,
            {
              to: result[i].to,
              hash: "https://rinkeby.etherscan.io/tx/" + result[i].hash,
            },
          ]);
        }
      }
    });
  };

  useEffect(() => {
    getPreviousWinners();
  }, []);

  const returnPreviousWinners = previousWinners.map((winner, index) => {
    return (
      <li className="list-none inline" key={index}>
        <a href={winner.hash} className="">
          {winner.to}{" "}
        </a>
      </li>
    );
  });

  return (
    <div className="min-h-screen p-4 grid grid-cols-3 gap-4 grid-rows-other">
      <Header />
      <h3 className="text-4xl font-extrabold col-start-2 row-start-3 text-center">
        Previous Winners
      </h3>
      <div className="text-xl row-start-4 col-span-3 relative top-12 text-center">
        {previousWinners.length > 0 ? (
          returnPreviousWinners
        ) : (
          <p className="text-center">No previous winners</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PreviousWinners;
