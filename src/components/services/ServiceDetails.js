import React, { Component } from 'react';
import { View, FlatList, Text, Image, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Header } from '../navigation';
import { IconButton } from '../common';
import { url } from '../../config';
import { fetchServicesTitlesRequested } from '../../actions';
import { colors, images, textStyles } from '../../assets';

const propTypes = {
	navigation: PropTypes.object,
	lang: PropTypes.oneOf(['kaz', 'rus']),
	item: PropTypes.object,
	loading: PropTypes.bool,
	fetchServicesTitlesRequested: PropTypes.func,
	titles: PropTypes.array
};

class ServiceDetailsScreen extends Component {
	state = {
		titles: []
	};

	componentDidMount() {
		this.fetchServicesTitles();
	}

	fetchServicesTitles = () => {
		const { lang, item } = this.props;
		fetch(`${url}/services/${item[lang].serviceId}/${item[lang].id}`)
			.then(response => response.json())
			.then(json => {
				const titles = json.kaz.map((item, index) => ({
					kaz: item,
					rus: json.rus[index]
				}));
				this.setState({
					titles: titles
				});
			})
			.catch(error => {});
	};

	renderItem = ({ item }) => {
		const { lang } = this.props;
		return (
			<TouchableOpacity onPress={() => this.onPress(item)}>
				<View style={styles.detailContainer}>
					<Text style={styles.title}>{item[lang].title}</Text>
					<Image source={images.right} style={styles.image} />
				</View>
			</TouchableOpacity>
		);
	};

	renderSeparator = () => <View style={styles.separator} />;

	onPress = item => this.props.navigation.navigate('AboutService', { item });

	onRefresh = () => this.fetchServicesTitles();

	render() {
		const { loading } = this.props;
		const { titles } = this.state;
		return (
			<View style={styles.container}>
				<FlatList
					data={titles}
					renderItem={this.renderItem}
					keyExtractor={(_, index) => index + ''}
					ItemSeparatorComponent={this.renderSeparator}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={this.onRefresh} />}
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
		margin: 20,
		marginLeft: 30
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

const mapStateToProps = ({ settings, services }) => ({
	lang: settings.lang,
	loading: services.loading,
	titles: services.titles
});

export const ServiceDetails = connect(
	mapStateToProps,
	{ fetchServicesTitlesRequested }
)(ServiceDetailsScreen);
