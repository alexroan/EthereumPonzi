const Doubler = artifacts.require("./Doubler.sol");

const ether = (n) => {
  return new web3.utils.BN(
      web3.utils.toWei(n.toString(), 'ether')
  )
}

contract("Doubler", accounts => {
  it("doubles!", async () => {
    const doublerInstance = await Doubler.deployed();

    let owner = await doublerInstance.owner();
    for (let i = 1; i < 9; i++) {
      const account = accounts[i];
      await doublerInstance.join({from: account, value: ether(1)});
    }

    console.log(await web3.eth.getBalance(accounts[0]));
    await doublerInstance.close({from: accounts[0]});
    console.log(await web3.eth.getBalance(accounts[0]));


  });
});
