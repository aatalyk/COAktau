import React, { Component } from 'react';
import { View, Text, Image, FlatList, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header } from '../navigation';
import { IconButton } from '../common';
import { images, textStyles, colors, settings } from '../../assets';
import { fetchChatRoomsRequested } from '../../actions';

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
	navigation: PropTypes.object,
	loading: PropTypes.bool,
	fetchChatRoomsRequested: PropTypes.func,
	rooms: PropTypes.array
};

class ChatRoomsScreen extends Component {
	componentDidMount() {
		this.props.fetchChatRoomsRequested();
	}

	static navigationOptions = ({ navigation }) => {
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

	renderSeparator = () => <View style={styles.separator} />;

	renderItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={() => this.onPress(item)}>
				<View style={styles.detailContainer}>
					<View style={styles.titleContainer}>
						<Image source={images.shoes} style={styles.imageLeft} />
						<Text style={styles.title}>{item.title}</Text>
						<Image source={images.right} style={styles.imageRight} />
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	onPress = room => this.props.navigation.navigate('Chat', { room });

	onRefresh = () => this.props.fetchChatRoomsRequested();

	render() {
		const { loading, rooms } = this.props;
		return (
			<View style={styles.container}>
				<FlatList
					data={rooms}
					renderItem={this.renderItem}
					keyExtractor={(_, index) => index + ''}
					ItemSeparatorComponent={this.renderSeparator}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={this.onRefresh} />}
				/>
			</View>
		);
	}
}

ChatRoomsScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.soLightBlue
	},
	detailContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10,
		marginBottom: 0,
		backgroundColor: 'white',
		minHeight: 100,
		borderRadius: 10
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 20
	},
	title: {
		flex: 1,
		...textStyles.p
	},
	imageLeft: {
		width: 30,
		height: 30,
		margin: 10
	},
	imageRight: {
		width: 20,
		height: 20,
		margin: 10
	},
	separator: {
		height: 0.5,
		backgroundColor: colors.grayUltraLight,
		marginLeft: 10,
		marginRight: 10
	}
});

const mapStateToProps = ({ chatRooms }) => ({
	loading: chatRooms.loading,
	rooms: chatRooms.rooms
});

export const ChatRooms = connect(
	mapStateToProps,
	{ fetchChatRoomsRequested }
)(ChatRoomsScreen);
