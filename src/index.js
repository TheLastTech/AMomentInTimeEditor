import React from 'react';
import ReactDOM from 'react-dom';
import {Navbar,Button,Form,Nav,FormControl} from 'react-bootstrap'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, {FirebaseContext} from "./firebaseinclude";

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}>
		<Navbar bg="light" expand="lg">
			<Navbar.Brand href="/">A Moment In Time</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href='/'>Home</Nav.Link>
					<Nav.Link href='/newroom'>New</Nav.Link>

				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-success">Search</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
		<App/>
	</FirebaseContext.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
