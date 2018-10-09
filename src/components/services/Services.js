import React, { Component } from 'react';
import { View, FlatList, Text, Image, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import { Header } from '../navigation';
import { IconButton } from '../common';
import { addToMyServices, removeFromMyServices, fetchSubServicesRequested } from '../../actions';
import { colors, images, textStyles, settings } from '../../assets';

const propTypes = {
	navigation: PropTypes.object,
	lang: PropTypes.oneOf(['kaz', 'rus']),
	addToMyServices: PropTypes.func,
	removeFromMyServices: PropTypes.func,
	fetchSubServicesRequested: PropTypes.func,
	myServices: PropTypes.array,
	subServices: PropTypes.array,
	loading: PropTypes.bool
};

class ServicesScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			header: () => (
				<Header
					titleKaz={navigation.getParam('titleKaz', '')}
					titleRus={navigation.getParam('titleRus', '')}
					leftItem={<IconButton imgSource={images.back} onPress={() => navigation.goBack()} />}
				/>
			)
		};
	};

	componentDidMount() {
		this.setHeaderTitle();
		this.fetchSubServices();
	}

	setHeaderTitle = () => {
		const item = this.getItem();
		this.props.navigation.setParams({ titleKaz: item.title, titleRus: item.title });
	};

	fetchSubServices = () => {
		const item = this.getItem();
		this.props.fetchSubServicesRequested(item.id);
	};

	getItem = () => this.props.navigation.getParam('item', {});

	addToMyServices = serviceItem => () => this.props.addToMyServices(serviceItem);

	removeFromMyServices = serviceItem => () => this.props.removeFromMyServices(serviceItem);

	onRefresh = () => this.fetchSubServices();

	renderItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={() => this.onPress(item)}>
				<View style={styles.detailContainer}>
					<Text style={styles.title}>{item.title}</Text>
					<Image source={images.right} style={styles.image} />
				</View>
			</TouchableOpacity>
		);
	};

	onPress = item => {
		item.isCalc
			? this.props.navigation.navigate('CalcScreen')
			: this.props.navigation.navigate('ServiceDetails', { item });
	};

	render() {
		const { lang, myServices, subServices, loading } = this.props;
		const item = this.getItem();

		const isInMyServices = myServices.filter(i => i.title === item.title).length > 0; // true if an item with the same title exists in myServices

		const onButtonPress = isInMyServices ? this.removeFromMyServices(item) : this.addToMyServices(item);
		const buttonTitle = isInMyServices
			? settings[lang].buttons.removeFromMyServices
			: settings[lang].buttons.addToMyServices;

		return (
			<View style={styles.container}>
				<FlatList
					data={subServices}
					renderItem={this.renderItem}
					keyExtractor={(_, index) => index + ''}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={this.onRefresh} />}
				/>
				<TouchableOpacity onPress={onButtonPress}>
					<LinearGradient
						colors={
							isInMyServices
								? ['#8269deff', '#5495e9ff', '#5495e9ff']
								: ['#e33b6eff', '#d1478bff', '#d1478bff']
						}
						style={styles.buttonContainer}
					>
						<Text style={styles.buttonText}>{buttonTitle}</Text>
					</LinearGradient>
				</TouchableOpacity>
			</View>
		);
	}
}

ServicesScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	detailContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 20
	},
	title: {
		flex: 1,
		...textStyles.p
	},
	image: {
		width: 20,
		height: 20
	},
	separator: {
		height: 0.5,
		backgroundColor: colors.grayUltraLight,
		marginLeft: 10,
		marginRight: 10
	},
	buttonText: {
		...textStyles.p,
		color: 'white'
	},
	buttonContainer: {
		backgroundColor: colors.orange,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

const mapStateToProps = ({ settings, myServices, services }) => ({
	lang: settings.lang,
	myServices,
	loading: services.loading,
	subServices: services.subServices
});

export const Services = connect(
	mapStateToProps,
	{ addToMyServices, removeFromMyServices, fetchSubServicesRequested }
)(ServicesScreen);
