import {connect} from 'react-redux';

import Recent from './recent.component.js';

import {constants} from '../../constants.js';
const {CHANGE_WORKOUT_DATE} = constants;

const mapStateToProps = (state) => {
	return {
		data:state.view.data
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
		}
	};
}

export const recent = connect(
	mapStateToProps,
	mapDispatchToProps
)(Recent);