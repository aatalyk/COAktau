import React, { Component } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//import { fetchMyCityRequested } from '../../actions';
import { MyCityItem } from './MyCityItem';
import { colors } from '../assets';

const propTypes = {
	navigation: PropTypes.object,
	loading: PropTypes.bool,
	myCityItems: PropTypes.array,
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
		video: 'KVZ-P-ZI6W4',
		image:
			'https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/embed/public/2018/09/28/canelo-alvarez-gennady-golovkin.jpg',
		title: 'Title goi mynau',
		body: 'Body ma ne mynau'
	}
];

class MyCityScreen extends Component {
	renderItem = ({ item }) => <MyCityItem item={item} onPress={this.onPress(item)} lang={this.props.lang} />;

	keyExtractor = (_, index) => index + '';

	renderSeparator = () => <View style={styles.separator} />;

	onPress = item => () => this.props.navigation.navigate('MyCityDetailed', { item, lang: this.props.lang });

	onRefresh = () => console.log('Hello');

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={data}
					renderItem={this.renderItem}
					keyExtractor={this.keyExtractor}
					ItemSeparatorComponent={this.renderSeparator}
					refreshControl={<RefreshControl refreshing={this.props.loading} onRefresh={this.onRefresh} />}
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
		height: 0.5,
		backgroundColor: colors.grayUltraLight,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10
	}
});

const mapStateToProps = ({ news, settings }) => ({
	newsItems: news.newsItems,
	loading: news.loading,
	lang: settings.lang
});

export const MyCity = connect(
	mapStateToProps,
	{}
)(MyCityScreen);
