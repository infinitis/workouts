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
			"done"
		].map((field) => {
			if(field=="done") {
				return createElement("td",{key:"cell-"+field},
					createElement("input",{type:"button",value:"Completed",onClick:this.completeWorkout})
				);
			} else if(field=="name") {
				return createElement("td",{key:"cell-"+field},
					createElement("input",{defaultValue:data[field],onBlur:this.changeName})
				);
			} else if((field=="times_done")||(field=="last_done")) {
				return createElement("td",{key:"cell-"+field},data[field]);
			} else {
				return createElement("td",{key:"cell-attr-"+field,onClick:this.toggleAttribute.bind(this,field)},
					(data[field])?"Yes":"No"
				);
			}
		});
		return createElement("tr",null,
			cells
		);
	}
}