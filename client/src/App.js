import React, { Component } from "react";
import {connect} from 'react-redux';
import "./App.css";
import { loadWeb3, loadAccount, loadDoubler } from "./redux/interactions.js";
import Content from "./Content";

class App extends Component {

	componentDidMount(){
		this.loadBlockchainData(this.props.dispatch);
	}

	async loadBlockchainData(dispatch) {
		try {
			const web3 = await loadWeb3(dispatch);
			const account = await loadAccount(web3, dispatch);
			const doubler = await loadDoubler(web3, dispatch);
		} catch (error) {
			console.error(error);
		}
	};

	render() {
		return (
			<div>
				<Content />
			</div>
		)
	}
}

function mapStateToProps(state){
	return {

	}
}

export default connect(mapStateToProps)(App);
