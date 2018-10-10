import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import { textStyles, images } from '../../assets';
import { Header } from '../navigation';
import { IconButton } from '../common';
import { ScaledImage } from '../common';

const propTypes = {
	navigation: PropTypes.object
};

const SCREEN_WIDTH = Dimensions.get('window').width;

class NewsPage extends Component {
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
		const item = this.getItem();
		this.props.navigation.setParams({ titleKaz: item.title, titleRus: item.title });
	};

	getItem = () => this.props.navigation.getParam('item', {});

	render() {
		const item = this.props.navigation.getParam('item');
		const lang = this.props.navigation.getParam('lang');

		return (
			<ScrollView style={styles.container}>
				<ScaledImage source={{ uri: item.icon }} />
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>{item.text}</Text>
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
		height: 200
	},
	title: {
		...textStyles.h1,
		marginHorizontal: 15,
		marginTop: 10
	},
	description: {
		...textStyles.p,
		marginHorizontal: 15,
		marginTop: 10,
		marginBottom: 20,
		lineHeight: 30
	}
});

export { NewsPage };
