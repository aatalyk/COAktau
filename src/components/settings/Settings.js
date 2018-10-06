import React, { Component } from 'react';
import { View, Text, StyleSheet, NativeModules } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LanguageItem } from './LanguageItem';
import { NotifsSwitch } from './NotifsSwitch';
import { setLang, enableNotification, disableNotification } from '../../actions';
import { colors } from '../../assets';

const propTypes = {
	lang: PropTypes.string,
	setLang: PropTypes.func,
	notifsEnabled: PropTypes.bool,
	enableNotification: PropTypes.func,
	disableNotification: PropTypes.func
};

const NotificationManager = NativeModules.NotificationManager;

class SettingsScreen extends Component {
	onPress = () => {
		const lang = this.props.lang === 'kaz' ? 'rus' : 'kaz';
		lang === 'rus' ? NotificationManager.subscribeRus() : NotificationManager.subscribeKaz();
		this.props.setLang(lang);
	};

	onValueChange = () => {
		if (this.props.notifsEnabled) {
			NotificationManager.disableNotification();
			this.props.disableNotification();
		} else {
			NotificationManager.enableNotification(this.props.lang);
			this.props.enableNotification();
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>ҚОСЫМША ТІЛІ / ЯЗЫК ПРИЛОЖЕНИЯ</Text>
				<LanguageItem title="Қазақша" onPress={this.onPress} isSelected={this.props.lang === 'kaz'} />
				<LanguageItem title="Русский" onPress={this.onPress} isSelected={this.props.lang === 'rus'} />
				<NotifsSwitch isEnabled={this.props.notifsEnabled} onValueChange={this.onValueChange} />
			</View>
		);
	}
}

SettingsScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		flex: 1,
		backgroundColor: colors.blueUltraLight
	},
	title: {
		fontSize: 14,
		color: colors.grayLight,
		margin: 10
	}
});

const mapStateToProps = ({ settings }) => ({
	lang: settings.lang,
	notifsEnabled: settings.notifsEnabled
});

export const Settings = connect(
	mapStateToProps,
	{ setLang, enableNotification, disableNotification }
)(SettingsScreen);
