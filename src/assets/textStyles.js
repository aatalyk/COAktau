import { StyleSheet, Dimensions } from 'react-native';
import { fonts } from '../assets';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const textStyles = StyleSheet.create({
	p: {
		fontSize: SCREEN_WIDTH / 25,
		fontFamily: fonts.MerriweatherRegular,
		color: 'black'
	},
	h1: {
		fontSize: SCREEN_WIDTH / 23,
		fontFamily: fonts.MerriweatherBlack,
		color: 'black'
	}
});
