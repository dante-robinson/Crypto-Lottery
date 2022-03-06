import React from "react";

const ChooseNumbers = ({ setIsOpen }) => {
  let buttons = [];

  const makeButtons = () => {
    for (let i = 1; i < 51; i++) {
      buttons[i - 1] = i;
    }
  };

  makeButtons();

  const returnButtonRowOne = buttons.slice(0, 10).map((number) => {
    return (
      <button className="text-xl bg-blue-500 hover:bg-blue-700 rounded-full w-8 h-8">
        {number}
      </button>
    );
  });
  const returnButtonRowTwo = buttons.slice(10, 20).map((number) => {
    return (
      <button className="text-xl bg-blue-500 hover:bg-blue-700 rounded-full w-8 h-8">
        {number}
      </button>
    );
  });
  const returnButtonRowThree = buttons.slice(20, 30).map((number) => {
    return (
      <button className="text-xl bg-blue-500 hover:bg-blue-700 rounded-full w-8 h-8">
        {number}
      </button>
    );
  });
  const returnButtonRowFour = buttons.slice(30, 40).map((number) => {
    return (
      <button className="text-xl bg-blue-500 hover:bg-blue-700 rounded-full w-8 h-8">
        {number}
      </button>
    );
  });
  const returnButtonRowFive = buttons.slice(40, 50).map((number) => {
    return (
      <button className="text-xl relative bg-blue-500 hover:bg-blue-700 rounded-full w-8 h-8">
        {number}
      </button>
    );
  });

  return (
    <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center">
      <div className="bg-white w-128 h-1/2 rounded-lg">
        <div className="flex justify-between items-center">
          <h4 className="whitespace-nowrap text-2xl font-bold self-start relative text-center top-7 left-7">
            Choose your numbers for current draw
          </h4>
          <div>
            <div className="inline-flex relative top-24 right-96 space-x-2">
              {returnButtonRowOne}
            </div>
            <div className="inline-flex relative top-28 right-96 space-x-2">
              {returnButtonRowTwo}
            </div>
            <div className="inline-flex relative top-32 right-96 space-x-2">
              {returnButtonRowThree}
            </div>
            <div className="inline-flex relative top-36 right-96 space-x-2">
              {returnButtonRowFour}
            </div>
            <div className="inline-flex relative top-40 right-96 space-x-2">
              {returnButtonRowFive}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl rounded-lg border border-red-500 hover:bg-red-500 h-12 w-40 relative right-96 top-52"
            >
              Cancel
            </button>
            <button className="text-2xl rounded-lg border border-green-500 hover:bg-green-500 h-12 w-40 relative right-76 top-52">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseNumbers;
