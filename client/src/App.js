import React, { Component } from "react";
import {connect} from 'react-redux';
import "./App.css";
import Content from "./Content";
import { setAppName } from "./redux/interactions";

class App extends Component {

	render() {
		const {dispatch} = this.props;
		setAppName("Doubler", dispatch);
		return (
			<div className="container py-5">
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
