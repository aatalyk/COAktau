import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Header } from '../navigation';
import { IconButton } from '../common';
import { images, textStyles, colors, settings } from '../../assets';

const rooms = [
	{
		title: 'Room One',
		id: 1,
		messages: [
			{
				_id: 1,
				text: 'First message',
				createdAt: new Date(),
				user: {
					_id: 2,
					avatar: null
				}
			}
		]
	},
	{
		title: 'Room Two',
		id: 1,
		messages: [
			{
				_id: 1,
				text: 'First message',
				createdAt: new Date(),
				user: {
					_id: 2,
					avatar: null
				}
			}
		]
	}
];

const propTypes = {
	navigation: PropTypes.object
};

class ChatRooms extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			header: () => (
				<Header
					titleKaz={settings.kaz.navigation.chatRooms}
					titleRus={settings.rus.navigation.chatRooms}
					leftItem={<IconButton imgSource={images.menu} onPress={() => navigation.openDrawer()} />}
					rightItem={<IconButton imgSource={images.chat} onPress={() => navigation.navigate('Chat')} />}
				/>
			)
		};
	};

	renderItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={() => this.onPress(item)}>
				<View style={styles.detailContainer}>
					<Text style={styles.title}>{item.title}</Text>
					<Image source={images.right} style={styles.image} />
				</View>
			</TouchableOpacity>
		);
	};

	onPress = room => this.props.navigation.navigate('Chat', { room });

	render() {
		return (
			<View style={styles.container}>
				<FlatList data={rooms} renderItem={this.renderItem} keyExtractor={(_, index) => index + ''} />
			</View>
		);
	}
}

ChatRooms.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	detailContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 20
	},
	title: {
		flex: 1,
		...textStyles.p
	},
	image: {
		width: 20,
		height: 20
	},
	separator: {
		height: 0.5,
		backgroundColor: colors.grayUltraLight,
		marginLeft: 10,
		marginRight: 10
	}
});

export { ChatRooms };
