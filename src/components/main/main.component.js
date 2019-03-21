import style from './main.css';

import {daysAgo} from '../days.ago/days.ago.js';
import header from '../header/header.js';
import {manage} from '../manage/manage.js';
//import {recent} from '../recent/recent.js';
//(props.view=="manage")?createElement(manage,null):createElement(recent,null)

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.switchView = this.switchView.bind(this);
	}
	switchView(type) {
		this.props.switchView(type);
	}
	render() {
		const props = this.props;
		const otherView = (props.view=="manage")?"recent":"manage";
		return createElement("div",{className:style.container},
			createElement("div",{className:style.headerContainer},
				createElement(header,null)
			),
			createElement("div",{className:style.viewContainer},
				createElement(daysAgo,null),
				createElement("input",{type:"button",onClick:this.switchView.bind(this,otherView),value:otherView}),
				createElement(manage,null)
			)
		);
	}
}