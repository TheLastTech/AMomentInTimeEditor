import React, {Component} from 'react';
import './newroom.scss'
import {Redirect} from "react-router-dom";

export default class newroom extends Component {
	constructor(props) {
		super(props);
		this.state = {RoomName: ' '};
	}

	render() {
		if (this.state.Redirect) {
			return <Redirect to={this.state.Redirect}/>
		}
		return <div className="component-newroom">Give the Room a name:
			<input type='text' value={this.state.RoomName} onChange={(e) => {
				this.setState({RoomName: e.target.value});
			}
			}/>
			<button onClick={this.CreateRoom.bind(this)}>Create</button>
		</div>;
	}

	CreateRoom(e) {
		this.setState({Redirect: `/Editor/${this.state.RoomName}`})
	}
}
// export default connect(
//     ({ newroom }) => ({ ...newroom }),
//     dispatch => bindActionCreators({ ...newroomActions }, dispatch)
//   )( newroom );
