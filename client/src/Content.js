import React, {Component} from 'react';
import {connect} from 'react-redux';
import { etherAmountChanged } from './redux/actions';
import { depositEther, loadBlockchainData, checkAccounts } from './redux/interactions';
import { web3Selector, doublerSelector, accountSelector, depositAmountSelector, totalPayoutSelector, currentlyPayingSelector } from './redux/selectors';

const showForm = (props) => {
    const {dispatch, web3, doubler, account, depositAmount, totalPayout, usersPaid} = props;

    const etherAmountChange = (e) => dispatch(etherAmountChanged(e.target.value));
    const invest = async (e) => {
        e.preventDefault();
        const accountsMatch = await checkAccounts(web3, account);
        if (accountsMatch) {
            await depositEther(web3, doubler, account, depositAmount, dispatch);
        }
        else{
            alert("Your current account doesn't match up with your metamask account. Please reconnect by clicking your account button");
        }
    }

    const connectWallet = async (e) => {
        e.preventDefault();
        console.log("Connecting wallet");
        await loadBlockchainData(dispatch);
        console.log("Connected");
    }

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-4">
                    <form onSubmit={connectWallet}>
                        <div className="form-group row">
                            <div className="col-12">
                                <button type="submit" className="w-100 btn btn-secondary text-truncate">
                                    {(account !== null) ? account : "Connect Wallet"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-8">
                    <div className="card">
                        <div className="card-header">Double your money!</div>
                        <div className="card-body">
                            <form onSubmit={invest}>
                                <div className="form-group row">
                                    <div className="col-md-3 text-md-right">
                                        <label htmlFor="deposit" className="col-form-label">Investment (ETH)</label>
                                    </div>
                                    <div className="col-md-9">
                                        <input type="number"
                                            step="any"
                                            name="deposit"
                                            id="deposit"
                                            min="1"
                                            onChange={etherAmountChange}
                                            className="form-control form-control"
                                            required />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-9 offset-md-3">
                                        <button type="submit" className="btn btn-primary">
                                            INVEST
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>            
            </div>
        </div>
    )
}

class Content extends Component {
    render() {
        return (
            showForm(this.props)
        );
    }
}

function mapStateToProps(state){
	return {
        web3: web3Selector(state),
        doubler: doublerSelector(state),
        account: accountSelector(state),
        depositAmount: depositAmountSelector(state),
        totalPayout: totalPayoutSelector(state),
        usersPaid: currentlyPayingSelector(state)
	}
}

export default connect(mapStateToProps)(Content);