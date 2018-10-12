import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { textStyles, images, colors } from '../assets';
import { ScaledImage } from '../components/common';

const propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func,
	lang: PropTypes.string
};

export const MyCityItem = ({ item, onPress, lang }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={styles.container}>
			<ScaledImage source={{ uri: item.image }} />
			<View style={styles.textContainer}>
				<Text style={textStyles.p}>{item.title}</Text>
			</View>
		</View>
	</TouchableOpacity>
);

MyCityItem.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white'
	},
	textContainer: {
		marginHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 20
	},
	date: {
		...textStyles.p,
		marginTop: 5,
		fontSize: 12,
		color: colors.grayLight,
		textAlign: 'left'
	},
	image: {
		resizeMode: 'contain'
	}
});
