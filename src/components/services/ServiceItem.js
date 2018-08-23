import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { textStyles, images } from '../../assets';

const propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func
};

const ServiceItem = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={styles.container}>
			<Image source={images[item.icon]} style={item.icon ? styles.image : { width: 0, height: 0 }} />
			<Text style={styles.title}>{item.title}</Text>
		</View>
	</TouchableOpacity>
);

ServiceItem.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 15
	},
	image: {
		width: 30,
		height: 30
	},
	title: {
		marginLeft: 10,
		...textStyles.p
	}
});

export { ServiceItem };
