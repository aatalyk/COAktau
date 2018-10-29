import React, { Component } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchNewsItemRequested } from '../../actions';
import { textStyles, images, colors } from '../../assets';
import { Header } from '../navigation';
import { IconButton, PlaceHolder } from '../common';
import { ScaledImage } from '../common';
import { addViewCount } from '../../config';

const propTypes = {
	loading: PropTypes.bool,
	newsItem: PropTypes.object,
	fetchNewsItemRequested: PropTypes.func,
	navigation: PropTypes.object
};

const SCREEN_WIDTH = Dimensions.get('window').width;

class NewsPageScreen extends Component {
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
		this.fetchNewsItem();
	}

	setHeaderTitle = () => {
		const item = this.getItem();
		this.props.navigation.setParams({ titleKaz: item.title, titleRus: item.title });
	};

	fetchNewsItem = () => {
		const { id } = this.getItem();
		addViewCount('news', id);
		this.props.fetchNewsItemRequested(id);
	};

	getItem = () => this.props.navigation.getParam('item', {});

	render() {
		const { loading, newsItem } = this.props;
		return loading ? (
			<View style={styles.placeHolderContainer}>
				<PlaceHolder />
			</View>
		) : (
			<ScrollView style={styles.container}>
				<ScaledImage source={{ uri: newsItem.icon }} />
				<Text style={styles.title}>{newsItem.title}</Text>
				<View style={styles.line} />
				<View style={styles.view}>
					<Image style={styles.icon} source={images.view} />
					<Text style={styles.text}>{newsItem.viewCount + 1}</Text>
				</View>
				<Text style={styles.description}>{newsItem.text}</Text>
			</ScrollView>
		);
	}
}

NewsPageScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		backgroundColor: 'white'
	},
	placeHolderContainer: {
		flex: 1,
		backgroundColor: 'white'
	},
	view: {
		flexDirection: 'row',
		margin: 20,
		marginBottom: 0
	},
	icon: {
		width: 20,
		height: 20,
		marginRight: 10
	},
	text: {
		flex: 1,
		...textStyles.p,
		color: colors.grayDark
	},
	image: {
		width: SCREEN_WIDTH,
		height: 200
	},
	title: {
		...textStyles.h2,
		marginHorizontal: 15,
		margin: 20
	},
	line: {
		backgroundColor: colors.soBlue,
		height: 3,
		width: SCREEN_WIDTH * 0.2,
		marginLeft: 20,
		borderRadius: 2
	},
	description: {
		...textStyles.p,
		marginHorizontal: 15,
		marginTop: 10,
		marginBottom: 20,
		lineHeight: 30
	}
});

const mapStateToProps = ({ news }) => ({
	loading: news.loading,
	newsItem: news.newsItem
});

export const NewsPage = connect(
	mapStateToProps,
	{ fetchNewsItemRequested }
)(NewsPageScreen);
