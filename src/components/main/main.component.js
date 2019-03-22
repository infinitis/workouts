import style from './main.css';

import {daysAgo} from '../days.ago/days.ago.js';
import header from '../header/header.js';
import {manage} from '../manage/manage.js';
import {recent} from '../recent/recent.js';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.save = this.save.bind(this);
		this.switchView = this.switchView.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	componentDidMount() {
		document.addEventListener('keydown',this.handleKeyPress);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown',this.handleKeyPress);
	}
	handleKeyPress(event) {
		if(event.ctrlKey) {
			if(event.key=="s") {
				this.save();
				event.preventDefault();
			}
		}
	}
	save() {
		const {workouts,save} = this.props;
		save(workouts);
	}
	switchView(type) {
		this.props.switchView(type);
	}
	render() {
		const {view} = this.props;
		const otherView = (view=="manage")?"recent":"manage";
		return createElement("div",{className:style.container},
			createElement("div",{className:style.headerContainer},
				createElement(header,null)
			),
			createElement("div",{className:style.viewContainer},
				createElement(daysAgo,null),
				createElement("input",{type:"button",onClick:this.switchView.bind(this,otherView),value:otherView}),
				createElement("input",{type:"button",onClick:this.save,value:"Save Workouts"}),
				(view=="manage")?createElement(manage,null):createElement(recent,null)
			)
		);
	}
}