const assert = require('assert');

const workout = require('../src/classes/workout.js').default;

const {constants} = require('../src/constants.js');
const {DEFAULT_ATTRIBUTES} = constants;

describe('workout object tests', () => {

	it('should successfully create', () => {
		assert.doesNotThrow(() => new workout());
	});

	it('should successfully add dates', () => {
		const obj = new workout();
		assert.throws(() => obj.add());
		assert.doesNotThrow(() => obj.add(['2020-07-01']));
	});

	it('should successfully output the last time the workout was completed',() => {
		const obj = new workout();
		assert.strictEqual(obj.last_done,"");
		obj.add(['2020-07-01']);
		assert.strictEqual(obj.last_done,'2020-07-01');
	});

	it('should successfully remove dates', () => {
		const obj = new workout();
		obj.add(['2020-07-01']);
		assert.deepStrictEqual(obj.dates,['2020-07-01']);
		obj.remove('2020-07-01');
		assert.deepStrictEqual(obj.dates,[]);
	});

	it('should successfully change the name', () => {
		const obj = new workout();
		assert.strictEqual(obj.name,'New Workout');
		assert.throws(() => { obj.name = 1; });
		assert.doesNotThrow(() => { obj.name = 'workout1'; });
		assert.strictEqual(obj.name,'workout1');
	});

	it('should successfully change an attribute', () => {
		const obj = new workout();
		assert.deepStrictEqual(obj.attributes,DEFAULT_ATTRIBUTES);
		assert.doesNotThrow(() => obj.toggleAttribute('lower'));
		assert.deepStrictEqual(obj.attributes,{...DEFAULT_ATTRIBUTES,lower:true});
	});

	it('should compare two objects appropriately', () => {
		const obj = new workout();
		const obj2 = new workout({
			attributes:{lower:true,upper:false},
			dates:['2020-07-01','2020-08-01'],
			name:'workout1'
		});
		const obj3 = new workout();
		const obj4 = new workout({
			attributes:{lower:true,upper:true},
			dates:['2020-07-01','2020-08-01'],
			name:'workout1'
		});
		const obj5 = new workout({
			attributes:{lower:true,upper:false},
			dates:['2020-07-01','2020-08-01', '2020-09-01'],
			name:'workout1'
		});
		const obj6 = new workout({
			attributes:{lower:true,upper:false},
			dates:['2020-07-01','2020-08-01'],
			name:'workout2'
		});

		assert.strictEqual(obj.equals(obj2),false);
		assert.strictEqual(obj.equals(obj3),true);
		assert.strictEqual(obj.equals(obj4),false);
		assert.strictEqual(obj.equals(obj5),false);
		assert.strictEqual(obj.equals(obj6),false);

		assert.strictEqual(obj2.equals(obj3),false);
		assert.strictEqual(obj2.equals(obj4),false);
		assert.strictEqual(obj2.equals(obj5),false);
		assert.strictEqual(obj2.equals(obj6),false);

		assert.strictEqual(obj3.equals(obj4),false);
		assert.strictEqual(obj3.equals(obj5),false);
		assert.strictEqual(obj3.equals(obj6),false);

		assert.strictEqual(obj4.equals(obj5),false);
		assert.strictEqual(obj4.equals(obj6),false);

		assert.strictEqual(obj5.equals(obj6),false);
	});
	
});	