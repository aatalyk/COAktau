import React, { Component } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchNewsRequested } from '../../actions';
import { NewsItem } from './NewsItem';
import { colors } from '../../assets';
import { newsPropType } from '../../propTypes';

const propTypes = {
	navigation: PropTypes.object,
	loading: PropTypes.bool,
	newsItems: PropTypes.arrayOf(newsPropType),
	fetchNewsRequested: PropTypes.func,
	lang: PropTypes.string
};

class NewsScreen extends Component {
	renderItem = ({ item }) => <NewsItem item={item} onPress={this.onPress(item)} lang={this.props.lang} />;

	keyExtractor = (_, index) => index + '';

	renderSeparator = () => <View style={styles.separator} />;

	onPress = item => () => this.props.navigation.navigate('NewsPage', { item, lang: this.props.lang });

	onRefresh = () => this.props.fetchNewsRequested();

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.props.newsItems}
					renderItem={this.renderItem}
					keyExtractor={this.keyExtractor}
					ItemSeparatorComponent={this.renderSeparator}
					refreshControl={<RefreshControl refreshing={this.props.loading} onRefresh={this.onRefresh} />}
				/>
			</View>
		);
	}
}

NewsScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	separator: {
		height: 0.5,
		backgroundColor: colors.grayUltraLight,
		marginLeft: 10,
		marginRight: 10
	}
});

const mapStateToProps = ({ news, settings }) => ({
	newsItems: news.newsItems,
	loading: news.loading,
	lang: settings.lang
});

export const News = connect(
	mapStateToProps,
	{ fetchNewsRequested }
)(NewsScreen);
