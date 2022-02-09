import React, { useState, useEffect } from "react";
import "./Main.css";

const Main = ({ lottery }) => {
  const [totalPrizePool, setTotalPrizePool] = useState(null);
  const [pastNumbers, setWinningNumbers] = useState(null);
  const [timeTillDraw, setTimeTillDraw] = useState({});

  const getTotalPrizePool = async (total) => {
    total = await lottery.methods.totalPrizePool().call();
    return setTotalPrizePool(total);
  };

  const getWinningNumbers = async (numbers = "") => {
    let draw = await lottery.methods.drawNumber().call();
    for (let i = 0; i < 7; i++) {
      if (numbers === "") {
        numbers = `${await lottery.methods.winningNumbers(draw, i).call()}`;
      } else {
        numbers = `${numbers}, ${await lottery.methods
          .winningNumbers(draw, i)
          .call()}`;
      }
    }
    return setWinningNumbers(numbers);
  };

  const getTimeTillDraw = () => {
    const currentDate = new Date(Date.now());
    const draw = new Date("February 11, 2022 0:00:00");
    const difference = draw - currentDate;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return setTimeTillDraw(timeLeft);
  };

  useEffect(() => {
    getTotalPrizePool();
  }, []);
  useEffect(() => {
    getWinningNumbers();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      getTimeTillDraw();
    }, 1000);
  });

  return (
    <div className="container">
      <div>
        <h1 className="mainHeader ui header">Crypto Lottery</h1>
      </div>
      <div className="currentHeader">
        <div className="ui medium header">Current Prize Pool</div>
        <p>{totalPrizePool}</p>
      </div>
      <div className="timeHeader">
        <div className="ui medium header">Time left until next draw</div>
        <h5 className="ui header">Days | Hours | Minutes | Seconds </h5>
        <p className="days">{timeTillDraw.days}</p>
        <p className="hours">{timeTillDraw.hours}</p>
        <p className="minutes">{timeTillDraw.minutes}</p>
        <p className="seconds">{timeTillDraw.seconds}</p>
      </div>
      <div className="numberHeader">
        <div className="ui medium header">Previous winning numbers</div>
        <p>{pastNumbers}</p>
      </div>
      <button className="ui button">Enter Lottery</button>

      <div className="worksHeader ui medium header">How it works</div>
      <p className="worksParagraph">
        You the player can enter the lottery by choosing 7 numbers between 1 and
        50 and then will pay for the transaction fee as well as the cost of the
        lottery ticket (0.1 ETH). The money is sent to the designated lottery
        address where the ether is stored until the next draw. The contract will
        contact Chainlinks oracle to get 7 randomly generated numbers back. The
        player will then need to check the numbers they chose against the drawn
        winning numbers before the next draw (1 week) as the ticket will then be
        void (
        <b>
          Note that you will need to pay a transaction fee to check your numbers
        </b>
        ). You will not recieve a prize until the following draw however you are
        able to enter the next draw right after checking your numbers if you
        choose. Once the contract goes to get the next 7 random numbers for the
        next draw the following week the contract will also payout all the
        winners of the previous draw these transactions can be verified by
        checking the lottery address listed below.
      </p>

      <div className="devHeader ui medium header">Developer Wallet</div>
      <div className="lotteryHeader ui medium header">Lottery Wallet</div>
      <div className="contractHeader ui medium header">Contract Wallet</div>
      <div className="winnerHeader ui medium header">Previous Winners</div>
      <p className="ghFooter">
        Check out the source code on Github
        <i className="ghIcon github icon"></i>
      </p>
    </div>
  );
};

export default Main;
