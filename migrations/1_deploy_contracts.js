const Lottery = artifacts.require("Lottery");

module.exports = async () => {
  //Amount in .toWei is the costPerLine
  const lottery = await Lottery.new(
    web3.utils.toWei("0.1", "ether"),
    0xb3dccb4cf7a26f6cf6b120cf5a73875b7bbc655b,
    0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311,
    100000000000000000, // 0.1 LINK
    0x01be23585060835e02b77ef475b0cc51aa1e0709,
    0xc778417e063141139fce010982780140aa0cd5ab
  );
  Lottery.setAsDeployed(lottery);
};
