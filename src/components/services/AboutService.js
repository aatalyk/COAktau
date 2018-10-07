import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Header } from '../navigation';
import { IconButton } from '../common';
import { fetchServicesPostRequested } from '../../actions';
import { images, textStyles } from '../../assets';

const propTypes = {
	navigation: PropTypes.object,
	fetchServicesPostRequested: PropTypes.func,
	post: PropTypes.string
};

class AboutServiceScreen extends Component {
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
		this.fetchServicesPost();
	}

	setHeaderTitle = () => {
		const item = this.getItem();
		this.props.navigation.setParams({ titleKaz: item.title, titleRus: item.title });
	};

	fetchServicesPost = () => {
		const item = this.getItem();
		this.props.fetchServicesPostRequested(item.serviceId, item.subServiceId, item.id);
	};

	getItem = () => this.props.navigation.getParam('item', {});

	render() {
		const { post } = this.props;
		return (
			<ScrollView style={styles.container}>
				<HTMLView value={post} style={styles.htmlView} stylesheet={styles} />
			</ScrollView>
		);
	}
}

AboutServiceScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	htmlView: {
		margin: 10
	},
	p: {
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

const mapStateToProps = ({ services }) => ({
	post: services.post
});

export const AboutService = connect(
	mapStateToProps,
	{ fetchServicesPostRequested }
)(AboutServiceScreen);
