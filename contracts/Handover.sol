pragma solidity ^0.5.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Handover {

    using SafeMath for uint;

    address payable public owner;
    address payable public user;
    uint public price;

    constructor() public {
        owner = msg.sender;
        user = msg.sender;
        price = 1 finney;
    }

    function() external payable {
        require(msg.value >= price, "Not enough ether");
        uint payout = msg.value.mul(9).div(100);
        user.transfer(payout);
        user = msg.sender;
        price = price.mul(2);
        owner.transfer(address(this).balance);
    }

}