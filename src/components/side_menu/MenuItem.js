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
		<View style={[styles.container, { backgroundColor: isSelected ? 'white' : 'white', height }]}>
			<Image source={isSelected ? selectedImage : regularImage} style={styles.image} />
			<Text style={[styles.title, { color: isSelected ? colors.soBlue : 'black' }]}>{title.toUpperCase()}</Text>
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
		marginLeft: 10,
		marginRight: 10
	},
	image: {
		width: 25,
		height: 25
	},
	title: {
		flex: 1,
		marginLeft: 20,
		fontFamily: fonts.MerriweatherRegular,
		...textStyles.l
	}
});
