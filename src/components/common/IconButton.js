import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
	onPress: PropTypes.func,
	imgSource: PropTypes.number
};

export const MenuButton = ({ onPress, imgSource }) => (
	<TouchableOpacity onPress={onPress}>
		<Image source={imgSource} style={{ width: 20, height: 20 }} />
	</TouchableOpacity>
);

MenuButton.propTypes = propTypes;
