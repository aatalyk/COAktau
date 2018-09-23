import React, { Component } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Header } from '../navigation';
import { IconButton } from '../common';
import { colors, images, textStyles } from '../../assets';

const propTypes = {
	navigation: PropTypes.object,
	lang: PropTypes.oneOf(['kaz', 'rus'])
};

class ServiceDetailsScreen extends Component {
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
		this.props.navigation.setParams({ titleKaz: item.title, titleRus: item.title });
	};

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

	renderSeparator = () => <View style={styles.separator} />;

	onPress = item => {
		item.calc
			? this.props.navigation.navigate('CalcScreen', { item })
			: this.props.navigation.navigate('AboutService', { item });
	};

	render() {
		const { details } = this.props.navigation.getParam('item', {});
		return (
			<View style={styles.container}>
				<FlatList
					data={details}
					renderItem={this.renderItem}
					keyExtractor={(_, index) => index + ''}
					ItemSeparatorComponent={this.renderSeparator}
				/>
			</View>
		);
	}
}

ServiceDetailsScreen.propTypes = propTypes;

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
	}
});

const mapStateToProps = ({ settings }) => ({ lang: settings.lang });

export const ServiceDetails = connect(mapStateToProps)(ServiceDetailsScreen);
