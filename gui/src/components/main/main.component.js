import style from './main.css';

import {daysAgo} from '../days.ago/days.ago.js';
import {header} from '../header/header.js';
import {manage} from '../manage/manage.js';
import {recent} from '../recent/recent.js';

import workout from '../../classes/workout.js';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.load = this.load.bind(this);
		this.save = this.save.bind(this);
		this.switchView = this.switchView.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	componentDidMount() {
		document.addEventListener('keydown',this.handleKeyPress);
		this.switchView("manage");
	}
	componentWillUnmount() {
		document.removeEventListener('keydown',this.handleKeyPress);
	}
	handleKeyPress(event) {
		if(event.ctrlKey) {
			if(event.key==="s") {
				this.save();
				event.preventDefault();
			} else if(event.key==="o") {
				this.load();
				event.preventDefault();
			}
		}
	}
	save(data) {
		const {workouts} = this.props;
		const saveFormat = {};
		for(let i of Object.keys(workouts)) {
			saveFormat[i] = {
				attributes:workouts[i].attributes,
				dates:workouts[i].dates,
				name:workouts[i].name
			};
		}
		const content = JSON.stringify(saveFormat);
		var a = document.createElement('a');
	    var blob = new Blob([content], {'type':'application/octet-stream'});
	    a.href = window.URL.createObjectURL(blob);
	    a.download = 'workouts.json';
	    document.body.appendChild(a);
	    a.click();
	    setTimeout(() => {
	    	document.body.removeChild(a);
	    	window.URL.revokeObjectURL(blob);
	    }, 0);
	}
	async load(data) {
		const {importWorkouts,view} = this.props;
		var file = document.createElement('input');
		file.type = "file";
		file.style.display = "none";

		try {
			const workouts = await new Promise((resolve,reject) => {
				const reader = new FileReader();
				
				file.onchange = (input) => {
					const reader = new FileReader();
					reader.readAsText(input.target.files[0]);
					reader.onload = () => {
						const workouts = JSON.parse(reader.result);
						for(let i in workouts) {
							workouts[i] = new workout(workouts[i]);
						}
						resolve(workouts);
					};

					reader.onerror = () => {
						reject(reader.error);
					};
				};

				document.body.appendChild(file);
				file.click();
			});
			
			importWorkouts(workouts);
		} catch(err) {
			throw err;
		}
		document.body.removeChild(file);
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
				createElement("div",{className:style.subHeaderContainer},
					createElement(daysAgo,null),
					createElement("input",{type:"button",onClick:this.switchView.bind(this,otherView),value:otherView}),
					createElement("input",{type:"button",onClick:this.save,value:"Save Workouts"})
				),
				(view==="manage")?createElement(manage,null):createElement(recent,null)
			)
		);
	}
}