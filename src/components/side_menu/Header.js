import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { images, colors, fonts } from '../../assets';

const propTypes = {
	title: PropTypes.string
};

export const Header = ({ title }) => (
	<View style={styles.container}>
		<Image style={styles.image} source={images.appicon} />
		<Text style={styles.title}>{title}</Text>
	</View>
);

Header.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.orange,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 20,
		paddingBottom: 10
	},
	image: {
		width: 90,
		height: 90,
		marginLeft: 0
	},
	title: {
		flex: 1,
		fontSize: 20,
		lineHeight: 25,
		margin: 5,
		color: 'white',
		fontFamily: fonts.MerriweatherRegular
	}
});
