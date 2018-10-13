import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { textStyles, images, colors } from '../../assets';
import { newsPropType } from '../../propTypes';
import { getFormattedDate } from '../common';

const propTypes = {
	item: newsPropType,
	onPress: PropTypes.func,
	lang: PropTypes.string
};

export const NewsItem = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={textStyles.p}>{item.title}</Text>
				<Text style={styles.date}>{getFormattedDate(item.createdAt)}</Text>
			</View>
			<Image defaultSource={images.imgPlaceholder} source={{ uri: item.icon }} style={styles.image} />
		</View>
	</TouchableOpacity>
);

NewsItem.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'white',
		margin: 10
	},
	textContainer: {
		flex: 1,
		marginHorizontal: 10,
		marginBottom: 15,
		marginTop: 10
	},
	date: {
		...textStyles.p,
		marginTop: 5,
		fontSize: 12,
		color: colors.grayLight,
		textAlign: 'left'
	},
	image: {
		resizeMode: 'contain',
		width: 100,
		height: 100,
		borderRadius: 5,
		marginLeft: 5
	}
});
