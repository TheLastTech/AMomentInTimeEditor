import FirebaseContext from './firebasecontext';
import Firebase from './FireHelper';
import React from "react";

let withFirebase = Component => props => (
	<FirebaseContext.Consumer>
		{firebase => <Component {...props} FireHelper={firebase}/>}
	</FirebaseContext.Consumer>
);

export default Firebase;

export {FirebaseContext, withFirebase};
