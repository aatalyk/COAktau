import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { colors } from '../../assets';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const PlaceHolder = () => (
	<View style={styles.container}>
		<View style={[styles.line, { width: SCREEN_WIDTH * 0.8 }]} />
		<View style={[styles.line, { width: SCREEN_WIDTH * 0.8 }]} />
		<View style={styles.break} />
		<View style={[styles.line, { paddingTop: 10 }]} />
		<View style={styles.line} />
		<View style={styles.line} />
		<View style={styles.line} />
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		margin: 20
	},
	break: {
		backgroundColor: colors.soBlue,
		height: 3,
		width: SCREEN_WIDTH * 0.2,
		margin: 20,
		borderRadius: 2
	},
	line: {
		width: SCREEN_WIDTH * 0.6,
		height: 10,
		backgroundColor: colors.soLightBlue,
		margin: 5
	}
});
