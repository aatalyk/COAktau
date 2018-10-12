import React, { Component } from 'react';
import { Text, StyleSheet, ActivityIndicator, Dimensions, Animated } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { images, textStyles } from '../../assets';
import { fetchAboutUsRequested } from '../../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const propTypes = {
	loading: PropTypes.bool,
	aboutData: PropTypes.object,
	fetchAboutUsRequested: PropTypes.func
};

class AboutScreen extends Component {
	constructor(props) {
		super(props);
		this.scrollY = new Animated.Value(0);
	}

	componentDidMount() {
		this.props.fetchAboutUsRequested();
	}

	onRefresh = () => this.props.fetchAboutUsRequested();

	render() {
		const { loading, aboutData } = this.props;
		return (
			<Animated.ScrollView
				style={styles.container}
				scrollEventThrottle={1}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], {
					useNativeDriver: true
				})}
				refreshControl={() => <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />}
			>
				<Animated.Image
					source={images.logoIcon}
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
				{loading ? (
					<ActivityIndicator refreshing={loading} />
				) : (
					<Text style={styles.text}>{aboutData ? aboutData.text : ''}</Text>
				)}
			</Animated.ScrollView>
		);
	}
}

AboutScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white'
	},
	image: {
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT / 3,
		marginTop: 10
	},
	text: {
		...textStyles.p,
		margin: 10
	}
});

const mapStateToProps = ({ about: { loading, aboutData }, settings: { lang } }) => {
	return {
		loading,
		aboutData
	};
};

export const About = connect(
	mapStateToProps,
	{ fetchAboutUsRequested }
)(AboutScreen);
