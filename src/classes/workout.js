import {constants} from '../constants.js';
const {DEFAULT_ATTRIBUTES} = constants;

export default class workout {
	constructor(toClone) {
		if(toClone === void(0)) {
			this.attributes = {...DEFAULT_ATTRIBUTES};
			this.datesDone = [];
			this.name = "New Workout";
			this.description = "";
		} else {
			this.attributes = {...toClone.attributes};
			this.datesDone = [...toClone.datesDone];
			this.name = toClone.name;
			this.description = toClone.description;
		}
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
		return this.datesDone.slice(0,1);
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
	get times_done() {
		return this.datesDone.length;
	}
	toggleAttribute(attr) {
		if(this.attributes[attr] === void(0)) {
			throw new TypeError('Workout::toggleAttribute(attr) expects parameter `attr` to be a valid attribute');
		}
		this.attributes[attr] = !this.attributes[attr];
	}
}