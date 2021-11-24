const Lottery = artifacts.require("Lottery");

module.exports = function (deployer) {
  //Amount in .toWei is the costPerLine
  deployer.deploy(Lottery, web3.utils.toWei("0.1", "ether"));
};
