pragma solidity >=0.6.0;

contract SimpleStorage {

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

	function() external payable{
		users[users.length] = User({addr: msg.sender, amount: msg.value});

	}
}
