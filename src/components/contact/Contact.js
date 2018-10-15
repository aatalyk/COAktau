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

class ContactScreen extends Component {
	componentDidMount() {
		this.props.fetchContactRequested();
	}

	call = phone => Communications.phonecall(phone, true);

	composeEmail = () => Linking.openURL('mailto:soaktau@gmail.com');

	onRefresh = () => this.props.fetchContactRequested();

	render() {
		const { lang, loading } = this.props;
		const { markers, tels, addresses, busStops, emails } = this.props.contact;

		return loading ? (
			<View style={styles.container}>
				<ActivityIndicator refreshing={loading} />
			</View>
		) : (
			<ScrollView
				style={styles.container}
				refreshControl={<RefreshControl refreshing={loading} onRefresh={this.onRefresh} />}
			>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: markers[0].lat,
						longitude: markers[0].lon,
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
					{emails.map((email, i) => (
						<ContactItem
							key={i}
							title={email}
							imgSource={images.emailPurple}
							onPress={() => this.composeEmail(email)}
						/>
					))}
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
		width: SCREEN_WIDTH * 0.9,
		height: SCREEN_HEIGHT * 0.4,
		borderRadius: 10,
		margin: SCREEN_WIDTH * 0.05
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
