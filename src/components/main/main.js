import style from './main.css';

import {daysAgo} from '../days.ago/days.ago.js';
import {header} from '../header/header.js';
import {manage} from '../manage/manage.js';
import {recent} from '../recent/recent.js';

export default class main extends React.component {
	render() {
		const props = this.props;
		return createElement("div",{className:style.container},
			createElement(header,null),
			createElement(daysAgo,null),
			(props.view=="manage")?createElement(manage,null):createElement(recent,null)
		);
	}
}