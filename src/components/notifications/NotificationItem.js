import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { colors, images, fonts, textStyles } from '../../assets';

const propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func
};

export const NotificationItem = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={styles.container}>
			<Image
				defaultSource={images.imgPlaceholder}
				source={{ uri: item.icon }}
				style={styles.image}
				resizeMode="contain"
			/>
			<Text style={styles.title}>{item.title}</Text>
			<Image source={images.right} style={styles.icon} />
		</View>
	</TouchableOpacity>
);

NotificationItem.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 15
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 5,
		marginLeft: 5
	},
	title: {
		flex: 1,
		marginLeft: 15,
		...textStyles.p
	},
	icon: {
		width: 20,
		height: 20,
		borderRadius: 5,
		marginLeft: 5
	}
});
