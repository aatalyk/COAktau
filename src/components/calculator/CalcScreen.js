import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Calculator } from './Calculator';
import { FAQItem } from './FAQItem';

const propTypes = {
	navigation: PropTypes.object,
	lang: PropTypes.object
};

class Calc extends Component {
	renderItem = ({ item, index }) => <FAQItem item={item} />;

	render() {
		const faq = this.props.navigation.getParam('faq', {});
		console.warn(faq);
		return (
			<View style={styles.container}>
				<Calculator lang={this.props.lang} />
				<FlatList data={faq} renderItem={this.renderItem} />
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
