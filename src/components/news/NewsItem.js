import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
	item: PropTypes.object
};

export const NewsItem = ({ item }) => (
	<View style={styles.container}>
		<Text>{item.title}</Text>
		<Image source={item.imgSource} style={styles.image} />
	</View>
);

NewsItem.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row'
	},
	text: {
		flex: 1,
		fontSize: 18
	},
	image: {
		width: 50,
		height: 50
	}
});
