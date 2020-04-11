import {connect} from 'react-redux';

import Recent from './recent.component.js';

import backend from '../../util/backend.js';

import {constants} from '../../constants.js';
const {
	CHANGE_WORKOUT_DATE,
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
		data:state.view.data.slice(0,100)
	};
}

const mapDispatchToProps = (dispatch,ownProps) => {
	return {
		handleDateChange:async(workout,old,date) => {
			if(ownProps.sync) {
				backend({
					dispatch,
					cmd:void(0),
					data:ownProps.workouts
				});
			}
			
			dispatch({
				type:CHANGE_WORKOUT_DATE,
				workout,
				old,
				new:date
			});
		},
		handleSort:(key) => {
			dispatch({
				type:SORT_VIEW,
				key,
				shift:false
			});
		}
	};
}

export const recent = connect(
	mapStateToParentProps
)(connect(
	mapStateToProps,
	mapDispatchToProps
)(Recent));