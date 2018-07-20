import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { fonts } from '../../assets';

const propTypes = {
	onPress: PropTypes.func,
	regularImage: PropTypes.number,
	selectedImage: PropTypes.number,
	title: PropTypes.string,
	isSelected: PropTypes.bool
};

export const MenuItem = ({ onPress, regularImage, selectedImage, title, isSelected }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={styles.container}>
			<Image source={isSelected ? selectedImage : regularImage} style={styles.image} />
			<Text style={[styles.title, { color: isSelected ? 'orange' : 'black' }]}>{title}</Text>
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
		margin: 5,
		marginLeft: 15
	},
	image: {
		width: 25,
		height: 25
	},
	title: {
		marginLeft: 30,
		fontSize: 18,
		textAlign: 'left',
		color: 'black',
		fontFamily: fonts.MerriweatherRegular
	}
});
