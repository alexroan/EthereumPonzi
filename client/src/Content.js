import React, {Component} from 'react';
import {connect} from 'react-redux';
import { etherAmountChanged } from './redux/actions';
import { depositEther } from './redux/interactions';
import { web3Selector, doublerSelector, accountSelector, depositAmountSelector } from './redux/selectors';

const showForm = (props) => {
    const {dispatch, web3, doubler, account, depositAmount} = props;

    const etherAmountChange = (e) => dispatch(etherAmountChanged(e.target.value));
    const submitForm = (e) => {
        e.preventDefault();
        depositEther(web3, doubler, account, depositAmount, dispatch);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-8">
                <div className="card">
                    <div className="card-header">Double your money!</div>
                    <div className="card-body">
                        <form onSubmit={submitForm}>
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
    )
}

class Content extends Component {

    componentDidMount() {
        this.loadBlockchainData(this.props);
    }

    async loadBlockchainData(props) {

    }

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
        depositAmount: depositAmountSelector(state)
	}
}

export default connect(mapStateToProps)(Content);