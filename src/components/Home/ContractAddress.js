import React, { useState, useEffect } from "react";

const ContractAddress = ({ lottery }) => {
  //Only Dynamic incase re-deployed
  const [lotteryAddress, setLotteryAddress] = useState(null);

  const getLotteryAddress = async () => {
    let address = await lottery.options.address;
    setLotteryAddress(address);
  };

  useEffect(() => {
    getLotteryAddress();
  }, []);

  return (
    <div className="row-start-4 col-start-3 self-center text-center">
      <h3 className="text-4xl font-extrabold">Contract Address</h3>
      <p className="text-xl relative top-5">{lotteryAddress}</p>
    </div>
  );
};

export default ContractAddress;
