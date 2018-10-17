import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, NativeModules } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LanguageItem } from './LanguageItem';
import { NotifsSwitch } from './NotifsSwitch';
import { setLang, enableNotification, disableNotification } from '../../actions';
import { settings, images, textStyles, colors } from '../../assets';

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
				<View style={styles.lang}>
					<Image style={styles.image} source={images.lang} />
					<Text style={styles.title}>{settings[this.props.lang].text.lang}</Text>
				</View>
				<LanguageItem title="Қазақша" onPress={this.onPress} isSelected={this.props.lang === 'kaz'} />
				<LanguageItem title="Русский" onPress={this.onPress} isSelected={this.props.lang === 'rus'} />
				<View style={styles.lang}>
					<Image style={styles.image} source={images.notifs} />
					<Text style={styles.title}>{settings[this.props.lang].navigation.notifs}</Text>
				</View>
				<NotifsSwitch isEnabled={this.props.notifsEnabled} onValueChange={this.onValueChange} />
			</View>
		);
	}
}

SettingsScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flex: 1,
		backgroundColor: 'white'
	},
	lang: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 10,
		marginRight: 10
	},
	image: {
		height: 30,
		width: 30
	},
	title: {
		flex: 1,
		...textStyles.h1,
		color: colors.grayDark,
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
