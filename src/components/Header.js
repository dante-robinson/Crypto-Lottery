import React from "react";
import { useMetaMask } from "metamask-react";
import Metamask from "../metamask.png";
import { Link } from "react-router-dom";

const Header = () => {
  const { connect } = useMetaMask();

  return (
    <nav className="col-span-3 max-h-14">
      <div className="flex justify-between">
        <div>
          <span className="text-5xl font-extrabold">
            <Link to="/">Crypto Lottery</Link>
          </span>
        </div>

        <div className="flex justify-center space-x-8">
          <h2 className="text-2xl font-bold self-center">
            <Link to="/HowItWorks">How It Works</Link>
          </h2>
          <h2 className="text-2xl font-bold self-center">
            <Link to="/Previous-Winners">Previous Winners</Link>
          </h2>
          <h2 className="text-2xl font-bold self-center">
            <Link to="/Account">Account</Link>
          </h2>
        </div>
        <div className="justify-self-end self-center">
          <button
            onClick={connect}
            className="py-2 px-3 bg-blue-500 hover:bg-blue-700 rounded-lg"
          >
            Login with Metamask
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
