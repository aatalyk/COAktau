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
			<View style={styles.titleContainer}>
				<Image
					defaultSource={images.imgPlaceholder}
					source={{ uri: item.thumbnail }}
					style={styles.image}
					resizeMode="cover"
				/>
				<Text style={styles.title}>{item.title}</Text>
				<Image source={images.right} style={styles.icon} />
			</View>
		</View>
	</TouchableOpacity>
);

NotificationItem.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		minHeight: 100,
		marginTop: 10,
		borderRadius: 10
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 20
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
