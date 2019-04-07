import {connect} from 'react-redux';

import Main from './main.component.js';

import {constants} from '../../constants.js';
const {CHANGE_VIEW,SORT_VIEW} = constants;

const mapStateToParentProps = (state) => {
	const {workouts} = state;
	return {
		workouts
	};
}

const mapStateToProps = (state) => {
	const {view} = state.view;
	return {
		view
	};
};

const mapDispatchToProps = (dispatch,ownProps) => {
	return {
		switchView:(view) => {
			dispatch({
				type:CHANGE_VIEW,
				workouts:ownProps.workouts,
				view
			});
			dispatch({
				type:SORT_VIEW,
				key:(view=="manage")?"last_done":"date",
				shift:false
			});
		}
	};
};


export const main = connect(
	mapStateToParentProps
)(connect(
	mapStateToProps,
	mapDispatchToProps
)(Main));