import style from './recent.css';

import recentRow from '../recent.row/recent.row.js';

export default class Recent extends React.Component {
	constructor(props) {
		super(props);
		this.handleSort = this.handleSort.bind(this);
	}
	handleSort(key,event) {
		this.props.handleSort(key,event.shiftKey);
	}
	render() {
		const {data,handleDateChange,handleSort} = this.props;
		const headers = ["name","date"].map((x) => {
			return createElement("th",{key:"head-"+x,onClick:this.handleSort.bind(this,x)},x);
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