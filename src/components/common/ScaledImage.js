import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ScaledImage extends Component {
	state = {
		width: SCREEN_WIDTH,
		height: SCREEN_WIDTH * 0.7
	};

	componentDidMount() {
		if (this.props.source.uri) {
			Image.getSize(this.props.source.uri, (width, height) => {
				this.setState({ width, height });
			});
		}
	}

	render() {
		const { width, height } = this.state;
		const ratio = width < SCREEN_WIDTH ? width / SCREEN_WIDTH + 1 : SCREEN_WIDTH / width;

		return (
			<Image
				source={this.props.source}
				style={{
					height: height * ratio,
					width: width * ratio
				}}
				{...this.props}
			/>
		);
	}
}

ScaledImage.propTypes = {
	source: PropTypes.shape({
		uri: PropTypes.string.isRequired
	}).isRequired
};

export { ScaledImage };
