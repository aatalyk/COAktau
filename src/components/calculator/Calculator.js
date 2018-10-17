import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	Alert,
	Keyboard,
	TouchableWithoutFeedback,
	Dimensions,
	Platform
} from 'react-native';
import PropTypes from 'prop-types';

import { colors, textStyles, settings } from '../../assets';
import { calculate } from './actions';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
					<View style={styles.line} />
					<Text style={styles.text}>{settings[lang].calc.text1}</Text>
					<TextInput
						style={styles.textInput}
						keyboardType="number-pad"
						onChangeText={value => this.changeAmount(value)}
						placeholder="*******"
					/>
					<View style={styles.inputLine} />
					<Text style={styles.text}>{settings[this.props.lang].calc.text2}</Text>
					<TextInput
						style={styles.textInput}
						keyboardType="number-pad"
						onChangeText={value => this.changeNumberOfPeople(value)}
						placeholder="*******"
					/>
					<View style={styles.inputLine} />
					<View
						style={[
							styles.button,
							{ backgroundColor: Platform.OS === 'ios' ? colors.soBlue : 'transparent' }
						]}
					>
						<Button
							title={settings[lang].buttons.calculate}
							color={Platform.OS === 'ios' ? 'white' : colors.soBlue}
							onPress={this.onPress}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

Calculator.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		margin: 20
	},
	title: {
		...textStyles.h2,
		textAlign: 'left',
		color: colors.black,
		margin: 10
	},
	text: {
		...textStyles.h1,
		textAlign: 'left',
		margin: 10
	},
	warning: {
		...textStyles.p,
		fontSize: 12,
		color: 'red',
		marginLeft: 10,
		marginRight: 20
	},
	line: {
		backgroundColor: colors.soBlue,
		height: 3,
		width: SCREEN_WIDTH * 0.2,
		marginLeft: 10,
		borderRadius: 2
	},
	inputLine: {
		backgroundColor: colors.soLightBlue,
		height: 3,
		width: SCREEN_WIDTH * 0.5,
		marginLeft: 10,
		marginBottom: 10,
		borderRadius: 2
	},
	textInput: {
		height: 44,
		width: SCREEN_WIDTH * 0.7,
		margin: 10,
		marginBottom: 0,
		padding: 10,
		...textStyles.p
	},
	button: {
		height: 44,
		margin: 10,
		backgroundColor: colors.soBlue
	}
});

export { Calculator };
