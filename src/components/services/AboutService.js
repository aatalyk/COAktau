import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';
import PropTypes from 'prop-types';

import { Header } from '../navigation';
import { IconButton } from '../common';
import { images, textStyles } from '../../assets';

const propTypes = {
	navigation: PropTypes.object
};

class AboutService extends Component {
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
		const item = this.props.navigation.getParam('item', {});
		this.props.navigation.setParams({ titleKaz: item.title, titleRus: item.title });
	};

	render() {
		const item = this.props.navigation.getParam('item', {});
		return (
			<ScrollView style={styles.container}>
				<HTMLView value={`${item ? item.detail : ''}`} style={styles.htmlView} stylesheet={styles} />
			</ScrollView>
		);
	}
}

AboutService.propTypes = propTypes;

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

export { AboutService };
