var Doubler = artifacts.require("./Doubler.sol");

module.exports = function(deployer) {
  deployer.deploy(Doubler);
};
