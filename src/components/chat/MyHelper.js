import React, { Component } from 'react';
import { View, Text, Image, FlatList, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header } from '../navigation';
import { IconButton } from '../common';
import { images, textStyles, colors, settings } from '../../assets';
import { fetchDictionaryRequested } from '../../actions';

const propTypes = {
	lang: PropTypes.string,
	navigation: PropTypes.object
};

class MyHelperScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			header: () => (
				<Header
					titleKaz={settings.kaz.navigation.myHelper}
					titleRus={settings.rus.navigation.myHelper}
					leftItem={<IconButton imgSource={images.menu} onPress={() => navigation.openDrawer()} />}
				/>
			)
		};
	};

	renderSeparator = () => <View style={styles.separator} />;

	renderItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={() => this.onPress(item)}>
				<View style={styles.detailContainer}>
					<View style={styles.titleContainer}>
						<Image source={item.icon} style={styles.imageLeft} />
						<Text style={styles.title}>{item.title}</Text>
						<Image source={images.right} style={styles.imageRight} />
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	onPress = helper => this.props.navigation.navigate('Dictionary', { helper });

	render() {
		const helpers = [{ id: 1, title: settings[this.props.lang].navigation.dictionary, icon: images.dictionary }];
		return (
			<View style={styles.container}>
				<FlatList data={helpers} renderItem={this.renderItem} keyExtractor={(_, index) => index + ''} />
			</View>
		);
	}
}

MyHelperScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.soLightBlue
	},
	detailContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10,
		marginBottom: 0,
		backgroundColor: 'white',
		minHeight: 100,
		borderRadius: 10
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 20
	},
	title: {
		flex: 1,
		...textStyles.p
	},
	imageLeft: {
		width: 30,
		height: 30,
		margin: 10
	},
	imageRight: {
		width: 20,
		height: 20,
		margin: 10
	},
	separator: {
		height: 0.5,
		backgroundColor: colors.grayUltraLight,
		marginLeft: 10,
		marginRight: 10
	}
});

const mapStateToProps = ({ settings, dictionary }) => ({
	lang: settings.lang,
	loading: dictionary.loading,
	helpers: dictionary.helpers
});

export const MyHelper = connect(
	mapStateToProps,
	{ fetchDictionaryRequested }
)(MyHelperScreen);
