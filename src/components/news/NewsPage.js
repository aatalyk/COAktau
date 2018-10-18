import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import { textStyles, images, colors } from '../../assets';
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

		return (
			<ScrollView style={styles.container}>
				<ScaledImage source={{ uri: item.icon }} />
				<Text style={styles.title}>{item.title}</Text>
				<View style={styles.line} />
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

export { NewsPage };
