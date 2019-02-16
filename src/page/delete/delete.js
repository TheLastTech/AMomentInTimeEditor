import React, {Component} from 'react';
import './delete.scss'
import {Button} from 'react-bootstrap'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as deleteActions from "../../store/delete/actions";
export default class deletepage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {

		let Rooms = this.props.FireHelper.FireStore.collection("Rooms");
		let RoomDoc = Rooms.doc(this.props.match.params.Room);
		let RoomRef = await RoomDoc.get();
		if (!RoomRef.exists) {
			this.props.history.push('/');
		}
		let RoomData = RoomRef.data();

		this.setState({
			RoomsDoc: Rooms,
			RoomRef:RoomRef,
			RoomDoc: RoomDoc,
			RoomData: RoomData,

		})
	}

	async DeleteRoom() {

		await this.state.RoomRef.ref.delete()
		this.props.history.push('/');
	}

	render() {
		if (!this.state.RoomDoc) return <div className="alert-info">Loading</div>
		return <div className="component-delete">
			<Button variant='dark'
			        onClick={this.DeleteRoom.bind(this)}>Confirm</Button>
		</div>;
	}
}
// export default connect(
//     ({ delete }) => ({ ...delete }),
//     dispatch => bindActionCreators({ ...deleteActions }, dispatch)
//   )( delete );
