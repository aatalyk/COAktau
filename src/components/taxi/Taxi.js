import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PlaceHolder, FAQItem } from '../common';
import { fetchTaxiParamsRequested, fetchTaxiFaqRequested } from '../../actions';
import { images } from '../../assets';

const propTypes = {
	navigation: PropTypes.object,
	lang: PropTypes.string,
	loading: PropTypes.bool,
	fetchTaxiParamsRequested: PropTypes.func,
	fetchTaxiFaqRequested: PropTypes.func
};

class TaxiScreen extends Component {
	componentDidMount() {
		this.fetchParamsFAQ();
	}

	renderItem = ({ item, index }) => <FAQItem item={item} index={index} />;

	fetchParamsFAQ = () => {
		this.props.fetchTaxiParamsRequested();
		this.props.fetchTaxiFaqRequested();
	};

	render() {
		const { loading, faq, params, navigation, lang } = this.props;
		return loading ? (
			<View style={styles.placeHolderContainer}>
				<PlaceHolder />
			</View>
		) : (
			<ScrollView style={styles.container} onScroll={this.onScroll}>
				<View style={styles.titleContainer}>
					<Image source={images.search} />
					<Text>Title</Text>
				</View>
				<Text>Description</Text>
				<FlatList data={faq} renderItem={this.renderItem} keyExtractor={(_, index) => index + ''} />
			</ScrollView>
		);
	}
}

TaxiScreen.propTypes = propTypes;

const styles = {
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	placeHolderContainer: {
		flex: 1,
		backgroundColor: 'white'
	},
	titleContainer: {
		flex: 1,
		flexDirection: 'row'
	}
};

const mapStateToProps = ({ settings, taxi }) => ({
	lang: settings.lang,
	loading: taxi.loading,
	params: taxi.params,
	faq: taxi.faq
});

export const Taxi = connect(
	mapStateToProps,
	{ fetchTaxiParamsRequested, fetchTaxiFaqRequested }
)(TaxiScreen);
