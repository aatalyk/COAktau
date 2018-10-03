import React, { Component } from 'react';
import { Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header } from '../navigation';
import { IconButton } from '../common';
import { images, settings } from '../../assets';
import { saveChatHistory, clearChatHistory } from '../../actions';

const propTypes = {
	navigation: PropTypes.object,
	lang: PropTypes.string,
	chat: PropTypes.array,
	saveChatHistory: PropTypes.func,
	clearChatHistory: PropTypes.func
};

class ChatScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			header: () => (
				<Header
					titleKaz={settings.kaz.navigation.chat}
					titleRus={settings.rus.navigation.chat}
					leftItem={<IconButton imgSource={images.back} onPress={() => navigation.goBack()} />}
					rightItem={<IconButton imgSource={images.options} onPress={() => params.showOptions()} />}
				/>
			)
		};
	};

	state = {
		id: 0,
		messages: []
	};

	onSend = messages => {
		const { id } = this.state;
		console.log('onSend id', id);
		this.setState(prevState => ({
			messages: GiftedChat.append(prevState.messages, messages)
		}));
	};

	showOptions = () => {
		Alert.alert(
			'Alert Title',
			'Alert Message',
			[
				{ text: 'Save Chat History', onPress: () => this.saveChatHistory() },
				{ text: 'Clear Chat History', onPress: () => this.clearChatHistory() },
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'destructive' }
			],
			{ cancelable: true }
		);
	};

	saveChatHistory = () => {
		const { id, messages } = this.state;
		const { lang } = this.props;
		console.log('save id lang', id, lang);
		this.props.clearChatHistory({ id, lang, messages });
		this.props.saveChatHistory({ id, lang, messages });
	};

	clearChatHistory = () => {
		const { id, messages } = this.state;
		const { lang } = this.props;
		this.props.clearChatHistory({ id, lang, messages });
		this.setState({
			id: id,
			messages: []
		});
	};

	componentDidMount() {
		const { lang, chat, navigation } = this.props;
		const chatID = navigation.getParam('id', 0);
		console.log('ChatID', chatID);
		const messages = chat.filter(item => item.id === chatID && item.lang === lang);
		navigation.setParams({ showOptions: this.showOptions });
		this.setState({
			id: chatID,
			messages: messages.length === 0 ? [] : messages[0].messages
		});
	}

	render() {
		return (
			<GiftedChat
				messages={this.state.messages}
				onSend={this.onSend}
				user={{
					_id: 1,
					avatar: null
				}}
				guest={{
					_id: 2
				}}
				lang={this.props.lang}
			/>
		);
	}
}

ChatScreen.propTypes = propTypes;

const mapStateToProps = ({ settings, chat }) => ({
	lang: settings.lang,
	chat
});

export const Chat = connect(
	mapStateToProps,
	{ saveChatHistory, clearChatHistory }
)(ChatScreen);