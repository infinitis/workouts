import style from './manage.row.css';

import {constants} from '../../constants.js';
const {DEFAULT_ATTRIBUTES_ORDER} = constants;

export default class manageRow extends React.Component {
	constructor(props) {
		super(props);
		this.changeDescription = this.changeDescription.bind(this);
		this.changeName = this.changeName.bind(this);
		this.completeWorkout = this.completeWorkout.bind(this);
		this.toggleAttribute = this.toggleAttribute.bind(this);
	}
	changeDescription(event) {
		this.props.description(event.target.value);
	}
	changeName(event) {
		this.props.name(event.target.value);
	}
	completeWorkout() {
		this.props.complete();
	}
	toggleAttribute(attr) {
		this.props.toggle(attr);
	}
	render() {
		const {data} = this.props;
		const cells = [
			"name",
			...DEFAULT_ATTRIBUTES_ORDER,
			"times_done",
			"last_done",
			"description",
			"done"
		].map((field) => {
			let val;
			if(field=="done") {
				return createElement("td",{key:"cell-"+field},
					createElement("input",{type:"button",value:"Completed",onClick:this.completeWorkout})
				);
			} else if(data[field] === void(0)) {
				return createElement("td",{key:"cell-attr-"+field,onClick:this.toggleAttribute.bind(this,field)},
					(data.attributes[field])?"Yes":"No"
				);
			} else if(field=="name") {
				return createElement("td",{key:"cell-"+field},
					createElement("input",{defaultValue:data[field],onBlur:this.changeName})
				);
			} else if(field=="description") {
				return createElement("td",{key:"cell-"+field},
					createElement("textarea",{value:data[field],onChange:this.changeDescription})
				);
			} else {
				return createElement("td",{key:"cell-"+field},val);
			}
		});
		return createElement("tr",null,
			cells
		);
	}
}