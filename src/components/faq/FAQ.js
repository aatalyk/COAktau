import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { StackActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { colors, images } from '../../assets';
import { Header } from '../navigation/Header';
import { SearchBar, IconButton } from '../common';
import { FAQitem } from './FAQitem';
import { HomeRoutes } from '../navigation';
import { fetchFAQRequested } from '../../actions';

const propTypes = {
  style: PropTypes.object,
  navigation: PropTypes.object,
  isPartiallyShown: PropTypes.bool,
  data: PropTypes.array,
  fetchFAQRequested: PropTypes.func,
  lang: PropTypes.string,
};

class FAQScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: () => (
      <Header
        title="FAQ"
        leftItem={<IconButton imgSource={images.back} onPress={() => navigation.goBack()} />}
      />
    ),
  });

  componentDidMount() {
    this.props.fetchFAQRequested();
  }

  renderSeparator() {
    return <View style={styles.separator} />;
  }

  renderItem = ({ item, index }) => {
    const localizedItem = item[this.props.lang];
    return <FAQitem item={localizedItem} index={index} />;
  };

  keyExtractor = (_, index) => index + '';

  renderSearchBar = () =>
    this.props.isPartiallyShown ? (
      <Text style={styles.title}>Frequently asked questions</Text>
    ) : (
      <SearchBar />
    );

  onShowMorePress = () => {
    const action = StackActions.push({
      routeName: HomeRoutes.FAQ,
    });
    this.props.navigation.dispatch(action);
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <FlatList
          data={this.props.data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.renderSearchBar}
          ItemSeparatorComponent={this.renderSeparator}
        />
        {this.props.isPartiallyShown && (
          <TouchableOpacity style={styles.showMoreButton} onPress={this.onShowMorePress}>
            <Text style={styles.showMoreText}>Show more</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

FAQScreen.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  title: {
    marginLeft: 15,
    marginTop: 20,
    fontSize: 18,
    color: colors.grayLight,
  },
  showMoreButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 44,
  },
  showMoreText: {
    marginRight: 15,
    color: colors.blue,
  },
  separator: {
    backgroundColor: colors.grayUltraLight,
    height: 1,
  },
});

const mapStateToProps = ({ faq, settings }) => ({
  data: faq.data,
  lang: settings.lang,
});

export const FAQ = connect(
  mapStateToProps,
  { fetchFAQRequested },
)(FAQScreen);
