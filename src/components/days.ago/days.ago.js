import {connect} from 'react-redux';

import DaysAgo from './days.ago.component.js';

const mapStateToProps = (state) => {
	const {daysAgo} = state.view;
	return {
		daysAgo
	};
};

export const daysAgo = connect(
	mapStateToProps
)(DaysAgo);