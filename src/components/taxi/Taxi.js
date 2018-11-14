import React, { Component } from 'react';
import { View, Text, ScrollView, Platform, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Communications from 'react-native-communications';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PlaceHolder, FAQItem, ContactItem } from '../common';
import { AutoPagingFlatList } from '../home/AutoPagingFlatList';
import { fetchTaxiParamsRequested, fetchTaxiFaqRequested } from '../../actions';
import { images, textStyles, colors, settings } from '../../assets';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
		return loading ? (
			<View style={styles.placeHolderContainer}>
				<PlaceHolder />
			</View>
		) : (
			<View style={styles.container}>
				<ScrollView style={styles.container} onScroll={this.onScroll}>
					<AutoPagingFlatList
						data={params.imageUrls.map(imageUrl => ({ icon: imageUrl }))}
						onItemPress={() => null}
						manualPaging
						loadFinish={this.loadFinish}
					/>
					<FlatList data={faq} renderItem={this.renderItem} keyExtractor={(_, index) => index + ''} />
				</ScrollView>
				<TouchableOpacity onPress={() => this.call(params.tels[0])}>
					<View style={[styles.buttonContainer, { backgroundColor: colors.soBlue }]}>
						<Text style={styles.buttonText}>{settings[lang].text.call}</Text>
					</View>
				</TouchableOpacity>
			</View>
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
	buttonText: {
		...textStyles.p,
		color: 'white'
	},
	buttonContainer: {
		backgroundColor: colors.orange,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center'
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
