import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { fonts, colors, textStyles } from '../../assets';

const propTypes = {
	onPress: PropTypes.func,
	regularImage: PropTypes.number,
	selectedImage: PropTypes.number,
	title: PropTypes.string,
	isSelected: PropTypes.bool,
	height: PropTypes.number
};

export const MenuItem = ({ onPress, regularImage, selectedImage, title, isSelected, height }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={[styles.container, { backgroundColor: isSelected ? colors.grayUltraLight : 'white', height }]}>
			<Image source={isSelected ? selectedImage : regularImage} style={styles.image} />
			<Text style={[styles.title, { color: isSelected ? colors.purple : 'black' }]}>{title}</Text>
		</View>
	</TouchableOpacity>
);

MenuItem.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 5,
		paddingLeft: 15
	},
	image: {
		width: 25,
		height: 25
	},
	title: {
		marginLeft: 30,
		fontFamily: fonts.MerriweatherRegular,
		...textStyles.p
	}
});
