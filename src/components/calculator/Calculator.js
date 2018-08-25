import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

import { colors, textStyles, settings } from '../../assets';
import { calculate } from './actions';

const propTypes = {
	lang: PropTypes.object
};

class Calculator extends Component {
	state = {
		amount: 0,
		numberOfPeople: 0
	};

	onPress = () => {
		const result = calculate(this.state.amount, this.state.numberOfPeople);
		console.warn(result);
	};

	changeAmount = amount => {
		this.setState((prevState, prevProps) => ({
			...prevState,
			amount
		}));
	};

	changeNumberOfPeople = numberOfPeople => {
		this.setState((prevState, prevProps) => ({
			...prevState,
			numberOfPeople
		}));
	};

	render() {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
					<Text style={styles.title}>{settings[this.props.lang].calc.title}</Text>
					<Text style={styles.text}>{settings[this.props.lang].calc.text1}</Text>
					<TextInput
						style={styles.textInput}
						keyboardType="number-pad"
						onChangeText={value => this.changeAmount(value)}
					/>
					<Text style={styles.text}>{settings[this.props.lang].calc.text2}</Text>
					<TextInput
						style={styles.textInput}
						keyboardType="number-pad"
						onChangeText={value => this.changeNumberOfPeople(value)}
					/>
					<View style={styles.button}>
						<Button
							title={settings[this.props.lang].calc.buttonText}
							color="white"
							onPress={this.onPress}
						/>
					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		);
	}
}

Calculator.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		...textStyles.h1,
		textAlign: 'center',
		fontSize: 20,
		color: colors.blueLight,
		margin: 10
	},
	text: {
		...textStyles.h1,
		textAlign: 'center',
		margin: 10
	},
	textInput: {
		borderWidth: 1,
		borderColor: colors.orange,
		height: 44,
		width: Dimensions.get('window').width * 0.7,
		margin: 10,
		padding: 10,
		...textStyles.p
	},
	button: {
		height: 44,
		width: Dimensions.get('window').width * 0.7,
		backgroundColor: colors.blueLight,
		borderWidth: 1,
		borderColor: colors.transparent,
		margin: 10
	}
});

export { Calculator };
