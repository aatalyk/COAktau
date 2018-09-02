import React from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import { textStyles, colors } from '../../assets';

const propTypes = {
	onPress: PropTypes.func,
	imgSource: PropTypes.number,
	title: PropTypes.string
};

export const MessageScreen = ({ title, imgSource, onPress }) => (
	<TouchableWithoutFeedback onPress={onPress}>
		<View style={styles.container}>
			<Image source={imgSource} style={imgSource ? styles.image : { width: 0, height: 0 }} />
			<Text style={styles.title}>{title}</Text>
		</View>
	</TouchableWithoutFeedback>
);

MessageScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	image: {
		width: 80,
		height: 80
	},
	title: {
		...textStyles.p,
		fontSize: 18,
		margin: 30,
		textAlign: 'center',
		color: colors.grayLight
	}
});
