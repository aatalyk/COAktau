import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
	navigation: PropTypes.object
};

export const ServiceDetails = ({ navigation }) => {
	const item = navigation.getParam('item', {});
	console.warn(item);
	return <View style={styles.container} />;
};

ServiceDetails.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'red'
	}
});
