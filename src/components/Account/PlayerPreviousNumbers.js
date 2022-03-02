import React, { useState, useEffect } from "react";

const PlayerPreviousNumbers = (props) => {
  const [previousDraw, setPreviousDraw] = useState(null);
  const [previousNumbers, setPreviousNumbers] = useState([]);

  const getPreviousNumbers = async () => {
    let draw = await props.lottery.methods.drawNumber().call();
    draw -= 1;
    setPreviousDraw(draw);

    if (draw > 0) {
      let firstNumber = [];
      firstNumber[0] = await props.lottery.methods
        .pickedNumbers(draw, props.account, 0)
        .call({
          from: props.account,
        });

      if (firstNumber[0] == 0) {
        setPreviousNumbers((previousNumbers) => firstNumber);
      } else if (firstNumber[0] != 0) {
        let numbers = [];
        for (let i = 0; i < 7; i++) {
          numbers[i] = await props.lottery.methods
            .pickedNumbers(draw, props.account, i)
            .call({
              from: props.account,
            });
        }
        setPreviousNumbers((previousNumbers) => numbers);
      }
    }
  };

  useEffect(() => {
    getPreviousNumbers();
  }, []);

  const returnPreviousNumbers = previousNumbers
    .slice(0, 7)
    .map((number, index) => {
      return (
        <li className="list-none inline text-2xl relative top-5" key={index}>
          {number}{" "}
        </li>
      );
    });

  const returnNoNumbers = () => {
    if (previousDraw == 0) {
      return (
        <p className="text-2xl relative top-5">There hasn't been a draw yet</p>
      );
    } else if (previousNumbers[0] == 0) {
      return (
        <p className="text-2xl relative top-5">You didn't play last draw</p>
      );
    } else {
      return <p className="text-2xl relative top-5">Loading...</p>;
    }
  };

  return (
    <div className="text-center self-end col-start-2 col-span-1 relative bottom-16">
      <h2 className="text-4xl font-extrabold">Your Previous Numbers</h2>
      {previousNumbers.length === 7 ? (
        <p>{returnPreviousNumbers}</p>
      ) : (
        <div>{returnNoNumbers()}</div>
      )}
    </div>
  );
};

export default PlayerPreviousNumbers;
