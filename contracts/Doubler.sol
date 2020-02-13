pragma solidity >=0.6.0;

import "../installed_contracts/zeppelin/contracts/math/SafeMath.sol";

contract Doubler {

	using SafeMath for uint;

	address payable public owner;

	struct User {
		address payable addr;
		uint amount;
	}

	User[] public users;
	uint public currentPaying = 0;
	uint public totalUsers = 0;

	constructor() public {
		owner = msg.sender;
	}

	receive() external payable{
		users[users.length] = User({addr: msg.sender, amount: msg.value});
		totalUsers += 1;

		owner.transfer(msg.value.div(10));
		while (address(this).balance > users[currentlyPaying].amount * 2) {
			paying += 1;
		}

	}
}
