import getWeb3 from "../getWeb3";
import Doubler from "../contracts/Doubler.json";

import { web3Loaded, accountLoaded, doublerLoaded } from "./actions";

export const loadBlockchainData = async (dispatch) => {
    console.log("getting web3");
    let web3 = await loadWeb3(dispatch);
    console.log("getting account");
    let account = await loadAccount(web3, dispatch);
    console.log("getting doubler");
    let doubler = await loadDoubler(web3, dispatch);
    return web3;
}

export const loadWeb3 = async (dispatch) => {
    console.log("1");
    const web3 = await getWeb3();
    console.log("2");
    dispatch(web3Loaded(web3));
    console.log("3");
    return web3;
}

export const loadAccount = async (web3, dispatch) => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    dispatch(accountLoaded(account));
    return account;
}

export const loadDoubler = async (web3, dispatch) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Doubler.networks[networkId];
    const instance = new web3.eth.Contract(
        Doubler.abi,
        deployedNetwork && deployedNetwork.address,
    );
    dispatch(doublerLoaded(instance));
    return instance;
}

export const depositEther = async (web3, doubler, account, amount, dispatch) => {
    console.log(web3, doubler, account, amount);
    const etherAmount = web3.utils.toWei(amount, 'ether');
    window.doubler = doubler;
    doubler.methods.join().send({from: account, value: etherAmount})
        .on('transactionHash', (hash) => {
            console.log("HASH");
        })
        .on('receipt', (hash) => {
            console.log("receipt");
        })
        .on('error', (err) => {
            console.log(err);
        })
}