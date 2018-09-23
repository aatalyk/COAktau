import React, { Component } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Header } from '../navigation';
import { IconButton } from '../common';
import { addToMyServices, removeFromMyServices } from '../../actions';
import { colors, images, textStyles, settings } from '../../assets';

const propTypes = {
	navigation: PropTypes.object,
	lang: PropTypes.oneOf(['kaz', 'rus']),
	addToMyServices: PropTypes.func,
	removeFromMyServices: PropTypes.func,
	myServices: PropTypes.array
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
	}

	setHeaderTitle = () => {
		const item = this.props.navigation.getParam('item', {});
		this.props.navigation.setParams({ titleKaz: item.kaz.title, titleRus: item.rus.title });
	};

	addToMyServices = serviceItem => () => this.props.addToMyServices(serviceItem);

	removeFromMyServices = serviceItem => () => this.props.removeFromMyServices(serviceItem);

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

	onPress = item => this.props.navigation.navigate('ServiceDetails', { item });

	render() {
		const { lang, myServices, navigation } = this.props;
		const item = navigation.getParam('item', {});

		const isInMyServices = myServices.filter(i => i[lang].title === item[lang].title).length > 0; // true if an item with the same title exists in myServices

		const onButtonPress = isInMyServices ? this.removeFromMyServices(item) : this.addToMyServices(item);
		const buttonTitle = isInMyServices
			? settings[lang].buttons.removeFromMyServices
			: settings[lang].buttons.addToMyServices;

		return (
			<View style={styles.container}>
				<FlatList
					data={item[this.props.lang].list}
					renderItem={this.renderItem}
					keyExtractor={(_, index) => index + ''}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
				/>
				<TouchableOpacity onPress={onButtonPress}>
					<View
						style={[
							styles.buttonContainer,
							{ backgroundColor: isInMyServices ? colors.orange : colors.blue }
						]}
					>
						<Text style={styles.buttonText}>{buttonTitle}</Text>
					</View>
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

const mapStateToProps = ({ settings, myServices }) => ({
	lang: settings.lang,
	myServices
});

export const Services = connect(
	mapStateToProps,
	{ addToMyServices, removeFromMyServices }
)(ServicesScreen);
