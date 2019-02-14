import React, {Component} from 'react';
import './home.scss'
import {Redirect} from "react-router-dom";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as homeActions from "../../store/home/actions";
export default class home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	componentDidMount() {
		if (!this.props.firebase.User) {
			this.setState({AuthFail: true})
		}
		console.log(this.props.firebase.User);
	}

	render() {

		if (this.state.AuthFail) {
			return <Redirect to='/login'></Redirect>

		}
		return <div className="component-home">Hello! component home</div>;
	}
}
// export default connect(
//     ({ home }) => ({ ...home }),
//     dispatch => bindActionCreators({ ...homeActions }, dispatch)
//   )( home );
