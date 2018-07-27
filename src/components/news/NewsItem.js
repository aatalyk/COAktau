import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { fonts } from '../../assets';

const propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func
};

export const NewsItem = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={styles.container}>
			<Text style={styles.title}>{item.title}</Text>
			<Image source={item.imgSource} style={styles.image} />
		</View>
	</TouchableOpacity>
);

NewsItem.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'white',
		alignItems: 'center',
		margin: 10
	},
	title: {
		flex: 1,
		fontSize: 16,
		fontFamily: fonts.MerriweatherRegular
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 5,
		marginLeft: 5
	}
});
