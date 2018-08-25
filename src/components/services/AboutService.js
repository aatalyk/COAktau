import React, { Component } from 'react';
import { ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import HTMLView from 'react-native-htmlview';
import PropTypes from 'prop-types';

import { textStyles } from '../../assets';

const propTypes = {
	navigation: PropTypes.object
};

class AboutService extends Component {
	render() {
		const detail = this.props.navigation.getParam('detail', {});
		console.warn(detail);
		return (
			<ScrollView style={styles.container}>
				<HTMLView value={`${detail}`} style={styles.htmlView} stylesheet={styles} />
			</ScrollView>
		);
	}
}

AboutService.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	htmlView: {
		margin: 10
	},
	p: {
		...textStyles.p
	},
	a: {
		fontWeight: '300',
		color: '#FF3366' // make links coloured pink
	},
	b: {
		fontWeight: 'bold'
	}
});

export { AboutService };
