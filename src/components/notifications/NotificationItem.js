import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { colors, textStyles } from '../../assets';

const propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func
};

export const NotificationItem = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={styles.container}>
			<View style={styles.letterContainer}>
				<Text style={styles.letter}>{item.title.charAt(0)}</Text>
			</View>
			<Text style={styles.title}>{item.title}</Text>
		</View>
	</TouchableOpacity>
);

NotificationItem.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		height: 50,
		paddingHorizontal: 15,
		flexDirection: 'row',
		alignItems: 'center'
	},
	letterContainer: {
		width: 30,
		height: 30,
		borderRadius: 30,
		backgroundColor: colors.bluePicton,
		justifyContent: 'center',
		alignItems: 'center'
	},
	letter: {
		...textStyles.p,
		color: 'white'
	},
	title: {
		...textStyles.p,
		marginLeft: 10
	}
});
