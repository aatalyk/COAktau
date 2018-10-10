import React, { Component } from 'react';
import { View, Image, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ScaledImage extends Component {
	state = {
		width: SCREEN_WIDTH,
		height: SCREEN_WIDTH * 0.7,
		loading: true
	};

	componentDidMount() {
		if (this.props.source.uri) {
			Image.getSize(this.props.source.uri, (width, height) => {
				this.setState({ width, height });
			});
		}
	}

	onLoad = () => this.setState({ loading: false });

	render() {
		const { width, height } = this.state;
		const ratio = width < SCREEN_WIDTH ? width / SCREEN_WIDTH + 1 : SCREEN_WIDTH / width;

		return (
			<View>
				<Image
					source={this.props.source}
					style={{
						height: height * ratio,
						width: width * ratio
					}}
					{...this.props}
					onLoad={this.onLoad}
				/>
				<ActivityIndicator animating={this.state.loading} style={styles.indicator} />
			</View>
		);
	}
}

ScaledImage.propTypes = {
	source: PropTypes.shape({
		uri: PropTypes.string.isRequired
	}).isRequired
};

const styles = StyleSheet.create({
	indicator: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	}
});

export { ScaledImage };
