import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import HTMLView from 'react-native-htmlview';
import PropTypes from 'prop-types';

import { textStyles } from '../../assets';

const propTypes = {
	item: PropTypes.object
};

const AboutService = ({ item }) => (
	<View style={styles.container}>
		<HTMLView value={`<p><a href="http://jsdf.co">&hearts; nice job!</a></p>`} />
	</View>
);

AboutService.propTypes = propTypes;

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
		marginLeft: 10,
		...textStyles.p
	}
});

export { AboutService };
