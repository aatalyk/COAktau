import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, Animated } from 'react-native';
import PropTypes from 'prop-types';

import { textStyles } from '../../assets';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const propTypes = {
	navigation: PropTypes.object
};

class NotificationPage extends Component {
	constructor(props) {
		super(props);
		this.scrollY = new Animated.Value(0);
	}

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
					source={{ uri: item.imageURL }}
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
				<Text style={styles.text}>{item.description}</Text>
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
		...textStyles.h1,
		margin: 10,
		marginBottom: 0
	},
	text: {
		...textStyles.p,
		margin: 10
	}
});

export { NotificationPage };
