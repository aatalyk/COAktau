import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { textStyles, colors } from '../../assets';

const propTypes = {
	title: PropTypes.string,
	imgSource: PropTypes.number,
	onPress: PropTypes.func
};

export const ContactItem = ({ title, imgSource, onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
		</View>
	</TouchableOpacity>
);

ContactItem.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10,
		marginLeft: 20,
		marginRight: 20
	},
	title: {
		flex: 1,
		...textStyles.p
	},
	image: {
		width: 25,
		height: 25,
		marginRight: 20
	}
});
