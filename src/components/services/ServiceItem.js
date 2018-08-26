import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { textStyles } from '../../assets';

const propTypes = {
	item: PropTypes.shape({
		icon: PropTypes.string,
		title: PropTypes.string
	}),
	onPress: PropTypes.func
};

const ServiceItem = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={styles.container}>
			{!!item.icon && <Image source={{ uri: item.icon }} style={styles.image} />}
			{!!item.title && <Text style={styles.title}>{item.title}</Text>}
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
		flex: 1,
		marginLeft: 10,
		...textStyles.p
	}
});

export { ServiceItem };
