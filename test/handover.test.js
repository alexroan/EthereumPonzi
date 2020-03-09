const Handover = artifacts.require("./Handover.sol");

const ether = (n) => {
  return new web3.utils.BN(
      web3.utils.toWei(n.toString(), 'ether')
  )
}

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract("Handover", accounts => {
    describe("It working", async() => {

        let handover, entryFee;
        
        beforeEach(async () => {
            handover = await Handover.deployed();
        });

        it("sets the initial entry fee", async () => {
            entryFee = await handover.price({from: accounts[0]});
            entryFee.toString().should.equal("1000000000000000");
        });

        it("Works properly", async() => {
            // let contractBalance;
            // let lastContractBalance = parseInt(await web3.eth.getBalance(handover.address));
            for (let i = 0; i < 10; i++) {
                const account = accounts[i];
                entryFee = parseInt(await handover.price({from: account}));
                let gasEstimate = await web3.eth.estimateGas({from: account, to: handover.address, value: entryFee})
                let result = await web3.eth.sendTransaction({from: account, to: handover.address, value: entryFee, gas: gasEstimate});
                // contractBalance = parseInt(await web3.eth.getBalance(handover.address));
                // contractBalance.should.be.gt(lastContractBalance);
                // lastContractBalance = contractBalance;
            }
        });
    })
});