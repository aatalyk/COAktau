import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Calculator } from './Calculator';
import { FAQItem } from './FAQItem';

const propTypes = {
	navigation: PropTypes.object,
	lang: PropTypes.string
};

class Calc extends Component {
	renderItem = ({ item }) => <FAQItem item={item} />;

	render() {
		const { faq, livingCost, povertyMin } = this.props.navigation.getParam('item', {});
		return (
			<View style={styles.container}>
				<Calculator
					lang={this.props.lang}
					navigation={this.props.navigation}
					livingCost={livingCost}
					povertyMin={povertyMin}
				/>
				<FlatList data={faq} renderItem={this.renderItem} keyExtractor={(_, index) => index + ''} />
			</View>
		);
	}
}

Calc.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	}
});

const mapStateToProps = ({ settings }) => ({
	lang: settings.lang
});

export const CalcScreen = connect(mapStateToProps)(Calc);
