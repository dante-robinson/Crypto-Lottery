const Lottery = artifacts.require("./Lottery.sol");
const assert = require("assert");

/* Need variables to store before transfer balance in test later for some reason
if called in beforeEach it doesnt recognize them later in the test needed if
someone knows how to fix this you're more than welcome to push the fix */
let balanceOf0Before;
let balanceOf1Before;

contract("Lottery", (accounts) => {
  describe("Lottery Contract", () => {
    let lottery;
    let link;
    let drawNumber;
    // Deploy a new Lottery contract with a costPerLine of 0.1 ETH
    before(async () => {
      // Deploy Lottery Contract
      lottery = await Lottery.new(
        //Cost Per Line 0.1 ETH
        BigInt(100000000000000000),
        //VRF Coordinator Address
        "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B",
        //Chainlink Key Hash
        "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311",
        //Chainlink Fee
        BigInt(100000000000000000),
        //LINK Address
        "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
        //WETH Address
        "0xc778417E063141139Fce010982780140Aa0cD5Ab"
      );

      drawNumber = await lottery.drawNumber();

      //Deploy balanceOf from LINK Contract
      const linkABI = [
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
      ];
      const LINKAddress = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709";
      link = await new web3.eth.Contract(linkABI, LINKAddress);

      // Assign balance before transfer
      balanceOf0Before = parseInt(await web3.eth.getBalance(accounts[0]));
      // Subtract the costPerLine for test later
      balanceOf1Before = parseInt(await web3.eth.getBalance(accounts[1]));
    });

    it("allows people to enter Lottery", async () => {
      await lottery.chooseNumbers(47, 16, 18, 6, 49, 24, 36, {
        from: accounts[2],
        // This needs to match the costPerLine
        value: web3.utils.toWei("0.1", "ether"),
      });
      assert.equal(
        await lottery.isAddressEntered(drawNumber, accounts[2]),
        true
      );
    });

    it("can choose numbers for ticket", async () => {
      /* Enter lottery is part of choosing original numbers as I dont see the need
      in calling multiple functions to enter and then choose numbers etc. */
      await lottery.chooseNumbers(49, 47, 18, 16, 6, 36, 24, {
        from: accounts[1],
        //This needs to match the costPerLine
        value: web3.utils.toWei("0.1", "ether"),
      });

      // Create and array of the chosen Numbers
      const array = [49, 47, 18, 16, 6, 36, 24];

      // Create For Loop to iterate over each item in the area
      for (let i = 0; i < 7; i++) {
        assert.equal(
          await lottery.pickedNumbers(drawNumber, accounts[1], i),
          array[i]
        );
      }
    });

    it("adds money to totalPrizePool", async () => {
      assert.ok((await lottery.totalPrizePool()) > 0);
    });

    it("sends money from player to owner", async () => {
      /* Check to make sure the new Balance of each account is correct. parseInt
      is needed to convert each value to an Integer from a String */
      assert.ok(
        // Technically its +0.2 ether from bothe transactions but to consider other gas checking 0.1
        balanceOf0Before + parseInt(web3.utils.toWei("0.1", "ether")) <
          parseInt(await web3.eth.getBalance(accounts[0]))
      );

      /* To account for random transaction fee cost the costPerLine is
      subracted for balanceOf1Before so both values would in theory be the same
      before you include the transaction fee therefore the balance before the
      transaction should be greater */
      assert.ok(
        (balanceOf1Before -=
          parseInt(web3.utils.toWei("0.1", "ether")) >
          parseInt(await web3.eth.getBalance(accounts[1])))
      );
    });

    it("gets estimated ETH needed for linkFee then converts ETH to LINK", async () => {
      await lottery.getEstimatedETHforLINK({ from: accounts[0] });
      let ethAmount = await lottery.ethAmount();

      await lottery.convertEthToExactLINK({
        from: accounts[0],
        value: parseInt(ethAmount * 1.1),
      });
      assert.ok(
        parseInt(await link.methods.balanceOf(lottery.address).call()) >
          BigInt(100000000000000000) // 0.1 LINk
      );
    });

    it("executes getRandomNumber and expands the number array", async () => {
      // As mentioned above doesnt work as its not connected to a Chainlink Oracle Node
      await lottery.getRandomNumber({ from: accounts[0] });
      await lottery.expand({ from: accounts[0] });
      // Only checking first number is equal to 18 as the rest can be assumed also changed
      assert.ok((await lottery.winningNumbers(drawNumber, 0)) == 47);
    });

    /* Not 100% Reliable as its a fork of rinkeby it draws the same numbers every time on Remix
   uploaded to rinkeby this is not as issue, Test checks accounts are added to correct array only */
    it("checks the pickedNumbers to winningNumbers", async () => {
      await lottery.checkNumbers({ from: accounts[2] });
      //Same Numbers in all different positions to check order doesn't matter
      await lottery.checkNumbers({ from: accounts[1] });

      assert.equal(await lottery.sevenCorrect(0), accounts[2]);
      assert.equal(await lottery.sevenCorrect(1), accounts[1]);
    });

    it("distributes the totalPrizePool to winners", async () => {
      // split the totalPrizePool into smaller pools
      await lottery.dividePool({ from: accounts[0] });

      // Get ETH balance for account 1 and 2
      balanceOne = await web3.eth.getBalance(accounts[1]);
      balanceTwo = await web3.eth.getBalance(accounts[2]);

      // Only claiming seven correct numbers as I didn't have any accounts win other prizes
      await lottery.sevenClaimPrize({
        from: accounts[0],
        value: await lottery.sevenPool(),
      });

      // Checks that the prize in sevenPool is 0
      assert.equal(await lottery.sevenPool(), 0);
      // Checks that the balance in account 1 and 2 have increased
      assert.ok(balanceOne < (await web3.eth.getBalance(accounts[1])));
      assert.ok(balanceTwo < (await web3.eth.getBalance(accounts[2])));
    });

    it("removes winners from arrays", async () => {
      await lottery.weeklyReset({ from: accounts[0] });
      // manually reset the test drawNumber variable after calling weeklyReset
      drawNumber = await lottery.drawNumber();
      /* The line below should fail when uncommented meaning it works
     assert(await lottery.sevenCorrect(0)); */
      assert.equal(await lottery.sevenCorrect.length, 0);
    });

    it("keeps not claimed/won prizes for next draw", async () => {
      assert.ok(balanceOf0Before < (await web3.eth.getBalance(accounts[0])));
      // Should be around 0.028 ether remaining after 85% given to sevenPool winners and 1% for fees
      assert.ok(
        (await lottery.totalPrizePool()) > web3.utils.toWei("0.027", "ether")
      );
    });

    it("adds new money added to prize pool with not won prizes", async () => {
      // Re-enter the lottery for the next draw
      await lottery.chooseNumbers(47, 16, 18, 6, 49, 24, 36, {
        from: accounts[1],
        //This needs to match the costPerLine
        value: web3.utils.toWei("0.1", "ether"),
      });
      /* Now in real world it would auto call a new number and expand it but in this case I'm just gonna
     leave it the same */
      await lottery.checkNumbers({ from: accounts[1] });
      // Just dividing the prize pool up now and we can then check the older not won prizes
      await lottery.dividePool({ from: accounts[0] });
      /* 0.008 ether from last draw + 4% of the 0.1 we just added should be over 0.012 ether not all 1%
     of gas was used so that remainder is readded to next draw making it not exactly 0.012 */
      assert.ok(
        (await lottery.sixPool()) >= web3.utils.toWei("0.012", "ether")
      );
    });

    it("changes drawNumber and doesn't let user use old number in new draw", async () => {
      // using the numbers called from the last it statement we can just reset the contract and try using it
      await lottery.weeklyReset({ from: accounts[0] });
      // manually reset the test drawNumber variable after calling weeklyReset
      drawNumber = await lottery.drawNumber();
      // The line below when uncommented should fail
      // await lottery.checkNumbers({ from: accounts[1] });
      assert.equal(await lottery.pickedNumbers(drawNumber, accounts[1], 0), 0);
    });
  });
});
