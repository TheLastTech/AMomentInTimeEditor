import FirebaseContext from './firebasecontext';
import Firebase from './firebaseauth';
import React from "react";

let withFirebase = Component => props => (
	<FirebaseContext.Consumer>
		{firebase => <Component {...props} firebase={firebase}/>}
	</FirebaseContext.Consumer>
);

export default Firebase;

export {FirebaseContext, withFirebase};
