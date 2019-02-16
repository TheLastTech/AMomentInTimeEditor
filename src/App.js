import React, {Component} from 'react';
import './App.css';

import {BrowserRouter, Route} from "react-router-dom";
import login from "./page/login";
import home from "./page/home";
import {withFirebase} from "./firebaseinclude";
import editor from "./page/editor";
import deletepage from "./page/delete";
import newroom from "./page/newroom";

class App extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<Route exact path="/home" component={home} User={this.state.User}/>
					<Route path="/login" component={login} User={this.state.User}/>
					<Route path="/NewRoom" exact component={newroom} User={this.state.User}/>
					<Route path="/Editor/:Room" exact component={editor} User={this.state.User}/>
					<Route path="/Delete/:Room" exact component={deletepage} User={this.state.User}/>
					<Route exact path="/" component={home} User={this.state.User}/>
				</div>
			</BrowserRouter>

		);
	}

	componentWillUnmount() {
		this.Listener && this.Listener();
	}

	componentDidMount() {
		this.Listener = this.props.FireHelper.auth.onAuthStateChanged(User => {
			User
				? this.setState({User})
				: this.setState({User: null});
		});
	}
}

export default withFirebase(App);
