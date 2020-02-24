const Doubler = artifacts.require("./Doubler.sol");

const ether = (n) => {
  return new web3.utils.BN(
      web3.utils.toWei(n.toString(), 'ether')
  )
}

contract("Doubler", accounts => {
  it("doubles!", async () => {
    const doublerInstance = await Doubler.deployed();

    for (let i = 1; i < 10; i++) {
      const account = accounts[i];
      let owner = await doublerInstance.owner();
      console.log(owner);
      console.log(ether(1).toString());
      await doublerInstance.join({from: account, value: ether(1)});
      console.log(await doublerInstance.totalUsers());
    }
  });
});
