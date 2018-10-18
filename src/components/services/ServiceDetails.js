import React, {Component} from "react";
import {View, FlatList, Text, Image, RefreshControl, TouchableOpacity, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Header} from "../navigation";
import {IconButton} from "../common";
import {fetchServicesTitlesRequested} from "../../actions";
import {colors, images, textStyles} from "../../assets";

const propTypes = {
	navigation: PropTypes.object,
	lang: PropTypes.oneOf(["kaz", "rus"]),
	loading: PropTypes.bool,
	fetchServicesTitlesRequested: PropTypes.func,
	titles: PropTypes.array,
};

class ServiceDetailsScreen extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			header: () => (
				<Header
					titleKaz={navigation.getParam("titleKaz", "")}
					titleRus={navigation.getParam("titleRus", "")}
					leftItem={<IconButton imgSource={images.back} onPress={() => navigation.goBack()} />}
				/>
			),
		};
	};

	componentDidMount() {
		this.setHeaderTitle();
		this.fetchServicesTitles();
	}

	setHeaderTitle = () => {
		const {lang} = this.props;
		const item = this.getItem();
		this.props.navigation.setParams({titleKaz: item[lang].title, titleRus: item[lang].title});
	};

	fetchServicesTitles = () => {
		const {lang} = this.props;
		const item = this.getItem();
		this.props.fetchServicesTitlesRequested(item[lang].serviceId, item[lang].id);
	};

	getItem = () => this.props.navigation.getParam("item", {});

	renderItem = ({item}) => {
		const {lang} = this.props;
		return (
			<TouchableOpacity onPress={() => this.onPress(item)}>
				<View style={styles.detailContainer}>
					<Text style={styles.title}>{item[lang].title}</Text>
					<Image source={images.right} style={styles.image} />
				</View>
			</TouchableOpacity>
		);
	};

	renderSeparator = () => <View style={styles.separator} />;

	onPress = item => {
		item.calc
			? this.props.navigation.navigate("CalcScreen", {item})
			: this.props.navigation.navigate("AboutService", {item});
	};

	onRefresh = () => this.fetchServicesTitles();

	render() {
		const {loading, titles} = this.props;
		return (
			<View style={styles.container}>
				<FlatList
					data={titles}
					renderItem={this.renderItem}
					keyExtractor={(_, index) => index + ""}
					ItemSeparatorComponent={this.renderSeparator}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={this.onRefresh} />}
				/>
			</View>
		);
	}
}

ServiceDetailsScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	detailContainer: {
		flexDirection: "row",
		alignItems: "center",
		margin: 20,
	},
	title: {
		flex: 1,
		...textStyles.p,
	},
	image: {
		width: 20,
		height: 20,
	},
	separator: {
		height: 0.5,
		backgroundColor: colors.grayUltraLight,
		marginLeft: 10,
		marginRight: 10,
	},
});

const mapStateToProps = ({settings, services}) => ({
	lang: settings.lang,
	loading: services.loading,
	titles: services.titles,
});

export const ServiceDetails = connect(
	mapStateToProps,
	{fetchServicesTitlesRequested},
)(ServiceDetailsScreen);
