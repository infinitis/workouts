import style from './recent.css';

import recentRow from '../recent.row/recent.row.js';

export default class Recent extends React.Component {
	render() {
		const {data,handleDateChange} = this.props;
		const headers = ["workout name","date"].map((x) => {
			return createElement("th",{key:"head-"+x},x);
		});
		const rows = data.map((i) => {
			return createElement(recentRow,{
				key:"row-"+i.name+"-"+i.date,
				name:i.name,
				date:i.date,
				dateChange:(old,date) => handleDateChange(i.name,old,date)
			});
		});
		return createElement("div",{className:style.container},
			createElement("table",{className:style.table},
				createElement("thead",null,
					createElement("tr",null,
						headers
					)
				),
				createElement("tbody",null,rows)
			)
		);
	}
}