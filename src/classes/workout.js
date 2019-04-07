import {constants} from '../constants.js';
const {DEFAULT_ATTRIBUTES} = constants;

export default class workout {
	constructor(toClone) {
		if((toClone !== void(0))&&(toClone instanceof workout)) {
			this.attributes = {...toClone.attributes};
			this.datesDone = [...toClone.datesDone];
			this.name = toClone.name;
			this.description = toClone.description;
		} else {
			this.attributes = {...DEFAULT_ATTRIBUTES};
			this.datesDone = [];
			this.name = "New Workout";
			this.description = "";
			if(typeof toClone == "object") {
				if(toClone.attributes !== void(0)) {
					for(let i in toClone.attributes) {
						if(toClone.attributes[i] === true) {
							try {
								this.toggleAttribute(i);
							} catch(err) {

							}
						}
					}
				}
				if(toClone.datesDone !== void(0)) {
					try {
						this.add(toClone.datesDone);
					} catch(err) {

					}
				}
				if(toClone.name !== void(0)) {
					try {
						this.setName(toClone.name);
					} catch(err) {

					}
				}
				if(toClone.description !== void(0)) {
					try {
						this.changeDescription(toClone.description);
					} catch(err) {

					}
				}
			}
		}
	}
	add(dates) { // add new workout to datesDone
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
					return new Date(date)
                    .toISOString()
                    .split("T")[0];
                })
			])
		];
		this.datesDone.sort((a,b) => {
			return a<b;
		});
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
		let res = this.datesDone.slice(0,1);
		if(res.length==0) {
			return "";
		} else {
			return res[0];
		}
	}
	remove(date) {
		for(let i=0;i<this.datesDone.length;i++) {
			if(this.datesDone[i]==date) {
				this.datesDone.splice(i,1);
			}
		}
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