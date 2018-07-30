import { StyleSheet } from 'react-native';
import { fonts } from '../assets';

export const textStyles = StyleSheet.create({
	p: {
		fontSize: 16,
		fontFamily: fonts.MerriweatherRegular,
		color: 'black'
	},
	h1: {
		fontSize: 18,
		fontFamily: fonts.MerriweatherBlack,
		color: 'black'
	}
});
