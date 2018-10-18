import { StyleSheet, Dimensions } from 'react-native';
import { fonts } from '../assets';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const textStyles = StyleSheet.create({
	l: {
		fontSize: SCREEN_WIDTH / 30,
		fontFamily: fonts.RubikRegular,
		color: 'black'
	},
	p: {
		fontSize: SCREEN_WIDTH / 25,
		fontFamily: fonts.RubikRegular,
		color: 'black'
	},
	h1: {
		fontSize: SCREEN_WIDTH / 23,
		fontFamily: fonts.RubikRegular,
		color: 'black',
		lineHeight: 25
	},
	h2: {
		fontSize: SCREEN_WIDTH / 23,
		fontFamily: fonts.RubikMedium,
		color: 'black',
		lineHeight: 25
	}
});
