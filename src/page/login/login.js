import React, {Component} from 'react';
import './login.scss'
import {Redirect} from "react-router-dom";

export default class login extends Component {
	constructor(props) {
		super(props);

	}



	render() {
		if (this.props.User) {
			return <Redirect to='/home'></Redirect>

		}
		return <div className="component-login">
			<span>Welcome</span>
			<div onClick={() => {
				this.props.FireHelper
					.GoogleSignin()
					.then(authUser => {
						console.log(authUser)
						this.props.history.push('/home');
					})
					.catch(error => {
						this.setState({error: "Error" + error.message});
					});


			}}>Login
			</div>

			<div>{this.state.error}</div>

		</div>;
	}
}


// export default connect(
//     ({ login }) => ({ ...login }),
//     dispatch => bindActionCreators({ ...loginActions }, dispatch)
//   )( login );
