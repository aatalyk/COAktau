import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { images, fonts, textStyles } from '../../assets';

const propTypes = {
	title: PropTypes.string,
	isSelected: PropTypes.bool,
	onPress: PropTypes.func,
	imgSource: PropTypes.number
};

export const LanguageItem = ({ title, isSelected, imgSource, onPress }) => (
	<TouchableWithoutFeedback onPress={onPress}>
		<View style={styles.fill}>
			<View style={styles.container}>
				<Text style={styles.text}>{title}</Text>
				<Image
					source={isSelected ? images.checkmark : imgSource ? imgSource : null}
					style={imgSource ? styles.icon : styles.image}
				/>
			</View>
		</View>
	</TouchableWithoutFeedback>
);

LanguageItem.propTypes = propTypes;

const styles = StyleSheet.create({
	fill: {
		backgroundColor: 'white'
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10
	},
	text: {
		flex: 1,
		...textStyles.p
	},
	image: {
		width: 30,
		height: 30
	},
	icon: {
		width: 20,
		height: 20
	}
});
