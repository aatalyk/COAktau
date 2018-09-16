import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header } from '../navigation';
import { IconButton } from '../common';
import { images } from '../../assets';
import { saveChatHistory, clearChatHistory } from '../../actions';

const propTypes = {
	navigation: PropTypes.object,
	lang: PropTypes.string,
	chat: PropTypes.array,
	saveChatHistory: PropTypes.func,
	clearChatHistory: PropTypes.func
};

const ID = 1;

class ChatScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			header: () => (
				<Header
					titleKaz="{titleKaz}"
					titleRus="{titleRus}"
					leftItem={<IconButton imgSource={images.search} onPress={() => params.saveChatHistory()} />}
				/>
			)
		};
	};

	state = {
		messages: []
	};

	onSend = messages => {
		console.log(messages);
		this.setState(prevState => ({
			messages: GiftedChat.append(prevState.messages, messages)
		}));
	};

	saveChatHistory = () => {
		console.log('saveChatHistory');
		const { messages } = this.state;
		const { lang } = this.props;
		this.props.clearChatHistory({ id: ID, lang, messages });
		this.props.saveChatHistory({ id: ID, lang, messages });
	};

	clearChatHistory = () => {
		const { messages } = this.state;
		const { lang } = this.props;
		this.props.clearChatHistory({ id: 1, lang, messages });
	};

	componentDidMount() {
		this.props.navigation.setParams({ saveChatHistory: this.saveChatHistory });
		const { lang, chat } = this.props;
		console.log('chat', chat);
		const messages = chat.filter(item => item.id === 1 && item.lang === lang);
		if (messages.length === 0) {
			return;
		}
		console.log('messages', messages);
		this.setState({
			messages: messages[0].messages
		});
	}

	render() {
		return (
			<GiftedChat
				messages={this.state.messages}
				onSend={this.onSend}
				user={{
					_id: 1,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any'
				}}
				guest={{
					_id: 2,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any'
				}}
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
