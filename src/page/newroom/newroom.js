import React, {Component} from 'react';
import './newroom.scss'

export default class newroom extends Component {
	constructor(props) {
		super(props);
		this.state = {RoomName: ' ', Error: ''};
	}

	render() {


		return <div className="component-newroom">Give the Room a name:
			<input type='text' value={this.state.RoomName} onChange={(e) => {
				this.setState({RoomName: e.target.value.trim()});
			}
			}/>
			<button onClick={this.CreateRoom.bind(this)}>Create</button>
			<div className='alert-danger'>{this.state.Error}</div>
		</div>;
	}

	async CreateRoom(e) {
		let Rooms = this.props.FireHelper.FireStore.collection("Rooms");
		let Room = Rooms.doc(this.state.RoomName);
		let RoomResult = await Room.get();
		if (RoomResult.exists) {
			this.setState({Error: 'Room already exists'})
			return;
		}
		await Room.set({
			Name: this.state.RoomName,
			TopText: '',
			ImageUrl: '',
			Exits: [],
			Npcs: [],
			GrantsRole: [],
			Interactables: [],
		})
		this.props.history.push(`/Editor/${this.state.RoomName}`)

	}
}
// export default connect(
//     ({ newroom }) => ({ ...newroom }),
//     dispatch => bindActionCreators({ ...newroomActions }, dispatch)
//   )( newroom );
