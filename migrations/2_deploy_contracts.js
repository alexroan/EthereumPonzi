var Doubler = artifacts.require("./Doubler.sol");
var Tree = artifacts.require("./Tree.sol");

module.exports = function(deployer) {
  deployer.deploy(Doubler);
  deployer.deploy(Tree);
};
