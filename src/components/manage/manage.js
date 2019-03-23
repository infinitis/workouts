import {connect} from 'react-redux';

import Manage from './manage.component.js';

import {constants} from '../../constants.js';
const {ADD_WORKOUT,CHANGE_ATTRIBUTE,CHANGE_WORKOUT_DESCRIPTION,CHANGE_WORKOUT_NAME,NEW_WORKOUT,SORT_VIEW} = constants;

const mapStateToProps = (state) => {
	const {workouts} = state;
	return {
		workouts
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeDescription:(name,val) => {
			dispatch({
				type:CHANGE_WORKOUT_DESCRIPTION,
				workout:name,
				description:val
			});
		},
		changeName:(name,val) => {
			dispatch({
				type:CHANGE_WORKOUT_NAME,
				workout:name,
				name:val
			});
		},
		completeWorkout:(workout) => {
			const now = new Date();
			dispatch({
				type:ADD_WORKOUT,
				name:workout,
				toAdd:[new Date(now.getTime() - (now.getTimezoneOffset() * 60000 ))
					.toISOString()
					.split("T")[0]
				]
            });
        },
		newWorkout:() => {
			dispatch({
				type:NEW_WORKOUT
			});
		},
		sort:(key,shift) => {
			dispatch({
				type:SORT_VIEW,
				key,
				shift
			});
		},
		toggleAttribute:(name,attr) => {
			dispatch({
				type:CHANGE_ATTRIBUTE,
				workout:name,
				attribute:attr
			});
		}
	}
};

export const manage = connect(
	mapStateToProps,
	mapDispatchToProps
)(Manage);