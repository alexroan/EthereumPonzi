const Tree = artifacts.require("./Tree.sol");

const ether = (n) => {
    return new web3.utils.BN(
        web3.utils.toWei(n.toString(), 'ether')
    )
}

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract("Tree", accounts => {
    it("Constructs the tree", async () => {
        const treeInstance = await Tree.new({from: accounts[0]});

        //First round of entrances
        //      0
        //    / | \
        //   1  2  3
        let i = 1;
        for (; i < 4; i++) {
            const account = accounts[i];
            let beforeBalance = parseInt(await web3.eth.getBalance(accounts[0]));
            await treeInstance.enter(accounts[0], {from: account, value: ether(1)});
            let afterBalance = parseInt(await web3.eth.getBalance(accounts[0]));
            afterBalance.should.be.gt(beforeBalance);
        }

        //Second round
        //   \
        //    3
        //   / \
        //  4   5
        for (; i < 6; i++) {
            const account = accounts[i];
            let rootBefore = parseInt(await web3.eth.getBalance(accounts[0]));
            let threeBefore = parseInt(await web3.eth.getBalance(accounts[3]));
            await treeInstance.enter(accounts[3], {from: account, value: ether(1)});
            let rootAfter = parseInt(await web3.eth.getBalance(accounts[0]));;
            let threeAfter = parseInt(await web3.eth.getBalance(accounts[3]));
            rootAfter.should.be.gt(rootBefore);
            threeAfter.should.be.gt(threeBefore);
        }

        //Third round
        //       /
        //    - 4 - 
        //  /  / \  \
        // 6  7   8  9
        for(; i < 10; i++) {
            const account = accounts[i];
            let rootBefore = parseInt(await web3.eth.getBalance(accounts[0]));
            let threeBefore = parseInt(await web3.eth.getBalance(accounts[3]));
            let fourBefore = parseInt(await web3.eth.getBalance(accounts[4]));
            await treeInstance.enter(accounts[4], {from: account, value: ether(1)});
            let rootAfter = parseInt(await web3.eth.getBalance(accounts[0]));;
            let threeAfter = parseInt(await web3.eth.getBalance(accounts[3]));
            let fourAfter = parseInt(await web3.eth.getBalance(accounts[4]));
            rootAfter.should.be.gt(rootBefore);
            threeAfter.should.be.gt(threeBefore);
            fourAfter.should.be.gt(fourBefore);
        }
    })
})