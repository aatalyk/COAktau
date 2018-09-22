import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { Header } from '../navigation';
import { IconButton } from '../common';
import { images, textStyles, colors, settings } from '../../assets';

const rooms = [{ title: 'Room One', id: 1 }, { title: 'Room Two', id: 2 }];

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
			<TouchableOpacity onPress={() => console.log('Press')}>
				<View style={styles.detailContainer}>
					<Text style={styles.title}>{item.title}</Text>
					<Image source={images.right} style={styles.image} />
				</View>
			</TouchableOpacity>
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<FlatList data={rooms} renderItem={this.renderItem} keyExtractor={(_, index) => index + ''} />
			</View>
		);
	}
}

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
