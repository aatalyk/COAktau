import React, { Component } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMyCityRequested } from '../actions';
import { MyCityItem } from './MyCityItem';
import { colors } from '../assets';

const propTypes = {
	navigation: PropTypes.object,
	loading: PropTypes.bool,
	news: PropTypes.array,
	fetchMyCityRequested: PropTypes.func,
	lang: PropTypes.string
};

const data = [
	{
		imageUrls: [
			'https://sportshub.cbsistatic.com/i/r/2018/09/13/358b7d4f-ad4c-434a-89e7-089c39bd7d96/thumbnail/770x433/333e34ee5754a4291d887656c1ad4f2e/gennady-golovkin-training-canelo.jpg',
			'https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/embed/public/2018/09/28/canelo-alvarez-gennady-golovkin.jpg'
		],
		image:
			'https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/embed/public/2018/09/28/canelo-alvarez-gennady-golovkin.jpg',
		title:
			'Not too bad. However, you’re not seeing the real benefits since its on WiFi. Lets see the same image loading on 3G.',
		body: 'Body ma ne mynau'
	},
	{
		imageUrls: [
			'https://sportshub.cbsistatic.com/i/r/2018/09/13/358b7d4f-ad4c-434a-89e7-089c39bd7d96/thumbnail/770x433/333e34ee5754a4291d887656c1ad4f2e/gennady-golovkin-training-canelo.jpg',
			'https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/embed/public/2018/09/28/canelo-alvarez-gennady-golovkin.jpg'
		],
		image:
			'https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/embed/public/2018/09/28/canelo-alvarez-gennady-golovkin.jpg',
		title: 'Title goi mynau',
		body: 'Body ma ne mynau'
	},
	{
		video:
			'https://firebasestorage.googleapis.com/v0/b/coaktau-274df.appspot.com/o/0hh1.mp4?alt=media&token=1f45206a-dee6-4f3e-b71b-cd500426556a',
		image:
			'https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/embed/public/2018/09/28/canelo-alvarez-gennady-golovkin.jpg',
		title: 'Title goi mynau',
		body: 'Body ma ne mynau'
	}
];

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
		return (
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
