import style from './manage.css';

import manageRow from '../manage.row/manage.row.js';

import {constants} from '../../constants.js';
const {DEFAULT_ATTRIBUTES_ORDER} = constants;

export default class Manage extends React.Component {
	constructor(props) {
		super(props);
		this.addNew = this.addNew.bind(this);
	}
	addNew() {
		this.props.newWorkout();
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
			return createElement("th",{key:"head-"+x},x);
		});
		const rows = Object.keys(workouts).map((i) => {
			return createElement(manageRow,{
				key:"row-"+i,
				data:workouts[i],
				complete:() => completeWorkout(i),
				description:(val) => changeDescription(i,val),
				name:(val) => changeName(i,val),
				toggle:(attr) => toggleAttribute(i,attr)
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