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
        <form className="row" onSubmit={submitForm}>
            <div className="col-12 col-sm pr-sm-2">
                <input type="number" 
                    step="any"
                    min="1"
                    onChange={etherAmountChange}
                    className="form-control form-control-sm bg-dark text-white"
                    required />
            </div>            
        </form>
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