import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

class SettingsScreen extends Component {
	onPress = () => {
		const lang = this.props.lang === 'kaz' ? 'rus' : 'kaz';
		this.props.setLang(lang);
	};

	onValueChange = () => {
		this.props.notifsEnabled ? this.props.disableNotification() : this.props.enableNotification();
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>ҚОСЫМША ТІЛІ</Text>
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
		marginTop: 20
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
