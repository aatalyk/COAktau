import React, {Component} from "react";
import {View, FlatList, StyleSheet, TouchableOpacity, Text, RefreshControl} from "react-native";
import {StackActions} from "react-navigation";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {ServiceItem} from "./ServiceItem";
import {MessageScreen, PlaceHolderList} from "../common";
import {fetchServicesRequested} from "../../actions";
import {colors, textStyles, settings, images} from "../../assets";

const propTypes = {
	style: PropTypes.object,
	navigation: PropTypes.object,
	isPartiallyShown: PropTypes.bool,
	lang: PropTypes.string,
	loading: PropTypes.bool,
	services: PropTypes.array,
	fetchServicesRequested: PropTypes.func,
	myServices: PropTypes.array,
	showsMyServices: PropTypes.bool,
};

class ServicesListScreen extends Component {
	componentDidMount() {
		this.props.fetchServicesRequested();
	}

	getShortData = data => data.slice(0, 2);

	onRefresh = () => this.props.fetchServicesRequested();

	renderItem = ({item, index}) => <ServiceItem item={item} onPress={() => this.onPress(item)} key={index} />;

	keyExtractor = (_, index) => index + "";

	renderSeparator = () => <View style={styles.separator} />;

	onShowMorePress = () => {
		const action = StackActions.push({
			routeName: "ServicesList",
		});
		this.props.navigation.dispatch(action);
	};

	onPress = item => {
		this.props.navigation.navigate("Services", {item});
	};

	render() {
		const {isPartiallyShown, loading, services, lang, showsMyServices, myServices} = this.props;
		const serviceItems = isPartiallyShown || showsMyServices ? myServices : services;

		return loading && serviceItems.length === 0 ? (
			<View style={styles.placeHolderContainer}>
				<PlaceHolderList />
			</View>
		) : (
			<View style={[styles.container, this.props.style, {flex: !isPartiallyShown ? 1 : undefined}]}>
				<View style={{flex: 1}}>
					{serviceItems.length === 0 ? (
						<MessageScreen
							style={styles.noDataText}
							title={settings[lang].text.noMyServices}
							imgSource={isPartiallyShown ? null : images.box}
						/>
					) : isPartiallyShown ? (
						<View style={{paddingHorizontal: 10, marginTop: -20}}>
							{serviceItems.map((item, index) => this.renderItem({item, index}))}
						</View>
					) : (
						<FlatList
							style={styles.flatlist}
							data={serviceItems}
							renderItem={this.renderItem}
							keyExtractor={this.keyExtractor}
							refreshControl={<RefreshControl refreshing={loading} onRefresh={this.onRefresh} />}
						/>
					)}
				</View>
				{isPartiallyShown && (
					<TouchableOpacity style={styles.showMoreButton} onPress={this.onShowMorePress}>
						<Text style={styles.showMoreText}>{`${settings[lang].navigation.services} >>`}</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	}
}

ServicesListScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.soLightBlue,
	},
	placeHolderContainer: {
		flex: 1,
		backgroundColor: "white",
	},
	flatlist: {
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
	},
	separator: {
		height: 0.5,
		backgroundColor: colors.grayUltraLight,
		marginLeft: 10,
		marginRight: 10,
	},
	showMoreButton: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		height: 44,
	},
	showMoreText: {
		...textStyles.p,
		marginRight: 15,
		color: colors.grayDark,
	},
	title: {
		...textStyles.p,
		marginLeft: 15,
		marginTop: 20,
		color: colors.grayLight,
	},
});

const mapStateToProps = ({services, settings, myServices}) => ({
	myServices,
	services: services.services,
	loading: services.loading,
	lang: settings.lang,
});

export const ServicesList = connect(
	mapStateToProps,
	{fetchServicesRequested},
)(ServicesListScreen);
