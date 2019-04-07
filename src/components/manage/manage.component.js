import style from './manage.css';

import manageRow from '../manage.row/manage.row.js';

import {constants} from '../../constants.js';
const {DEFAULT_ATTRIBUTES_ORDER} = constants;

export default class Manage extends React.Component {
	constructor(props) {
		super(props);
		this.addNew = this.addNew.bind(this);
		this.handleSort = this.handleSort.bind(this);
	}
	addNew() {
		this.props.newWorkout();
	}
	handleSort(key,event) {
		this.props.sort(key,event.shiftKey);
	}
	render() {
		const {
			workouts,
			changeDescription,
			changeName,
			completeWorkout,
			toggleAttribute
		} = this.props;
		const headers = [
			"workout name",
			...DEFAULT_ATTRIBUTES_ORDER,
			"times done",
			"last done",
			"description",
			""
		].map((x) => {
			return createElement("th",{key:"head-"+x,onClick:this.handleSort.bind(this,x)},x);
		});
		const rows = workouts.map((i) => {
			return createElement(manageRow,{
				key:"row-"+i.name,
				data:i,
				complete:() => completeWorkout(i.name),
				description:(val) => changeDescription(i.name,val),
				name:(val) => changeName(i.name,val),
				toggle:(attr) => toggleAttribute(i.name,attr)
			});
		});
		return createElement("div",{className:style.container},
			createElement("input",{type:"button",value:"Add New Workout",onClick:this.addNew}),
			createElement("table",{className:style.table},
				createElement("thead",null,
					createElement("tr",null,
						headers
					)
				),
				createElement("tbody",null,
					rows
				)
			)
		);
	}
}