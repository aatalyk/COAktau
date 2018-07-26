import React, { Component } from 'react';
import { ScrollView, Text, Image, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import { Header } from '../navigation';
import { IconButton } from '../common';
import { images, fonts } from '../../assets';

const propTypes = {
	navigation: PropTypes.object
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class NewsPage extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'News',
		header: () => (
			<Header
				title="News"
				leftItem={<IconButton imgSource={images.back} onPress={() => navigation.goBack()} />}
			/>
		)
	});

	render() {
		const item = this.props.navigation.getParam('item');
		return (
			<ScrollView style={styles.container}>
				<Image source={item.imgSource} style={styles.image} />
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>{item.description}</Text>
			</ScrollView>
		);
	}
}

NewsPage.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		backgroundColor: 'white'
	},
	image: {
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT / 3,
		justifyContent: 'center'
	},
	title: {
		fontSize: 22,
		fontFamily: fonts.MerriweatherBlack,
		margin: 5
	},
	description: {
		fontSize: 20,
		fontFamily: fonts.MerriweatherRegular,
		margin: 5
	}
});

export { NewsPage };
