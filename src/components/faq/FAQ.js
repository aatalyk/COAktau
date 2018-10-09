import React, { Component } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { StackActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { colors, textStyles, settings } from '../../assets';
import { SearchBar } from '../common';
import { FAQitem } from './FAQitem';
import { fetchFAQRequested } from '../../actions';
import { faqPropType } from '../../propTypes';

const propTypes = {
	style: PropTypes.object,
	navigation: PropTypes.object,
	isPartiallyShown: PropTypes.bool,
	loading: PropTypes.bool,
	data: PropTypes.array,
	fetchFAQRequested: PropTypes.func,
	lang: PropTypes.string
};

class FAQScreen extends Component {
	state = {
		data: this.props.data
	};

	componentDidMount() {
		this.props.fetchFAQRequested();
		console.warn(this.props.data);
	}

	renderSeparator() {
		return <View style={styles.separator} />;
	}

	renderItem = ({ item, index }) => {
		return <FAQitem item={item} index={index} lang={this.props.lang} />;
	};

	keyExtractor = (_, index) => index + '';

	renderSearchBar = () =>
		this.props.isPartiallyShown ? (
			<Text style={styles.title}>{settings[this.props.lang].navigation.faq}</Text>
		) : (
			<SearchBar lang={this.props.lang} search={this.search} clear={this.clear} />
		);

	onShowMorePress = () => {
		const action = StackActions.push({
			routeName: 'FAQ'
		});
		this.props.navigation.dispatch(action);
	};

	search = text => {
		this.setState({
			data: this.filter(text)
		});
	};

	clear = () => {
		this.setState({
			data: this.props.data
		});
	};

	filter = text =>
		this.props.data.filter(item => {
			const question = item.question.toLowerCase();
			return question.indexOf(text.toLowerCase()) >= 0;
		});

	getPartialData = () => this.props.data.slice(0, 2);

	onRefresh = () => this.props.fetchFAQRequested();

	render() {
		const { isPartiallyShown, lang, loading, style } = this.props;
		const faqItems = isPartiallyShown ? this.getPartialData() : this.state.data;

		console.warn('faqItems', faqItems);

		return (
			<View style={[styles.container, style]}>
				<FlatList
					data={faqItems}
					renderItem={this.renderItem}
					keyExtractor={this.keyExtractor}
					ListHeaderComponent={this.renderSearchBar}
					ItemSeparatorComponent={this.renderSeparator}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={this.onRefresh} />}
				/>
				{isPartiallyShown && (
					<TouchableOpacity style={styles.showMoreButton} onPress={this.onShowMorePress}>
						<Text style={styles.showMoreText}>{settings[lang].buttons.showMore}</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	}
}

FAQScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	title: {
		...textStyles.p,
		marginLeft: 15,
		marginTop: 20,
		color: colors.grayLight
	},
	showMoreButton: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: 44
	},
	showMoreText: {
		marginRight: 15,
		...textStyles.p,
		color: colors.purple
	},
	separator: {
		backgroundColor: colors.grayUltraLight,
		height: 1
	}
});

const mapStateToProps = ({ faq, settings }) => ({
	loading: faq.loading,
	data: faq.data,
	lang: settings.lang
});

export const FAQ = connect(
	mapStateToProps,
	{ fetchFAQRequested }
)(FAQScreen);
