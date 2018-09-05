import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Linking } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import Communications from 'react-native-communications';

import { ContactItem } from './ContactItem';
import { images, settings } from '../../assets';

const propTypes = {
	lang: PropTypes.string
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class ContactScreen extends Component {
	call = phone => Communications.phonecall(phone, true);

	composeEmail = () => Linking.openURL('mailto:soaktau@gmail.com');

	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: 43.65635,
						longitude: 51.155778,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
				>
					<Marker
						title="We"
						coordinate={{
							latitude: 43.65635,
							longitude: 51.155778
						}}
					/>
				</MapView>
				<View style={styles.itemsContainer}>
					<ContactItem title={settings[this.props.lang].text.address} imgSource={images.pinOrange} />
					<ContactItem title={settings[this.props.lang].text.bus} imgSource={images.bus} />
					<ContactItem
						title="+7 (7292) 43‒26‒70"
						imgSource={images.callOrange}
						onPress={() => this.call('+77292432670')}
					/>
					<ContactItem title="+7 (7292) 43‒26‒52" onPress={() => this.call('+77292432652')} />
					<ContactItem title="soaktau@gmail.com" imgSource={images.emailOrange} onPress={this.composeEmail} />
				</View>
			</View>
		);
	}
}

ContactScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	itemsContainer: {
		flex: 1,
		justifyContent: 'space-around'
	},
	map: {
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT / 2
	}
});

const mapStateToProps = ({ settings }) => ({
	lang: settings.lang
});

export const Contact = connect(mapStateToProps)(ContactScreen);
