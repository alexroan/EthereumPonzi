var Doubler = artifacts.require("./Doubler.sol");
var Tree = artifacts.require("./Tree.sol");
var Waterfall = artifacts.require("./Waterfall.sol");

module.exports = function(deployer) {
  deployer.deploy(Doubler);
  deployer.deploy(Tree);
  deployer.deploy(Waterfall);
};
