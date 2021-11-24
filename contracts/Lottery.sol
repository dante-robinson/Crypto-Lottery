pragma solidity ^0.8.10;

contract Lottery {
    uint256 public costPerLine;
    uint8[7] public winningNumbers;
    //Stores the address of the Prize pool
    address payable public poolOwner;
    address[] public enteredAddresses;
    mapping(address => bool) public isAddressEntered;
    mapping(address => uint8[7]) public pickedNumbers;
    mapping(address => mapping(uint8 => bool)) public playerWinningNumbers;
    mapping(address => uint8) public correctNumbers;

    //variable used for For Loops
    uint8 index;

    constructor(uint256 _costPerLine) {
        poolOwner = payable(msg.sender);
        costPerLine = _costPerLine;
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
        enteredAddresses.push(msg.sender);
        poolOwner.transfer(costPerLine);
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
    /* function pickWinningNumbers() view {
        uint8 randomNumber;
        keccak256(randomNumber);
    } */

    /* Check Correct Numbers and add up the total correct answers to the
    correctNumbers variable. Also resets the playerWinningNumbers mapping
    back to a status of false.
    Can get very expensive with many enteredAddresses in the array try fixing
    later or pre charge a fee for gas to every person that enters the lottery */
    function checkNumbers() public {
        //Create a correctNumbers mapping to be used to check prize later
        uint256 accountIndex;
        //Temporarily set winningNumbers to 1 through 7 for testing
        winningNumbers[0] = 1;
        winningNumbers[1] = 2;
        winningNumbers[2] = 3;
        winningNumbers[3] = 4;
        winningNumbers[4] = 5;
        winningNumbers[5] = 6;
        winningNumbers[6] = 7;
        //Loop through each enteredAddresses in the array
        for (
            accountIndex = 0;
            accountIndex < enteredAddresses.length;
            accountIndex++
        ) {
            for (index = 0; index < 7; index++) {
                if (
                    pickedNumbers[enteredAddresses[accountIndex]][index] ==
                    winningNumbers[index]
                ) {
                    playerWinningNumbers[enteredAddresses[accountIndex]][
                        index
                    ] = true;
                    correctNumbers[enteredAddresses[accountIndex]]++;
                }
            }
        }
        /* //Add 1 to current prize pool if applicable
        if (correctNumbers == 7) {
            //87.25% of Prize Pool
        } else if (correctNumbers == 6) {
            //2.5% of Prize Pool
        } else if (correctNumbers == 5) {
            //3.5% of Prize Pool
        } else if (correctNumbers == 4) {
            //20 Dollars
        } else if (correctNumbers == 3) {
            //FREE TICKET
        } */
        //Reset isAddressEntered state
    }

    /* function weeklyReset() {
    } */
}
