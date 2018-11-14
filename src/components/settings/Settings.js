import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, NativeModules, Platform, Linking } from 'react-native';
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

const ReactNotificationManager = NativeModules.ReactNotificationManager;

const urliOS = 'https://itunes.apple.com/app/id1441907923';
const urlAndroid = 'https://play.google.com/store/apps/details?id=com.coaktau&hl=ru';

class SettingsScreen extends Component {
	onPress = () => {
		const lang = this.props.lang === 'kaz' ? 'rus' : 'kaz';
		lang === 'rus' ? ReactNotificationManager.subscribeRus() : ReactNotificationManager.subscribeKaz();
		this.props.setLang(lang);
	};

	onValueChange = () => {
		if (this.props.notifsEnabled) {
			ReactNotificationManager.disableNotification();
			this.props.disableNotification();
		} else {
			ReactNotificationManager.enableNotification(this.props.lang);
			this.props.enableNotification();
		}
	};

	composeEmail = () => Linking.openURL('mailto:soaktau@gmail.com');

	rate = () => Linking.openURL(Platform.OS === 'ios' ? urliOS : urlAndroid);

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
				<View style={styles.lang}>
					<Image style={styles.image} source={Platform.OS === 'ios' ? images.ios : images.android} />
					<Text style={styles.title}>{settings[this.props.lang].text.rate}</Text>
				</View>
				<LanguageItem
					title={settings[this.props.lang].text.rate}
					imgSource={images.right}
					onPress={this.rate}
				/>
				<View style={styles.lang}>
					<Image style={styles.image} source={images.message} />
					<Text style={styles.title}>{settings[this.props.lang].text.message}</Text>
				</View>
				<LanguageItem
					title={settings[this.props.lang].text.message}
					imgSource={images.right}
					onPress={this.composeEmail}
				/>
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
