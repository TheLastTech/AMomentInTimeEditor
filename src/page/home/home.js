import React, {Component} from 'react';
import './home.scss'
import {Button, ListGroup} from 'react-bootstrap'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as homeActions from "../../store/home/actions";
export default class home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		let Rooms = this.props.FireHelper.FireStore.collection("Rooms");
		let RoomsDoc = await Rooms.get()

		let RoomsData = RoomsDoc.docs.map(A => {

			let RoomAsObject = A.data();
			let Obj = {...RoomAsObject};
			Obj.id = A.id;
			return Obj;
		});
		this.setState({RoomsData: RoomsData})
	}

	render() {
		if (this.state.RoomsData) return this.RenderHomeLoaded();
		return <div className="alert-info">Loading</div>

	}

	Goto(Url) {
		return () => {
			this.props.history.push(Url);
		}
	}

	RoomsToListGroupMap(Room) {
		console.log(Room);
		return <ListGroup.Item key={Room.Name}>
			<h1>"{Room.Name}"</h1>


			<Button size="lg" block onClick={this.Goto(`/editor/${Room.Name}/`)}>Edit</Button>
			<Button size="lg" block variant="dark" onClick={this.Goto(`/delete/${Room.Name}/`)}>Delete</Button>


		</ListGroup.Item>
	}

	RenderHomeLoaded() {

		return <ListGroup defaultActiveKey="#link1" variant="flush">
			{this.state.RoomsData.map(this.RoomsToListGroupMap.bind(this))}

		</ListGroup>;
	}

}
// export default connect(
//     ({ home }) => ({ ...home }),
//     dispatch => bindActionCreators({ ...homeActions }, dispatch)
//   )( home );
