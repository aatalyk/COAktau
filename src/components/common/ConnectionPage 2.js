import React from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import { images, settings, textStyles, colors } from '../../assets';

const propTypes = {
	lang: PropTypes.string,
	onPress: PropTypes.func
};

export const ConnectionPage = ({ lang, onPress }) => (
	<TouchableWithoutFeedback onPress={onPress}>
		<View style={styles.container}>
			<Image source={images.network} style={styles.image} />
			<Text style={styles.title}>{settings[lang].text.network}</Text>
		</View>
	</TouchableWithoutFeedback>
);

ConnectionPage.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
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
