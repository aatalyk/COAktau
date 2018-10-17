import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { colors } from '../../assets';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const PlaceHolderList = () => (
	<View style={styles.container}>
		<View style={styles.row}>
			<View style={styles.box} />
			<View style={styles.column}>
				<View style={[styles.line, { width: SCREEN_WIDTH * 0.5 }]} />
				<View style={styles.line} />
				<View style={styles.line} />
			</View>
		</View>
		<View style={styles.break} />
		<View style={styles.row}>
			<View style={styles.box} />
			<View style={styles.column}>
				<View style={[styles.line, { width: SCREEN_WIDTH * 0.5 }]} />
				<View style={styles.line} />
				<View style={styles.line} />
			</View>
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		margin: 20
	},

	column: {},
	row: {
		flexDirection: 'row'
	},
	break: {
		backgroundColor: colors.soBlue,
		height: 3,
		width: SCREEN_WIDTH * 0.2,
		margin: 20,
		borderRadius: 2
	},
	line: {
		height: 10,
		width: SCREEN_WIDTH * 0.7,
		backgroundColor: colors.soLightBlue,
		margin: 10
	},
	box: {
		width: 30,
		height: 30,
		backgroundColor: colors.soBlue,
		margin: 10
	}
});
