import style from './header.css';

export default class header extends React.Component {
	render() {
		return createElement("div",{className:style.container},
			createElement("h2",{className:style.h2},"Workouts")
		);
	}
}