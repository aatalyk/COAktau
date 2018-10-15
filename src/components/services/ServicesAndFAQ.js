import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { ServicesList } from './';
import { colors } from '../../assets';
import { FAQ } from '../../components/faq/FAQ';

const propTypes = {
	navigation: PropTypes.object
};

class ServicesAndFAQ extends Component {
	render() {
		return (
			<ScrollView style={styles.container}>
				<ServicesList style={styles.servicesList} navigation={this.props.navigation} isPartiallyShown />
				<FAQ style={styles.faq} navigation={this.props.navigation} isPartiallyShown />
			</ScrollView>
		);
	}
}

ServicesAndFAQ.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.soLightBlue
	},
	servicesList: {
		marginTop: 20
	},
	faq: {
		marginVertical: 20
	}
});

export { ServicesAndFAQ };
