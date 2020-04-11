import {constants} from '../constants.js';
const {DEFAULT_ATTRIBUTES} = constants;

export default class workout {
	constructor(toClone) {
		if((toClone !== void(0))&&(toClone instanceof workout)) {
			this.attributes = {...toClone.attributes};
			this.dates = [...toClone.dates];
			this.name = toClone.name;
		} else {
			this.attributes = {...DEFAULT_ATTRIBUTES};
			this.dates = [];
			this.name = "New Workout";
			if(typeof toClone == "object") {
				if(toClone.attributes !== void(0)) {
					for(let i in toClone.attributes) {
						if(toClone.attributes[i] === true) {
							this.toggleAttribute(i);
						}
					}
				}
				if(toClone.dates !== void(0)) {
					for(let date of toClone.dates) {
						this.add(date);
					}
				}
				if(toClone.name !== void(0)) {
					this.name = toClone.name;
				}
			}
		}
	}
	add(date) {
		date = Date.parse(date);
		if(isNaN(date)) {
			throw new TypeError('expects parameter `date` to be a date');
		}
		this._dates.push(new Date(date).toISOString().split("T")[0]);
		this.normalize();
	}
	get dates() {
		return this._dates;
	}
	set dates(dates) {
		if(!(dates instanceof Array)) {
			throw new TypeError('expects parameter `dates` to be an array of dates');
		}
		dates = dates.map((date) => Date.parse(date));
		if(!(dates.every((x) => !isNaN(x)))) {
			throw new TypeError('expects parameter `dates` to be an array of dates');
		}
		
		this._dates = dates;
		this.normalize();
	}
	equals(compare) {
		if((compare === void(0)) || (!(compare instanceof workout))) { return false; }

		if(this.name !== compare.name) { return false; }
		
		if(Object.keys(this.attributes).length!==Object.keys(compare.attributes).length) { return false; }
		for(let i in this.attributes) {
			if(this.attributes[i]!==compare.attributes[i]) { return false; }
		}

		if(this.dates.length!==compare.dates.length) { return false; }
		for(let i in this.dates) {
			if(this.dates[i] !== compare.dates[i]) { return false; }
		}

		return true;
	}
	get last_done() {
		let res = this._dates.slice(0,1);
		return (res.length==0)?"":res[0];
	}
	get name() {
		return this._name;
	}
	set name(name) {
		if(typeof name != "string") {
			throw new TypeError('Workout::setName(name) expects parameter `name` to be a string');
		}
		this._name = name;
	}
	normalize() {
		this._dates = [...new Set([...this._dates])];
		this._dates.sort((a,b) => { return a<b; });
	}
	remove(date) {
		for(let i=0;i<this._dates.length;i++) {
			if(this._dates[i]===date) {
				this._dates.splice(i,1);
			}
		}
	}
	get times_done() {
		return this._dates.length;
	}
	toggleAttribute(attr) {
		if(this.attributes[attr] === void(0)) {
			throw new TypeError('Workout::toggleAttribute(attr) expects parameter `attr` to be a valid attribute');
		}
		this.attributes[attr] = !this.attributes[attr];
	}
}