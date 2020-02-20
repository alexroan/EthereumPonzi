import getWeb3 from "../getWeb3";
import Doubler from "../contracts/Doubler.json";

import { web3Loaded, accountLoaded, accountLoading, doublerLoaded } from "./actions";

export const loadBlockchainData = async (dispatch) => {
    let web3 = await loadWeb3(dispatch);
    await loadAccount(web3, dispatch);
    await loadDoubler(web3, dispatch);
    return web3;
}

export const loadWeb3 = async (dispatch) => {
    const web3 = await getWeb3();
    dispatch(web3Loaded(web3));
    return web3;
}

export const checkAccounts = async (web3, account, dispatch) => {
    const web3Accounts = await web3.eth.getAccounts();
    const web3Account = web3Accounts[0];
    return (web3Account === account);
}

export const loadAccount = async (web3, dispatch) => {
    dispatch(accountLoading());
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
            console.log()
        })
}