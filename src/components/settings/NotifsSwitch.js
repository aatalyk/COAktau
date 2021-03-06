import React from 'react';
import { View, Text, Image, Switch, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { images, fonts, settings, colors, textStyles } from '../../assets';

const propTypes = {
	isEnabled: PropTypes.bool,
	onValueChange: PropTypes.func,
	lang: PropTypes.oneOf(['kaz', 'rus'])
};

export const NotifsSwitchScreen = ({ isEnabled, onValueChange, lang }) => (
	<View style={styles.fill}>
		<View style={styles.container}>
			<Text style={styles.text}>{settings[lang].navigation.notifs}</Text>
			<Switch value={isEnabled} onValueChange={onValueChange} onTintColor={colors.soBlue} />
		</View>
	</View>
);

NotifsSwitchScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	fill: {
		backgroundColor: 'white'
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10
	},
	text: {
		flex: 1,
		...textStyles.p
	},
	image: {
		width: 25,
		height: 25,
		marginRight: 5
	}
});

const mapStateToProps = ({ settings: { lang } }) => ({ lang });

export const NotifsSwitch = connect(mapStateToProps)(NotifsSwitchScreen);
