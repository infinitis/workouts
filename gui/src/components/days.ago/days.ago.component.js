import style from './days.ago.css';

import {constants} from '../../constants.js';
const {DEFAULT_ATTRIBUTES_ORDER} = constants;

export default class DaysAgo extends React.Component {
	render() {
		const headers = DEFAULT_ATTRIBUTES_ORDER.map((x) => {
			return createElement("th",{key:"head-"+x},x);
		});
		const cells = DEFAULT_ATTRIBUTES_ORDER.map((x) => {
			const val = (this.props.daysAgo[x]<0)?"N/A":this.props.daysAgo[x];
			return createElement("td",{key:"row-"+x},val);
		});
		return createElement("div",{className:style.container},
			createElement("table",{className:style.table},
				createElement("thead",null,
					createElement("tr",null,
						createElement("th",null),
						headers
					)
				),
				createElement("tbody",null,
					createElement("tr",null,
						createElement("td",null,"Days Ago"),
						cells
					)
				)
			)
		);
	}
}