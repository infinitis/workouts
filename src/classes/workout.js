export default class workout {
	constructor() {
		this.attributes = {
			lower:false,
			core:false,
			back:false,
			upper:false,
			cardio:false,
			martial:false,
			other:false
		};
		this.datesDone = [];
		this.name = "New workout";
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
	export() {

	}
	setName(name) {
		if(typeof name != "string") {
			throw new TypeErorr('Workout::setName(name) expects parameter `name` to be a string');
		}
	}
	toggleAttribute(attr) {
		if(this.attributes[attr] == void(0)) {
			throw new TypeError('Workout::toggleAttribute(attr) expects parameter `attr` to be a valid attribute');
		}
		this.attributes[attr] = !this.attributes[attr];
	}
}