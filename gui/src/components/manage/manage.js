import {connect} from 'react-redux';

import Manage from './manage.component.js';

import backend from '../../util/backend.js';

import {constants} from '../../constants.js';
const {
	ADD_WORKOUT,
	CHANGE_ATTRIBUTE,
	CHANGE_WORKOUT_DESCRIPTION,
	CHANGE_WORKOUT_NAME,
	CHANGE_VIEW,
	NEW_WORKOUT,
	SORT_VIEW,
	SYNC_STATUS
} = constants;


const mapStateToParentProps = (state) => {
	const {workouts} = state;
	const {status} = state.sync;
	return {
		workouts,
		sync:(status!==SYNC_STATUS.STATUS_DESYNCED)
	};
}

const mapStateToProps = (state) => {
	return {
		workouts:state.view.data
	};
};

const mapDispatchToProps = (dispatch,ownProps) => {
	return {
		changeName:async(name,val) => {
			if(ownProps.sync) {
				backend({
					dispatch,
					cmd:void(0),
					data:ownProps.workouts
				});
			}

			dispatch({
				type:CHANGE_WORKOUT_NAME,
				workout:name,
				name:val
			});
		},
		completeWorkout:async(workout) => {
			const now = new Date();
			const today = new Date(now.getTime() - (now.getTimezoneOffset() * 60000 ))
				.toISOString().
				split("T")[0];
			
			if(ownProps.sync) {
				backend({
					dispatch,
					cmd:`add\n${workout}\n${today}`,
					data:ownProps.workouts
				});
			}

			dispatch({
				type:ADD_WORKOUT,
				name:workout,
				toAdd:[today]
            });

            dispatch({
				type:CHANGE_VIEW,
				view:"manage",
				workouts:ownProps.workouts
			});

			dispatch({
				type:SORT_VIEW,
				key:"last_done",
				order:"asc",
				shift:false
			});
        },
		newWorkout:async() => {
			if(ownProps.sync) {
				backend({
					dispatch,
					cmd:`new\nNew Workout`,
					data:ownProps.workouts
				});
			}

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
		toggleAttribute:async(name,attr) => {
			if(ownProps.sync) {
				backend({
					dispatch,
					cmd:`toggle\n${name}\n${attr}`,
					data:ownProps.workouts
				});
			}

			dispatch({
				type:CHANGE_ATTRIBUTE,
				workout:name,
				attribute:attr
			});
			dispatch({
				type:CHANGE_VIEW,
				view:"manage",
				workouts:ownProps.workouts
			});
			dispatch({
				type:SORT_VIEW,
				key:"last_done",
				order:"asc",
				shift:false
			});
		}
	}
};

export const manage = connect(
	mapStateToParentProps
)(connect(
	mapStateToProps,
	mapDispatchToProps
)(Manage));