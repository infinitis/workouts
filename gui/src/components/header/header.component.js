import style from './header.css';

import {constants} from '../../constants.js';
const {
	SYNC_STATUS
} = constants;

const {
	STATUS_UNSYNCED,
	STATUS_DESYNCED,
	STATUS_SYNCED
} = SYNC_STATUS;

export default class Header extends React.Component {
	render() {
		const {status} = this.props;
		const color = (status===STATUS_UNSYNCED)?"":(status===STATUS_SYNCED)?style.green:style.red;
		return createElement("div",{className:style.container},
			createElement("h2",{className:style.h2},"Workouts"),
			createElement("span",{className:style.span+` ${color}`},status)
		);
	}
}