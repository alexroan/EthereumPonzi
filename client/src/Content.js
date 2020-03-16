import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dropdown} from 'react-bootstrap';
import Doubler from './Doubler'; 
import { selectedAppNameSelector, web3Selector, accountSelector } from './redux/selectors';
import { setAppName, loadWeb3, loadBlockchainData } from './redux/interactions';

class Content extends Component {
    render() {
        const {dispatch, appName, web3, account} = this.props;

        const connectBlockchain = async (e) => {
            e.preventDefault();
            await loadWeb3(dispatch);
        }
    
        const connectWallet = async (e) => {
            e.preventDefault();
            await loadBlockchainData(web3, dispatch);
        }

        return (
            <div>
                <div className="row justify-content-center pb-3">
                    <Dropdown>
                        <Dropdown.Toggle>{appName}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item key="Doubler" onClick={(e) => setAppName("Doubler", dispatch)}>Doubler</Dropdown.Item>
                            <Dropdown.Item key="Handover" onClick={(e) => setAppName("Handover", dispatch)}>Handover</Dropdown.Item>
                            <Dropdown.Item key="Tree" onClick={(e) => setAppName("Tree", dispatch)}>Tree</Dropdown.Item>
                            <Dropdown.Item key="Waterfall" onClick={(e) => setAppName("Waterfall", dispatch)}>Waterfall</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <form onSubmit={connectBlockchain}>
                            <div className="form-group row">
                                <div className="col-12">
                                    <button type="submit" className={`w-100 btn text-truncate ${(web3 !== null) ? "disabled btn-success" : "btn-danger"}`}>
                                        {(web3 !== null) ? "Blockchain Connected" : "Connect Blockchain"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <form onSubmit={connectWallet}>
                            <div className="form-group row">
                                <div className="col-12">
                                    <button type="submit" className={`w-100 btn text-truncate ${(web3 === null) ? "disabled btn-danger" : (account !== null) ? "btn-success" : "btn-warning" }`}>
                                        {(account !== null) ? account : "Connect Wallet"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Doubler />
            </div>
        );
    }
}

function mapStateToProps(state){
	return {
        web3: web3Selector(state),
        appName: selectedAppNameSelector(state),
        account: accountSelector(state),
	}
}

export default connect(mapStateToProps)(Content);