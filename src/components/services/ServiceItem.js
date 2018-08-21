import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { textStyles } from '../../assets';

const propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func
};

const ServiceItem = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={styles.container}>
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
	title: {
		marginLeft: 10,
		...textStyles.p
	}
});

export { ServiceItem };
