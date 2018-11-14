import React, { Component } from 'react';
import { View, Text, Image, FlatList, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header } from '../navigation';
import { IconButton, PlaceHolderList, SearchBar } from '../common';
import { images, textStyles, colors, settings } from '../../assets';
import { fetchDictionaryRequested } from '../../actions';

const propTypes = {
	lang: PropTypes.string,
	navigation: PropTypes.object,
	loading: PropTypes.bool,
	fetchDictionaryRequested: PropTypes.func,
	helpers: PropTypes.array
};

class PhraseListScreen extends Component {
	state = {
		data: []
	};

	componentDidMount() {
		this.props.fetchDictionaryRequested();
		const { messages } = this.props.navigation.getParam('helper', {});
		this.setState({
			data: messages
		});
	}

	static navigationOptions = ({ navigation }) => {
		return {
			header: () => (
				<Header
					titleKaz={settings.kaz.navigation.dictionary}
					titleRus={settings.rus.navigation.dictionary}
					leftItem={<IconButton imgSource={images.back} onPress={() => navigation.goBack()} />}
				/>
			)
		};
	};

	renderSearchBar = () => <SearchBar lang={this.props.lang} search={this.search} clear={this.clear} />;

	renderSeparator = () => <View style={styles.separator} />;

	renderItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={() => this.onPress(item)}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{item.text}</Text>
					<Image source={images.right} style={styles.imageRight} />
				</View>
			</TouchableOpacity>
		);
	};

	search = text => {
		this.setState({
			data: this.filter(text)
		});
	};

	clear = () => {
		const { messages } = this.props.navigation.getParam('helper', {});
		this.setState({
			data: messages
		});
	};

	filter = text => {
		const { messages } = this.props.navigation.getParam('helper', {});
		return messages.filter(item => {
			const question = item.text.toLowerCase();
			return question.indexOf(text.toLowerCase()) >= 0;
		});
	};

	onPress = dictionary => this.props.navigation.navigate('Chat', { dictionary });

	onRefresh = () => this.props.fetchDictionaryRequested();

	render() {
		const { loading, lang, navigation } = this.props;
		return loading ? (
			<View style={styles.placeHolderContainer}>
				<PlaceHolderList />
			</View>
		) : (
			<View style={styles.container}>
				<FlatList
					data={this.state.data}
					renderItem={this.renderItem}
					keyExtractor={(_, index) => index + ''}
					ListHeaderComponent={this.renderSearchBar}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={this.onRefresh} />}
				/>
			</View>
		);
	}
}

PhraseListScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	placeHolderContainer: {
		flex: 1,
		backgroundColor: 'white'
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

export const PhraseList = connect(
	mapStateToProps,
	{ fetchDictionaryRequested }
)(PhraseListScreen);
