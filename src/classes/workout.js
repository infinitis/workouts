import {constants} from '../constants.js';
const {DEFAULT_ATTRIBUTES} = constants;

export default class workout {
	constructor() {
		this.attributes = {...DEFAULT_ATTRIBUTES};
		this.datesDone = [];
		this.name = "New Workout";
		this.description = "";
	}
	add(dates) { // add new workout to 
		if(!(dates instanceof Array)) {
			throw new TypeError('Workout::add(dates) expects parameter `dates` to be an array of dates');
		}
		dates = dates.map((date) => Date.parse(date));
		if(!(dates.every((x) => !isNaN(x)))) {
			throw new TypeError('Workout::add(dates) expects parameter `dates` to be an array of dates');
		}
		this.datesDone = [
			...new Set([
				...this.datesDone,
				...dates.map((date) => {
					date = Date.parse(date);
					return new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
                })
			])
		];
		this.datesDone.sort();
	}
	changeDescription(str) {
		if(typeof str != "string") {
			throw new TypeError('Workout::changeDescription(str) expects parameter `str` to be a string');
		}
		this.description = str;
	}
	export() {
		throw new Error("Not implemented");
	}
	get last_done() {
		throw new Error('Not implemented');
	}
	remove(date) {
		throw new Error("Not implemented");
	}
	setName(name) {
		if(typeof name != "string") {
			throw new TypeError('Workout::setName(name) expects parameter `name` to be a string');
		}
		this.name = name;
	}
	toggleAttribute(attr) {
		if(this.attributes[attr] === void(0)) {
			throw new TypeError('Workout::toggleAttribute(attr) expects parameter `attr` to be a valid attribute');
		}
		this.attributes[attr] = !this.attributes[attr];
	}
}