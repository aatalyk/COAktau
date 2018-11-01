import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList, Communications } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PlaceHolder, FAQItem, ContactItem } from '../common';
import { fetchTaxiParamsRequested, fetchTaxiFaqRequested } from '../../actions';
import { images, textStyles } from '../../assets';

const propTypes = {
	navigation: PropTypes.object,
	lang: PropTypes.string,
	loading: PropTypes.bool,
	params: PropTypes.object,
	faq: PropTypes.array,
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

	call = phone => Communications.phonecall(phone, true);

	render() {
		const { loading, faq, params, navigation, lang } = this.props;
		console.warn('params', params.tels);
		return loading ? (
			<View style={styles.placeHolderContainer}>
				<PlaceHolder />
			</View>
		) : (
			<ScrollView style={styles.container} onScroll={this.onScroll}>
				<Text style={styles.text}>{params.title}</Text>
				{params.tels.map((tel, i) => (
					<ContactItem key={i} title={tel} onPress={() => this.call(tel)} />
				))}
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
	text: {
		...textStyles.h2,
		marginHorizontal: 10
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
