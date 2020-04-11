import {connect} from 'react-redux';

import Header from './header.component.js';

const mapStateToProps = (state) => {
	const {status} = state.sync;
	return {status};
}

export const header = connect(
	mapStateToProps,
	null
)(Header);