import React from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { colors, images, textStyles } from '../../assets';

const propTypes = {
	navigation: PropTypes.object
};

const renderItem = e => {
	const { item } = e;
	console.warn(e);
	return (
		<TouchableOpacity>
			<View style={styles.detailContainer}>
				<Text style={styles.title}>{item.title}</Text>
				<Image source={images.right} style={styles.image} />
			</View>
		</TouchableOpacity>
	);
};

const renderSeparator = () => <View style={styles.separator} />;

export const ServiceDetails = ({ navigation }) => {
	const { details } = navigation.getParam('e', {});
	console.warn('services', details);
	return (
		<View style={styles.container}>
			<FlatList
				data={details}
				renderItem={renderItem}
				keyExtractor={(_, index) => index + ''}
				ItemSeparatorComponent={renderSeparator}
			/>
		</View>
	);
};

ServiceDetails.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	detailContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10
	},
	title: {
		flex: 1,
		...textStyles.p
	},
	image: {
		width: 20,
		height: 20
	},
	separator: {
		height: 0.5,
		backgroundColor: colors.grayUltraLight,
		marginLeft: 10,
		marginRight: 10
	}
});
