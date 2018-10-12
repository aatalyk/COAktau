import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	KeyboardAvoidingView,
	Alert,
	Keyboard,
	TouchableWithoutFeedback,
	Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

import { colors, textStyles, settings } from '../../assets';
import { calculate } from './actions';

const propTypes = {
	livingCost: PropTypes.number,
	povertyMin: PropTypes.number,
	navigation: PropTypes.object,
	lang: PropTypes.string
};

class Calculator extends Component {
	state = {
		amount: 0,
		numberOfPeople: 0
	};

	onPress = () => {
		if (this.state.amount === 0 || this.state.numberOfPeople === 0) {
			this.showAlert();
			return;
		}
		const result = calculate(
			this.state.amount,
			this.state.numberOfPeople,
			this.props.povertyMin,
			this.props.livingCost
		);

		this.props.navigation.navigate('AlertScreen', { result });
	};

	changeAmount = amount => {
		if (amount === '') {
			this.setState((prevState, prevProps) => ({
				...prevState,
				amount: 0
			}));
		} else {
			this.setState((prevState, prevProps) => ({
				...prevState,
				amount
			}));
		}
	};

	changeNumberOfPeople = numberOfPeople => {
		if (numberOfPeople === '') {
			this.setState((prevState, prevProps) => ({
				...prevState,
				numberOfPeople: 0
			}));
		} else {
			this.setState((prevState, prevProps) => ({
				...prevState,
				numberOfPeople
			}));
		}
	};

	showAlert = () => {
		const { lang } = this.props;
		Alert.alert(
			settings[this.props.lang].text.warning,
			'',
			[{ text: settings[lang].text.cancel, onPress: () => console.log('Cancel Pressed'), style: 'destructive' }],
			{ cancelable: true }
		);
	};

	render() {
		const { lang } = this.props;
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={styles.container}>
					<Text style={styles.title}>{settings[lang].calc.title}</Text>
					<Text style={styles.text}>{settings[lang].calc.text1}</Text>
					<TextInput
						style={styles.textInput}
						keyboardType="number-pad"
						onChangeText={value => this.changeAmount(value)}
						placeholder={settings[lang].text.input}
					/>
					<Text style={styles.text}>{settings[this.props.lang].calc.text2}</Text>
					<TextInput
						style={styles.textInput}
						keyboardType="number-pad"
						onChangeText={value => this.changeNumberOfPeople(value)}
						placeholder={settings[lang].text.input}
					/>
					<View style={styles.button}>
						<Button title={settings[lang].buttons.calculate} color={colors.purple} onPress={this.onPress} />
					</View>
					<Text style={styles.warning}>{this.state.warning}</Text>
				</View>
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
		...textStyles.p,
		textAlign: 'center',
		fontSize: 20,
		color: colors.purple,
		margin: 10
	},
	text: {
		...textStyles.h1,
		textAlign: 'center',
		width: Dimensions.get('window').width * 0.7,
		margin: 10
	},
	warning: {
		...textStyles.p,
		fontSize: 12,
		color: 'red',
		marginLeft: 20,
		marginRight: 20
	},
	textInput: {
		backgroundColor: colors.grayUltraLight,
		height: 44,
		width: Dimensions.get('window').width * 0.7,
		margin: 10,
		padding: 10,
		...textStyles.p
	},
	button: {
		height: 44,
		width: Dimensions.get('window').width * 0.7,
		borderColor: colors.purple,
		borderWidth: 1,
		margin: 10
	}
});

export { Calculator };
