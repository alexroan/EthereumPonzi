const Waterfall = artifacts.require("./Waterfall.sol");

const ether = (n) => {
  return new web3.utils.BN(
      web3.utils.toWei(n.toString(), 'ether')
  )
}
contract("Waterfall", accounts => {
    describe("It working", async() =>{
        it("Does it", async() =>{
            const waterfallInstance = await Waterfall.deployed();

            for (let i = 1; i < 10; i++) {
                const account = accounts[i];
                await waterfallInstance.join({from: account, value: ether(1)})
            }

        })
    })
})