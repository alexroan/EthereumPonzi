pragma solidity ^0.5.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

// Chain shaped ponzi
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
	uint public totalWei = 0;
	uint public totalPayout = 0;
	bool public active;

	constructor() public {
		owner = msg.sender;
		active = true;
	}

	function close() public{
		require(msg.sender == owner, "Cannot call function unless owner");
		require(active == true, "Contract must be active");
		require(address(this).balance > 0, "This contract must have a balane above zero");
		owner.transfer(address(this).balance);
		active = false;
	}

	function join() external payable{
		users.push(User(msg.sender, msg.value));
		totalUsers += 1;
		totalWei += msg.value;

		owner.transfer(msg.value.div(10));
		while (address(this).balance > users[currentlyPaying].amount.mul(2)) {
			uint sendAmount = users[currentlyPaying].amount.mul(2);
			users[currentlyPaying].addr.transfer(sendAmount);
			totalPayout += sendAmount;
			currentlyPaying += 1;
		}
	}
}
