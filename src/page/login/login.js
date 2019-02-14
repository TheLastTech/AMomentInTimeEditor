import React, {Component} from 'react';
import './login.scss'

export default class login extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <div className="component-login">
			<span>Welcome</span>
			<div onClick={() => {
				this.props.firebase
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
