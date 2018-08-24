import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { NotificationItem } from './NotificationItem';
import { colors } from '../../assets';
import { fetchNotifsRequested } from '../../actions';

const propTypes = {
	navigation: PropTypes.object,
	notifsItems: PropTypes.array,
	fetchNotifsRequested: PropTypes.func,
	lang: PropTypes.string
};

class NotificationsScreen extends Component {
	componentDidMount() {
		this.props.fetchNotifsRequested();
	}

	renderItem = ({ item }) => {
		const localizedItem = item[this.props.lang];
		return <NotificationItem item={localizedItem} onPress={() => this.onPress(localizedItem)} />;
	};

	renderSeparator = () => <View style={styles.separator} />;

	onPress = item => this.props.navigation.navigate('NotificationPage', { item });

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.props.notifsItems}
					renderItem={this.renderItem}
					style={styles.flatList}
					ItemSeparatorComponent={this.renderSeparator}
					keyExtractor={(_, index) => index + ''}
				/>
			</View>
		);
	}
}

NotificationsScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.blueUltraLight
	},
	flatList: {
		flex: 1,
		marginVertical: 20
	},
	separator: {
		backgroundColor: colors.grayUltraLight,
		height: 1
	}
});

const mapStateToProps = ({ notifs, settings }) => ({
	notifsItems: notifs.notifsItems,
	lang: settings.lang
});

export const Notifications = connect(
	mapStateToProps,
	{ fetchNotifsRequested }
)(NotificationsScreen);
