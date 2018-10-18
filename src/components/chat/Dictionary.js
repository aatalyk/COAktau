import React, { Component } from 'react';
import { View, Text, Image, FlatList, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header } from '../navigation';
import { IconButton, PlaceHolderList } from '../common';
import { images, textStyles, colors, settings } from '../../assets';
import { fetchDictionaryRequested } from '../../actions';

const propTypes = {
	navigation: PropTypes.object,
	loading: PropTypes.bool,
	fetchDictionaryRequested: PropTypes.func,
	helpers: PropTypes.array
};

class DictionaryScreen extends Component {
	componentDidMount() {
		this.props.fetchDictionaryRequested();
	}

	static navigationOptions = ({ navigation }) => {
		return {
			header: () => (
				<Header
					titleKaz={settings.kaz.navigation.dictionary}
					titleRus={settings.rus.navigation.dictionary}
					leftItem={<IconButton imgSource={images.back} onPress={() => navigation.goBack()} />}
					rightItem={<IconButton imgSource={images.chat} onPress={() => navigation.navigate('Chat')} />}
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
						<Image source={{ uri: item.icon }} style={styles.imageLeft} />
						<Text style={styles.title}>{item.title}</Text>
						<Image source={images.right} style={styles.imageRight} />
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	onPress = helper => this.props.navigation.navigate('PhraseList', { helper });

	onRefresh = () => this.props.fetchDictionaryRequested();

	render() {
		const { loading, helpers } = this.props;
		return loading ? (
			<View style={styles.placeHolderContainer}>
				<PlaceHolderList />
			</View>
		) : (
			<View style={styles.container}>
				<FlatList
					data={helpers}
					renderItem={this.renderItem}
					keyExtractor={(_, index) => index + ''}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={this.onRefresh} />}
				/>
			</View>
		);
	}
}

DictionaryScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.soLightBlue
	},
	placeHolderContainer: {
		flex: 1,
		backgroundColor: 'white'
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

const mapStateToProps = ({ dictionary }) => ({
	loading: dictionary.loading,
	helpers: dictionary.helpers
});

export const Dictionary = connect(
	mapStateToProps,
	{ fetchDictionaryRequested }
)(DictionaryScreen);
