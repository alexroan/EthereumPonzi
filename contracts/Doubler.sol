pragma solidity ^0.5.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Doubler {

	using SafeMath for uint;

	address payable public owner;

	struct User {
		address payable addr;
		uint amount;
	}

	User[] public users;
	uint public currentlyPaying = 0;
	uint public totalUsers = 0;

	constructor() public {
		owner = msg.sender;
	}

	function join() external payable{
		users.push(User(msg.sender, msg.value));
		totalUsers += 1;

		owner.transfer(msg.value.div(10));
		while (address(this).balance > users[currentlyPaying].amount.mul(2)) {
			users[currentlyPaying].addr.transfer(users[currentlyPaying].amount.mul(2));
			currentlyPaying += 1;
		}
	}
}
