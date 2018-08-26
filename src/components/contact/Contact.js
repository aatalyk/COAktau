import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Communications from 'react-native-communications';

import { ContactItem } from './ContactItem';
import { images } from '../../assets';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Contact extends Component {
	call = () => Communications.phonecall('+77016536415', true);

	composeEmail = () => Linking.openURL('mailto:atalyk.akash@nu.edu.kz');

	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
				>
					<Marker
						title="We"
						coordinate={{
							latitude: 37.78825,
							longitude: -122.4324
						}}
					/>
				</MapView>
				<View style={styles.itemsContainer}>
					<ContactItem title="1600 Amphitheatre Parkway, Mountain View, CA" imgSource={images.pinOrange} />
					<ContactItem title="+7 777 7777777" imgSource={images.callOrange} onPress={this.call} />
					<ContactItem title="example@gmail.com" imgSource={images.emailOrange} onPress={this.composeEmail} />
				</View>
			</View>
		);
	}
}

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

export { Contact };
