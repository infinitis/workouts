import {connect} from 'react-redux';

import Recent from './recent.component.js';

import {constants} from '../../constants.js';
const {CHANGE_WORKOUT_DATE,SORT_VIEW} = constants;

const mapStateToProps = (state) => {
	return {
		data:state.view.data.slice(0,100)
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleDateChange:(workout,old,date) => {
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
	mapStateToProps,
	mapDispatchToProps
)(Recent);