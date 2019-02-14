import React, {Component} from 'react';
import './App.css';

import {BrowserRouter, Route} from "react-router-dom";
import login from "./page/login";
import home from "./page/home";
import {withFirebase} from "./firebaseinclude";

class App extends Component {
	constructor(){
		super();
		this.state = {};
	}
	render() {
		return (
			<BrowserRouter>
				<div>
					<Route exact path="/home" component={home} User={this.state.User}/>
					<Route path="/login" component={login}/>
					<Route exact component={home}/>
				</div>
			</BrowserRouter>

		);
	}

	componentDidMount() {
		this.props.firebase.auth.onAuthStateChanged(User => {
			User
				? this.setState({User})
				: this.setState({User: null});
		});
	}
}

export default withFirebase(App);
