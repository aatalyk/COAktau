import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, ActivityIndicator, Dimensions, Linking } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import Communications from 'react-native-communications';

import { ContactItem } from './ContactItem';
import { images, settings } from '../../assets';
import { fetchContactRequested } from '../../actions';

const propTypes = {
	lang: PropTypes.string,
	loading: PropTypes.bool,
	contact: PropTypes.object,
	fetchContactRequested: PropTypes.func
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const contact = {
	location: {
		lat: 43.65635,
		lon: 51.155778
	},
	markers: [
		{
			lat: 43.65635,
			lon: 51.155778
		},
		{
			lat: 44.65635,
			lon: 51.155778
		}
	],
	tels: ['+77292432670', '+77292432652'],
	addresses: ['Address'],
	busStops: ['bus1'],
	email: 'soaktau@gmail.com'
};

class ContactScreen extends Component {
	componentDidMount() {
		this.props.fetchContactRequested();
	}

	call = phone => Communications.phonecall(phone, true);

	composeEmail = () => Linking.openURL('mailto:soaktau@gmail.com');

	onRefresh = () => this.props.fetchContactRequested();

	render() {
		console.log('prop', this.props.contact);
		const { lang, loading } = this.props;
		const { location, markers, tels, addresses, busStops, email } = this.props.contact;

		return loading ? (
			<ActivityIndicator refreshing={loading} style={styles.indicator} />
		) : (
			<ScrollView
				style={styles.container}
				refreshControl={<RefreshControl refreshing={loading} onRefresh={this.onRefresh} />}
			>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: location.lat,
						longitude: location.lon,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01
					}}
				>
					{markers.map((marker, i) => (
						<Marker
							key={i}
							title={settings[lang].text.title}
							coordinate={{
								latitude: marker.lat,
								longitude: marker.lon
							}}
						/>
					))}
				</MapView>
				<View style={styles.itemsContainer}>
					{addresses.map((address, i) => (
						<ContactItem key={i} title={address} imgSource={images.pinPurple} />
					))}
					{busStops.map((busStop, i) => <ContactItem key={i} title={busStop} imgSource={images.bus} />)}
					{tels.map((tel, i) => (
						<ContactItem key={i} title={tel} imgSource={images.callPurple} onPress={() => this.call(tel)} />
					))}
					<ContactItem title={email} imgSource={images.emailPurple} onPress={this.composeEmail} />
				</View>
			</ScrollView>
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
	},
	indicator: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	}
});

const mapStateToProps = ({ settings, contact }) => ({
	lang: settings.lang,
	loading: contact.loading,
	contact: contact.contact
});

export const Contact = connect(
	mapStateToProps,
	{ fetchContactRequested }
)(ContactScreen);
