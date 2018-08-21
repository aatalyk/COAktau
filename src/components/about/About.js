import React, { Component } from 'react';
import { Text, Image, StyleSheet, Dimensions, Animated } from 'react-native';

import { images, textStyles } from '../../assets';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class About extends Component {
	constructor(props) {
		super(props);
		this.scrollY = new Animated.Value(0);
	}

	render() {
		return (
			<Animated.ScrollView
				style={styles.container}
				scrollEventThrottle={1}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], {
					useNativeDriver: true
				})}
			>
				<Animated.Image
					source={images.example}
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
				<Text style={styles.text}>
					At Microsoft, giving is ingrained in our culture, and our employees are passionate about giving
					time, money, and skills to address the issues facing our world. It’s part of our culture and how we
					live our mission to empower every person on the planet to achieve more.At Microsoft, giving is
					ingrained in our culture, and our employees are passionate about giving time, money, and skills to
					address the issues facing our world. It’s part of our culture and how we live our mission to empower
					every person on the planet to achieve more.At Microsoft, giving is ingrained in our culture, and our
					employees are passionate about giving time, money, and skills to address the issues facing our
					world. It’s part of our culture and how we live our mission to empower every person on the planet to
					achieve more.At Microsoft, giving is ingrained in our culture, and our employees are passionate
					about giving time, money, and skills to address the issues facing our world. It’s part of our
					culture and how we live our mission to empower every person on the planet to achieve more.{' '}
				</Text>
			</Animated.ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white'
	},
	image: {
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT / 3
	},
	text: {
		...textStyles.p,
		margin: 10
	}
});

export { About };
