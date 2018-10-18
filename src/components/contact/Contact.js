import React, { Component } from 'react';
import {
	View,
	Image,
	Text,
	ScrollView,
	StyleSheet,
	RefreshControl,
	ActivityIndicator,
	Dimensions,
	Linking
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import Communications from 'react-native-communications';

import { ContactItem } from './ContactItem';
import { images, settings, textStyles, colors } from '../../assets';
import { fetchContactRequested } from '../../actions';
import { PlaceHolder } from '../common';

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
				<PlaceHolder />
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
					<View style={styles.header}>
						<Image style={styles.image} source={images.pinSelected} />
						<Text style={styles.title}>{settings[this.props.lang].text.address}</Text>
					</View>
					{addresses.map((address, i) => <ContactItem key={i} title={address} />)}
					<View style={styles.header}>
						<Image style={styles.image} source={images.bus} />
						<Text style={styles.title}>{settings[this.props.lang].text.bus}</Text>
					</View>
					{busStops.map((busStop, i) => <ContactItem key={i} title={busStop} />)}
					<View style={styles.header}>
						<Image style={styles.image} source={images.call} />
						<Text style={styles.title}>{settings[this.props.lang].text.phone}</Text>
					</View>
					{tels.map((tel, i) => <ContactItem key={i} title={tel} onPress={() => this.call(tel)} />)}
					<View style={styles.header}>
						<Image style={styles.image} source={images.email} />
						<Text style={styles.title}>{settings[this.props.lang].text.email}</Text>
					</View>
					{emails.map((email, i) => (
						<ContactItem key={i} title={email} onPress={() => this.composeEmail(email)} />
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
		justifyContent: 'space-around',
		marginTop: 10
	},
	map: {
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT * 0.3
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10
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

const mapStateToProps = ({ settings, contact }) => ({
	lang: settings.lang,
	loading: contact.loading,
	contact: contact.contact
});

export const Contact = connect(
	mapStateToProps,
	{ fetchContactRequested }
)(ContactScreen);
