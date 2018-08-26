import React from "react";
import { ServicesList } from "./ServicesList";

import PropTypes from "prop-types";

const propTypes = {
  navigation: PropTypes.object
};

export const MyServicesList = ({ navigation }) => (
  <ServicesList showsMyServices navigation={navigation} />
);

MyServicesList.propTypes = propTypes;
