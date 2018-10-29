import React, { Component } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMyCityRequested } from '../actions';
import { MyCityItem } from './MyCityItem';
import { colors } from '../assets';
import { PlaceHolderList } from '../components/common';

const propTypes = {
	navigation: PropTypes.object,
	loading: PropTypes.bool,
	news: PropTypes.array,
	fetchMyCityRequested: PropTypes.func,
	lang: PropTypes.string
};

class MyCityScreen extends Component {
	componentDidMount() {
		this.props.fetchMyCityRequested();
	}

	renderItem = ({ item }) => <MyCityItem item={item} onPress={this.onPress(item)} lang={this.props.lang} />;

	keyExtractor = (_, index) => index + '';

	renderSeparator = () => <View style={styles.separator} />;

	onPress = item => () => this.props.navigation.navigate('MyCityDetailed', { item });

	onRefresh = () => this.props.fetchMyCityRequested();

	render() {
		const { loading, news } = this.props;
		return loading ? (
			<View style={styles.placeHolderContainer}>
				<PlaceHolderList />
			</View>
		) : (
			<View style={styles.container}>
				<FlatList
					data={news}
					renderItem={this.renderItem}
					keyExtractor={this.keyExtractor}
					ItemSeparatorComponent={this.renderSeparator}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={this.onRefresh} />}
				/>
			</View>
		);
	}
}

MyCityScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	placeHolderContainer: {
		flex: 1,
		backgroundColor: 'white'
	},
	separator: {
		height: 1,
		backgroundColor: colors.grayUltraLight,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10
	}
});

const mapStateToProps = ({ myCity, settings }) => ({
	news: myCity.news,
	loading: myCity.loading,
	lang: settings.lang
});

export const MyCity = connect(
	mapStateToProps,
	{ fetchMyCityRequested }
)(MyCityScreen);
