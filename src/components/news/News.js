import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { NewsItem } from './NewsItem';
import { colors } from '../../assets';
import { newsPropType } from '../../propTypes';

const propTypes = {
	navigation: PropTypes.object,
	newsItems: PropTypes.arrayOf(newsPropType),
	lang: PropTypes.string
};

class NewsScreen extends Component {
	renderItem = ({ item }) => <NewsItem item={item} onPress={this.onPress(item)} lang={this.props.lang} />;

	keyExtractor = (_, index) => index + '';

	renderSearchBar = () => <View style={styles.line} />;

	onPress = item => () => this.props.navigation.navigate('NewsPage', { item, lang: this.props.lang });

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.props.newsItems}
					renderItem={this.renderItem}
					keyExtractor={this.keyExtractor}
					ItemSeparatorComponent={this.renderSearchBar}
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
	line: {
		height: 0.5,
		backgroundColor: colors.grayUltraLight,
		marginLeft: 10,
		marginRight: 10
	}
});

const mapStateToProps = ({ news, settings }) => ({
	newsItems: news.newsItems,
	lang: settings.lang
});

export const News = connect(mapStateToProps)(NewsScreen);
