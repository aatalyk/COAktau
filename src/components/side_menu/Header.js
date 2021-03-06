import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { images, fonts, colors } from '../../assets';

const propTypes = {
	title: PropTypes.string
};

export const Header = ({ title }) => (
	<View style={styles.container}>
		<Image style={styles.image} source={images.logoIcon} />
		<Text style={styles.title}>{title}</Text>
	</View>
);

Header.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 20,
		paddingBottom: 0
	},
	image: {
		width: 100,
		height: 100,
		marginLeft: 0
	},
	title: {
		flex: 1,
		fontSize: 20,
		lineHeight: 25,
		margin: 5,
		color: colors.grayDark,
		fontFamily: fonts.RubikLight
	}
});
