import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { images } from '../../assets';
import { fonts } from '../../assets';

const propTypes = {
	title: PropTypes.string
};

export const Header = ({ title }) => (
	<View style={styles.fill}>
		<View style={styles.container}>
			<Image style={styles.image} source={images.appicon} />
			<Text style={styles.title}>{title}</Text>
		</View>
	</View>
);

Header.propTypes = propTypes;

const styles = StyleSheet.create({
	fill: {
		backgroundColor: 'blue'
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10
	},
	image: {
		width: 90,
		height: 90,
		marginLeft: 40
	},
	title: {
		flex: 1,
		fontSize: 30,
		lineHeight: 25,
		margin: 5,
		color: 'white',
		fontFamily: fonts.MerriweatherRegular
	}
});
