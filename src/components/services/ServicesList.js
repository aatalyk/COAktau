import React, { Component } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ServiceItem } from './ServiceItem';
import { MessageScreen } from '../common';
import { fetchServicesRequested } from '../../actions';
import { colors, textStyles, settings, images } from '../../assets';

const propTypes = {
	style: PropTypes.object,
	navigation: PropTypes.object,
	isPartiallyShown: PropTypes.bool,
	lang: PropTypes.string,
	data: PropTypes.array,
	fetchServicesRequested: PropTypes.func,
	myServices: PropTypes.array,
	showsMyServices: PropTypes.bool
};

class ServicesListScreen extends Component {
	componentDidMount() {
		this.props.fetchServicesRequested();
	}

	renderItem = ({ item }) => <ServiceItem item={item} onPress={() => this.onPress(item)} />;

	keyExtractor = (_, index) => index + '';

	renderSeparator = () => <View style={styles.separator} />;

	onShowMorePress = () => {
		const action = StackActions.push({
			routeName: 'ServicesList'
		});
		this.props.navigation.dispatch(action);
	};

	onPress = e => this.props.navigation.navigate('Services', { e });

	getShortData = data => data.slice(0, 2);

	render() {
		const { isPartiallyShown, data, lang, showsMyServices, myServices } = this.props;
		const serviceItems = isPartiallyShown || showsMyServices ? myServices : data;

		return (
			<View style={[styles.container, this.props.style, { flex: !isPartiallyShown ? 1 : undefined }]}>
				<View style={{ flex: 1 }}>
					{serviceItems.length === 0 ? (
						<MessageScreen
							style={styles.noDataText}
							title={settings[lang].text.noMyServices}
							imgSource={isPartiallyShown ? null : images.box}
						/>
					) : (
						<FlatList
							data={serviceItems}
							renderItem={this.renderItem}
							keyExtractor={this.keyExtractor}
							ItemSeparatorComponent={this.renderSeparator}
						/>
					)}
				</View>
				{isPartiallyShown && (
					<TouchableOpacity style={styles.showMoreButton} onPress={this.onShowMorePress}>
						<Text style={styles.showMoreText}>{settings[lang].navigation.services}</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	}
}

ServicesListScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white'
	},
	separator: {
		height: 0.5,
		backgroundColor: colors.grayUltraLight,
		marginLeft: 10,
		marginRight: 10
	},
	showMoreButton: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: 44
	},
	showMoreText: {
		...textStyles.p,
		marginRight: 15,
		color: colors.blue
	},
	title: {
		...textStyles.p,
		marginLeft: 15,
		marginTop: 20,
		color: colors.grayLight
	}
});

const mapStateToProps = ({ services, settings, myServices }) => ({
	myServices,
	data: services.data,
	lang: settings.lang
});

export const ServicesList = connect(
	mapStateToProps,
	{ fetchServicesRequested }
)(ServicesListScreen);
