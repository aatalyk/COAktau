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
					titleKaz={navigation.getParam('titleKaz', '')}
					titleRus={navigation.getParam('titleRus', '')}
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

	componentDidMount() {
		const { lang, chat, navigation } = this.props;
		const dictionary = navigation.getParam('dictionary', {});
		this.props.navigation.setParams({ titleKaz: dictionary.title, titleRus: dictionary.title });
		const messages = chat.filter(item => item.id === dictionary.id && item.lang === lang);
		navigation.setParams({ showOptions: this.showOptions });
		this.setState({
			id: dictionary.id,
			messages: messages.length === 0 ? [dictionary] : messages[0].messages
		});
	}

	onSend = messages => {
		this.setState(prevState => ({
			messages: GiftedChat.append(prevState.messages, messages)
		}));
	};

	showOptions = () => {
		const { lang } = this.props;
		Alert.alert(
			settings[lang].navigation.chat,
			'',
			[
				{ text: settings[lang].text.saveChat, onPress: () => this.saveChatHistory() },
				{ text: settings[lang].text.clearChat, onPress: () => this.clearChatHistory() },
				{ text: settings[lang].text.cancel, onPress: () => console.log('Cancel Pressed'), style: 'destructive' }
			],
			{ cancelable: true }
		);
	};

	saveChatHistory = () => {
		const { id, messages } = this.state;
		const { lang } = this.props;
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
