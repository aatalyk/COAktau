import React, {Component} from "react";
import {ScrollView, RefreshControl, StyleSheet} from "react-native";
import HTMLView from "react-native-htmlview";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Header} from "../navigation";
import {IconButton} from "../common";
import {fetchServicesPostRequested} from "../../actions";
import {images, textStyles} from "../../assets";

const propTypes = {
	navigation: PropTypes.object,
	loading: PropTypes.bool,
	fetchServicesPostRequested: PropTypes.func,
	post: PropTypes.shape({
		kaz: PropTypes.string,
		rus: PropTypes.string,
	}),
	lang: PropTypes.oneOf(["kaz", "rus"]),
};

class AboutServiceScreen extends Component {
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
		this.fetchServicesPost();
	}

	setHeaderTitle = () => {
		const {lang} = this.props;
		const item = this.getItem();
		this.props.navigation.setParams({titleKaz: item[lang].title, titleRus: item[lang].title});
	};

	fetchServicesPost = () => {
		const {lang} = this.props;
		const item = this.getItem();
		this.props.fetchServicesPostRequested(item[lang].serviceId, item[lang].subServiceId, item[lang].id);
	};

	getItem = () => this.props.navigation.getParam("item", {});

	onRefresh = () => this.fetchServicesPost();

	render() {
		const {post, loading, lang} = this.props;
		return (
			<ScrollView
				style={styles.container}
				refreshControl={<RefreshControl refreshing={loading} onRefresh={this.onRefresh} />}
			>
				<HTMLView value={post[lang]} style={styles.htmlView} stylesheet={styles} />
			</ScrollView>
		);
	}
}

AboutServiceScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	htmlView: {
		margin: 10,
	},
	p: {
		...textStyles.p,
	},
	a: {
		fontWeight: "300",
		color: "#FF3366", // make links coloured pink
	},
	b: {
		fontWeight: "bold",
	},
});

const mapStateToProps = ({services, settings}) => ({
	loading: services.loading,
	post: services.post,
	lang: settings.lang,
});

export const AboutService = connect(
	mapStateToProps,
	{fetchServicesPostRequested},
)(AboutServiceScreen);
