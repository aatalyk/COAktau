import React from 'react';
import { View, Text, Image, Switch, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { images } from '../../assets';

const propTypes = {
	isEnabled: PropTypes.bool,
	onValueChange: PropTypes.func
};

export const NotifsSwitch = ({ isEnabled, onValueChange }) => (
	<View style={styles.fill}>
		<View style={styles.container}>
			<Image source={images.bell} style={styles.image} />
			<Text style={styles.text}> Notifications</Text>
			<Switch value={isEnabled} onValueChange={onValueChange} />
		</View>
	</View>
);

NotifsSwitch.propTypes = propTypes;

const styles = StyleSheet.create({
	fill: {
		marginTop: 40,
		backgroundColor: 'white'
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10
	},
	text: {
		flex: 1,
		fontSize: 18
	},
	image: {
		width: 25,
		height: 25,
		marginRight: 5
	}
});
