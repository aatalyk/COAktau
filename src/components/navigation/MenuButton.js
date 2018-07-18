import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

import { images } from '../../assets';

const propTypes = {
  onPress: PropTypes.func,
};

export const MenuButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={images.menu} style={{ width: 20, height: 20 }} />
  </TouchableOpacity>
);

MenuButton.propTypes = propTypes;
