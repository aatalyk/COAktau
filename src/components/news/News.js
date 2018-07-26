import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { NewsItem } from './NewsItem';
import { images } from '../../assets';

const mockNews = [
	{
		title: 'Build a diverse portfolio of early-stage startup investments ',
		image: images.search
	},
	{
		title: 'Build a diverse portfolio of early-stage startup investments ',
		image: images.search
	}
];

class News extends Component {
	renderItem = ({ item }) => <NewsItem item={item} />;

	keyExtractor = (_, index) => index + '';

	render() {
		return (
			<View style={styles.container}>
				<FlatList data={mockNews} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export { News };
