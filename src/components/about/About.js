import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	ActivityIndicator,
	RefreshControl,
	Dimensions,
	Animated
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { images, textStyles, settings, colors } from '../../assets';
import { fetchAboutUsRequested } from '../../actions';
import { ScaledImage, PlaceHolder } from '../common';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const propTypes = {
	lang: PropTypes.string,
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
			<ScrollView style={styles.container}>
				<ScaledImage source={images.social} resizeMode="cover" />
				{loading ? (
					<PlaceHolder />
				) : (
					<View>
						<Text style={styles.title}>{settings[this.props.lang].text.title.toUpperCase()}</Text>
						<View style={styles.line} />
						<Text style={styles.text}>{aboutData ? aboutData.text : ''}</Text>
					</View>
				)}
			</ScrollView>
		);
	}
}

AboutScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	image: {
		width: SCREEN_WIDTH,
		height: SCREEN_WIDTH,
		marginTop: 10
	},
	line: {
		backgroundColor: colors.soBlue,
		height: 3,
		width: SCREEN_WIDTH * 0.2,
		marginLeft: 20,
		borderRadius: 2
	},
	title: {
		...textStyles.h2,
		textAlign: 'left',
		margin: 20
	},
	text: {
		...textStyles.p,
		textAlign: 'left',
		margin: 20
	}
});

const mapStateToProps = ({ settings, about: { loading, aboutData } }) => ({
	lang: settings.lang,
	loading,
	aboutData
});

export const About = connect(
	mapStateToProps,
	{ fetchAboutUsRequested }
)(AboutScreen);
