import React from 'react';
import { View, Text, Image, StyleSheet, WebView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { textStyles, images, colors } from '../../assets';
import { newsPropType } from '../../propTypes';
import { getFormattedDate } from '../common';

const propTypes = {
	item: newsPropType,
	onPress: PropTypes.func,
	lang: PropTypes.string
};

function extractContent(text) {
	const regex = /(<([^>]+)>)/gi;
	const result = text.replace(regex, '');
	return result;
}

export const NewsItem = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={styles.container}>
			<Image defaultSource={images.imgPlaceholder} source={{ uri: item.thumbnail }} style={styles.image} />
			<View style={styles.textContainer}>
				<Text style={textStyles.p}>{item.title}</Text>
				<Text numberOfLines={3} style={styles.text}>
					{extractContent(item.text)}
				</Text>
				<Text numberOfLines={2} style={styles.date}>
					{getFormattedDate(item.createdAt)}
				</Text>
			</View>
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
		marginBottom: 15
	},
	text: {
		...textStyles.p,
		marginTop: 10,
		color: colors.grayLight,
		textAlign: 'left'
	},
	date: {
		...textStyles.p,
		marginTop: 10,
		fontSize: 12,
		color: colors.grayLight,
		textAlign: 'left'
	},
	image: {
		resizeMode: 'cover',
		width: 80,
		height: 80,
		borderRadius: 10,
		marginLeft: 5
	}
});
