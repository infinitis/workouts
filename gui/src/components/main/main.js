import {connect} from 'react-redux';

import Main from './main.component.js';

import workout from '../../classes/workout.js';

import {constants} from '../../constants.js';
const {
	CHANGE_VIEW,
	NEW_WORKOUT,
	SORT_VIEW
} = constants;

const mapStateToParentProps = (state) => {
	const {workouts} = state;
	const {view} = state.view;
	return {
		view,
		workouts
	};
}

const mapStateToProps = (state) => {
	const {view} = state.view;
	return {
		view
	};
};

const switchViewHelper = (dispatch,view,workouts) => {
	dispatch({
		type:CHANGE_VIEW,
		workouts,
		view
	});
	dispatch({
		type:SORT_VIEW,
		key:(view==="manage")?"last_done":"date",
		order:(view==="manage")?"asc":"desc",
		shift:false
	});
};

const mapDispatchToProps = (dispatch,ownProps) => {
	return {
		importWorkouts:(workouts) => {
			for(let i in workouts) {
				dispatch({
					type:NEW_WORKOUT,
					toAdd:workouts[i]
				});
			}
			switchViewHelper(dispatch,ownProps.view,workouts);
		},
		switchView:(view) => switchViewHelper(dispatch,view,ownProps.workouts)
	};
};


export const main = connect(
	mapStateToParentProps
)(connect(
	mapStateToProps,
	mapDispatchToProps
)(Main));