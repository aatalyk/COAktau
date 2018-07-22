import React, { Component } from 'react';
import { Platform, UIManager } from 'react-native';

import { DrawerNavigator } from './src/components/navigation';

export default class App extends Component {
  constructor(props) {
    super(props);

    if (Platform.Android) {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return <DrawerNavigator />;
  }
}
