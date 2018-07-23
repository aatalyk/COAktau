import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
	onPress: PropTypes.func,
	imgSource: PropTypes.number
};

export const IconButton = ({ onPress, imgSource }) => (
	<TouchableOpacity onPress={onPress} style={styles.container}>
		<Image source={imgSource} style={styles.image} />
	</TouchableOpacity>
);

IconButton.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		width: 44,
		height: 44,
		justifyContent: 'center'
	},
	image: {
		width: 20,
		height: 20
	}
});
