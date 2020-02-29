pragma solidity ^0.5.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Waterfall {
    using SafeMath for uint;

	struct User {
		address payable addr;
		uint amount;
	}

    address payable public owner;
    User[] public users;
    uint public totalUsers = 0;
    uint public feePercentage = 10;
    uint public payoutPercentage = 10;

    constructor() public {
        owner = msg.sender;
    }

    function join() external payable {
        require(msg.value >= 1 ether, "Investment must be at least 1 ether");
        users.push(User(msg.sender, msg.value));
        totalUsers += 1;

        uint fee = msg.value.mul(feePercentage).div(100);
        owner.transfer(fee);

        uint position = 0;
        while(position < totalUsers) {
            uint payout = users[position].amount.mul(payoutPercentage).div(100);
            if(payout > address(this).balance){
                break;
            }
            users[position].addr.transfer(payout);
            position += 1;
        }
    }
}