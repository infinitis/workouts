import style from './recent.row.css';

export default class recentRow extends React.Component {
	constructor(props) {
		super(props);
		this.handleDateChange = this.handleDateChange.bind(this);
	}
	handleDateChange(event) {
		const {date,dateChange} = this.props;
		dateChange(date,event.target.value);
	}
	render() {
		const {name,date} = this.props;
		return createElement("tr",null,
			createElement("td",null,name),
			createElement("td",null,
				createElement("input",{defaultValue:date,onBlur:this.handleDateChange})
			)
		);
	}
}