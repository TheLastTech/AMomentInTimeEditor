import React, {Component} from 'react';
import {Editor} from 'slate-react'
import './editor.scss'
import Select from 'react-select';
import Blank from './DefaultSlateValue'
import {Fire2Slate} from './DefaultSlateValue'

export default class editor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			SlateData: Blank,
			RoomName: this.props.match.params.Room,
			Locale: this.props.match.params.Locale || 'US'
		};

	}



	async SetupRoom() {
		let Rooms = this.props.FireHelper.FireStore.collection("Rooms");
		let Room = Rooms.doc(this.state.RoomName);
		let RoomResult = await Room.get();
		if (!RoomResult.exists) {
			this.props.history.push('/');
			return;
		}
		let RoomData = RoomResult.data();
		let RoomsDoc = await Rooms.get()

		let RoomsData = RoomsDoc.docs.map(A => {

			let RoomAsObject = A.data();
			let Obj = {...RoomAsObject};
			Obj.id = A.id;
			return Obj;
		});
		console.log(RoomsData);
		this.setState({
			RoomsDoc: Rooms,
			Rooms: RoomsData,
			RoomDoc: Room,
			RoomData: RoomData,
			SlateData: Fire2Slate(RoomData)
		})


	}


	async componentDidMount() {

		await this.SetupRoom();


	}

	onChange = ({value}) => {

		this.setState({SlateData: value})
	}

	render() {
		if (!this.state.RoomData) {
			return <div>Loading...</div>
		}
		let RoomOptions = this.state.Rooms.map(A => {
			return {value: A.id, label: A.Name}
		});
		console.log(RoomOptions);
		let Exits = this.GetCurrentExits(RoomOptions);
		return <div className="component-editor">
			<h3>{this.state.RoomName}:</h3>
			<Editor value={this.state.SlateData} onChange={this.onChange.bind(this)}/>
			<button onClick={this.UpdateRoom.bind(this)}>Update</button>

			<div>
				<h3>Add Exit:</h3>
				Exit Text:<input type='text'/>
				Exit Hint:<input type='text'/>
				Two Way?:<input type='checkbox'/>
				<label>Exit Room:<Select
					onChange={this.ExitRoomChangeSelection.bind(this)}
					options={RoomOptions}/>
				</label>
			</div>
			{Exits}
		</div>;
	}

	GetCurrentExits(RoomOptions) {
		return this.state.RoomData.Exits.map(Exit => {
			return <div>
				Exit Text:<input type='text' value={Exit.Direction}/>
				Exit Hint:<input type='text' value={Exit.Direction}/>
				Two Way?:<input type='checkbox' value={Exit.Direction}/>
				<label>Exit Room:<Select
					onChange={this.ExitRoomChangeSelection.bind(this)}
					options={RoomOptions}/>
				</label>
			</div>
		});
	}

	ExitRoomChangeSelection(e) {
		console.log(this, e);
	}

	async UpdateRoom() {
		debugger;
		this.state.RoomDoc.set({})
	}
}
// export default connect(
//     ({ editor }) => ({ ...editor }),
//     dispatch => bindActionCreators({ ...editorActions }, dispatch)
//   )( editor );
