import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { images, textStyles } from '../../assets';

export const TaxiHeader = () => (
	<View style={styles.container}>
		<Image style={styles.image} source={images.taxi} />
		<Text style={styles.title}>ИнваТакси</Text>
		<Image style={styles.image} source={images.taxi} />
	</View>
);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		...textStyles.p,
		textAlign: 'center',
		marginHorizontal: 10
	},
	image: {
		width: 30,
		height: 30
	}
});
