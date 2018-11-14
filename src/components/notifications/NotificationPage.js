import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import HTMLView from 'react-native-htmlview';
import PropTypes from 'prop-types';

import { textStyles, images, colors } from '../../assets';
import { Header } from '../navigation';
import { IconButton } from '../common';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const propTypes = {
	navigation: PropTypes.object
};

class NotificationPage extends Component {
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

	constructor(props) {
		super(props);
		this.scrollY = new Animated.Value(0);
	}

	componentDidMount() {
		this.setHeaderTitle();
	}

	setHeaderTitle = () => {
		const item = this.getItem();
		this.props.navigation.setParams({ titleKaz: item.title, titleRus: item.title });
	};

	getItem = () => this.props.navigation.getParam('item', {});

	renderNode = (node, index, siblings, parent, defaultRenderer) => {
		if (node.name == 'img') {
			return <Image source={{ uri: node.attribs.src }} style={{ width: 200, height: 200 }} />;
		}
	};

	render() {
		const item = this.props.navigation.getParam('item', {});
		return (
			<Animated.ScrollView
				style={styles.container}
				scrollEventThrottle={1}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], {
					useNativeDriver: true
				})}
			>
				<Animated.Image
					source={{ uri: item.icon }}
					resizeMode="contain"
					style={{
						...styles.image,
						transform: [
							{
								scale: this.scrollY.interpolate({
									inputRange: [-1, 0, 1],
									outputRange: [1.001, 1, 1]
								})
							},
							{
								translateY: this.scrollY.interpolate({
									inputRange: [-1, 0, 1],
									outputRange: [-1, 0, 0]
								})
							}
						]
					}}
				/>
				<Text style={styles.title}>{item.title}</Text>
				<View style={styles.line} />
				<HTMLView value={item.text} renderNode={this.renderNode} style={styles.body} stylesheet={styles} />
			</Animated.ScrollView>
		);
	}
}

NotificationPage.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white'
	},
	image: {
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT / 3
	},
	title: {
		...textStyles.h2,
		margin: 20
	},
	line: {
		backgroundColor: colors.soBlue,
		height: 3,
		width: SCREEN_WIDTH * 0.2,
		marginLeft: 20,
		borderRadius: 2
	},
	text: {
		...textStyles.p,
		margin: 20
	},
	body: {
		...textStyles.p,
		marginHorizontal: 15,
		margin: 20,
		lineHeight: 30
	},
	htmlView: {
		margin: 10
	},
	p: {
		...textStyles.p
	},
	div: {
		...textStyles.p
	},
	a: {
		fontWeight: '300',
		color: '#FF3366' // make links coloured pink
	},
	b: {
		fontWeight: 'bold'
	}
});

export { NotificationPage };
