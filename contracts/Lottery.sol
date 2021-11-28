pragma solidity ^0.8.10;

contract Lottery {
    uint256 public costPerLine;
    uint8[7] public winningNumbers;
    uint256 public totalPrizePool;

    //Stores the address of the Prize pool
    address payable public poolOwner;
    mapping(address => bool) public isAddressEntered;
    mapping(address => uint8[7]) public pickedNumbers;
    mapping(address => uint8) public correctNumbers;

    //Winning Addresses Array
    address payable[] public sevenCorrect;
    address payable[] public sixCorrect;
    address payable[] public fiveCorrect;
    address payable[] public fourCorrect;
    address payable[] public threeCorrect;

    //Declare Prize Pools
    uint256 public sevenPool;
    uint256 public sixPool;
    uint256 public fivePool;
    uint256 public fourPool;
    uint256 public threePool;

    //variable used for For Loops
    uint256 x;

    constructor(uint256 _costPerLine) {
        poolOwner = payable(msg.sender);
        costPerLine = _costPerLine;
    }

    //Only Contract Owner can call this modifier
    modifier restricted() {
        require(msg.sender == poolOwner);
        _;
    }

    //Takes in 7 chosen numbers and assigns them to the pickedNumbers mapping.
    //TRY CLEANING UP
    function chooseNumbers(
        uint8 _0,
        uint8 _1,
        uint8 _2,
        uint8 _3,
        uint8 _4,
        uint8 _5,
        uint8 _6
    ) public payable {
        require(msg.value == costPerLine);
        require(isAddressEntered[msg.sender] == false);
        isAddressEntered[msg.sender] = true;
        poolOwner.transfer(costPerLine);
        totalPrizePool += costPerLine;
        //Assign selected numbers to mapping
        pickedNumbers[msg.sender][0] = _0;
        pickedNumbers[msg.sender][1] = _1;
        pickedNumbers[msg.sender][2] = _2;
        pickedNumbers[msg.sender][3] = _3;
        pickedNumbers[msg.sender][4] = _4;
        pickedNumbers[msg.sender][5] = _5;
        pickedNumbers[msg.sender][6] = _6;
    }

    //NEEDS WORK! UNFINISHED
    function pickWinningNumbers() public restricted {
        //Temporarily set winningNumbers to 1 through 7 for testing
        winningNumbers[0] = 1;
        winningNumbers[1] = 2;
        winningNumbers[2] = 3;
        winningNumbers[3] = 4;
        winningNumbers[4] = 5;
        winningNumbers[5] = 6;
        winningNumbers[6] = 7;
    }

    /* Check Correct Numbers and add up the total correct answers to the
    correctNumbers variable. Also resets the playerWinningNumbers mapping
    back to a status of false. */
    function checkNumbers() public {
        require(isAddressEntered[msg.sender]);
        //Create a correctNumbers mapping to be used to check prize later

        //Loop through each arrayAddress in the array
        for (x = 0; x < 7; x++) {
            if (pickedNumbers[msg.sender][x] == winningNumbers[x]) {
                correctNumbers[msg.sender]++;
            }
        }

        //Add 1 to current prize pool if applicable
        if (correctNumbers[msg.sender] == 7) {
            //87.25% of Prize Pool
            sevenCorrect.push(payable(msg.sender));
        } else if (correctNumbers[msg.sender] == 6) {
            //3.5% of Prize Pool
            sixCorrect.push(payable(msg.sender));
        } else if (correctNumbers[msg.sender] == 5) {
            //4.5% of Prize Pool this is correct as there are more winners
            fiveCorrect.push(payable(msg.sender));
        } else if (correctNumbers[msg.sender] == 4) {
            //2.5% of Prize Pool
            fourCorrect.push(payable(msg.sender));
        } else if (correctNumbers[msg.sender] == 3) {
            //2% of Prize Pool
            threeCorrect.push(payable(msg.sender));
        }

        //Reset isAddressEntered & correctNumbers
        isAddressEntered[msg.sender] = false;
        correctNumbers[msg.sender] = 0;
    }

    //Distributes Prize and resets contract
    function weeklyReset() public payable restricted {
        //Divide the total prize pool up into seperate pools to be distributed
        //(uint (3) / 100) * x

        /* Divides the prize pool into 100 pieces as decimals are not uint in
        solidity. Then distribute 88 pieces to say sevenPool as 88% of the prize
        working the same as doing * 0.88 */
        uint256 dividedPool = (totalPrizePool / 100);
        //Using += to carry over previous balance is prize not won
        sevenPool += sevenPool + (dividedPool * 86);
        sixPool += sixPool + (dividedPool * 4);
        fivePool += fivePool + (dividedPool * 5);
        fourPool += fourPool + (dividedPool * 3);
        threePool += threePool + (dividedPool * 2);

        //Create variables for use in for loops
        uint256 totalSeven = sevenCorrect.length;
        uint256 totalSix = sixCorrect.length;
        uint256 totalFive = fiveCorrect.length;
        uint256 totalFour = fourCorrect.length;
        uint256 totalThree = threeCorrect.length;

        /* If using .length property then the for loop will not complete because
        after each run the account is deleted from the array and paid as x grows
        in value to loop through array .length would be shrinking not paying out
        everyone therefore a static variable is needed */
        for (x = 0; x < totalSeven; x++) {
            uint256 prize = sevenPool / totalSeven;
            address payable winner = sevenCorrect[x];
            winner.transfer(prize);
        }
        for (x = 0; x < totalSix; x++) {
            uint256 prize = sixPool / totalSix;
            address payable winner = sixCorrect[x];
            winner.transfer(prize);
        }
        for (x = 0; x < totalFive; x++) {
            uint256 prize = fivePool / totalFive;
            address payable winner = fiveCorrect[x];
            winner.transfer(prize);
        }
        for (x = 0; x < totalFour; x++) {
            uint256 prize = fourPool / totalFour;
            address payable winner = fourCorrect[x];
            winner.transfer(prize);
        }
        for (x = 0; x < totalThree; x++) {
            uint256 prize = threePool / totalThree;
            address payable winner = threeCorrect[x];
            winner.transfer(prize);
        }

        delete sevenCorrect;
        delete sixCorrect;
        delete fiveCorrect;
        delete fourCorrect;
        delete threeCorrect;
    }
}
