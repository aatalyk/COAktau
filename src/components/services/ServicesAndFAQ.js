import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { ServicesList } from './';
import { colors } from '../../assets';
import { FAQ } from '../../scenes/FAQ';

const propTypes = {
  navigation: PropTypes.object,
};

class ServicesAndFAQ extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <ServicesList
          style={styles.servicesList}
          navigation={this.props.navigation}
          isPartiallyShown
        />
        <FAQ style={styles.faq} />
      </ScrollView>
    );
  }
}

ServicesAndFAQ.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blueUltraLight,
  },
  servicesList: {
    marginTop: 20,
  },
  faq: {
    marginVertical: 20,
  },
});

export { ServicesAndFAQ };
