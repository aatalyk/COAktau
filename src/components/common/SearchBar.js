import React, { Component } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { images, colors, settings, textStyles } from '../../assets';

const propTypes = {
	title: PropTypes.string,
	search: PropTypes.func,
	clear: PropTypes.func,
	lang: PropTypes.string
};

class SearchBar extends Component {
	state = {
		text: ''
	};

	search = text => {
		this.setState({ text });
		this.props.search(text);
	};

	clear = () => {
		this.setState({ text: '' });
		this.props.clear();
	};

	onPress = () => this.props.search(this.state.text);

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.searchContainer}>
					<TouchableOpacity onPress={this.onPress} style={styles.buttonContainer}>
						<Image source={images.search} style={styles.image} />
					</TouchableOpacity>
					<TextInput
						value={this.state.text}
						placeholder={settings[this.props.lang].text.search}
						onChangeText={this.search}
						style={styles.textInput}
					/>
				</View>
				<TouchableOpacity onPress={this.clear} style={styles.buttonContainer}>
					<Image source={images.close} style={styles.image} />
				</TouchableOpacity>
			</View>
		);
	}
}

SearchBar.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.soLightBlue,
		height: 50
	},
	searchContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 15,
		height: 30,
		marginLeft: 5,
		marginRight: 5
	},
	buttonContainer: {
		width: 44,
		height: 44,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textInput: {
		flex: 1,
		...textStyles.p,
		marginRight: 10,
		height: 44
	},
	image: {
		width: 15,
		height: 15,
		marginLeft: 10,
		marginRight: 10
	}
});

export { SearchBar };
