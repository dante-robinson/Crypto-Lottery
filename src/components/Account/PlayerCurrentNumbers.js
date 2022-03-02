import React, { useState, useEffect } from "react";

const PlayerCurrentNumbers = (props) => {
  const [currentNumbers, setCurrentNumbers] = useState([]);

  const getCurrentNumbers = async () => {
    let draw = await props.lottery.methods.drawNumber().call();

    let firstNumber = [];
    firstNumber[0] = await props.lottery.methods
      .pickedNumbers(draw, props.account, 0)
      .call({
        from: props.account,
      });

    if (firstNumber[0] == 0) {
      setCurrentNumbers((currentNumbers) => firstNumber);
    } else if (firstNumber[0] != 0) {
      let numbers = [];
      for (let i = 0; i < 7; i++) {
        numbers[i] = await props.lottery.methods
          .pickedNumbers(draw, props.account, i)
          .call({
            from: props.account,
          });
      }
      setCurrentNumbers((currentNumbers) => numbers);
    }
  };

  useEffect(() => {
    getCurrentNumbers();
  }, []);

  const returnCurrentNumbers = currentNumbers
    .slice(0, 7)
    .map((number, index) => {
      return (
        <li className="list-none inline text-2xl relative top-5" key={index}>
          {number}{" "}
        </li>
      );
    });

  const returnNoNumbers = () => {
    if (currentNumbers[0] == 0) {
      return (
        <p className="text-2xl relative top-5">
          You haven't picked any numbers yet
        </p>
      );
    } else {
      return <p className="text-2xl relative top-5">Loading...</p>;
    }
  };

  return (
    <div className="text-center self-end col-start-3 col-span-1 relative bottom-16">
      <h2 className="text-4xl font-extrabold">Your Current Numbers</h2>
      {currentNumbers.length === 7 ? (
        <p>{returnCurrentNumbers}</p>
      ) : (
        <div>{returnNoNumbers()}</div>
      )}
    </div>
  );
};

export default PlayerCurrentNumbers;
