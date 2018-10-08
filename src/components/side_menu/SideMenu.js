import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Header } from "./Header";
import { MenuItem } from "./MenuItem";

import { images, settings } from "../../assets";
import { DrawerRoutes } from "../navigation";

const menuItems = [
  {
    image: images.home,
    selectedImage: images.homePurple,
    title: {
      kaz: settings.kaz.navigation.home,
      rus: settings.rus.navigation.home
    }
  },
  {
    image: images.case,
    selectedImage: images.casePurple,
    title: {
      kaz: settings.kaz.navigation.services,
      rus: settings.rus.navigation.services
    }
  },
  {
    image: images.star,
    selectedImage: images.starPurple,
    title: {
      kaz: settings.kaz.navigation.myServices,
      rus: settings.rus.navigation.myServices
    }
  },
  {
    image: images.news,
    selectedImage: images.newsPurple,
    title: {
      kaz: settings.kaz.navigation.news,
      rus: settings.rus.navigation.news
    }
  },
  {
    image: images.settings,
    selectedImage: images.settingsPurple,
    title: {
      kaz: settings.kaz.navigation.myCity,
      rus: settings.rus.navigation.myCity
    }
  },
  {
    image: images.speaker,
    selectedImage: images.speakerPurple,
    title: {
      kaz: settings.kaz.navigation.notifs,
      rus: settings.rus.navigation.notifs
    }
  },
  {
    image: images.question,
    selectedImage: images.questionPurple,
    title: {
      kaz: settings.kaz.navigation.faq,
      rus: settings.rus.navigation.faq
    }
  },
  {
    image: images.chat,
    selectedImage: images.chatPurple,
    title: {
      kaz: settings.kaz.navigation.chatRooms,
      rus: settings.rus.navigation.chatRooms
    }
  },
  {
    image: images.pin,
    selectedImage: images.pinPurple,
    title: {
      kaz: settings.kaz.navigation.contact,
      rus: settings.rus.navigation.contact
    }
  },
  {
    image: images.info,
    selectedImage: images.infoPurple,
    title: {
      kaz: settings.kaz.navigation.about,
      rus: settings.rus.navigation.about
    }
  },
  {
    image: images.settings,
    selectedImage: images.settingsPurple,
    title: {
      kaz: settings.kaz.navigation.settings,
      rus: settings.rus.navigation.settings
    }
  }
];

const propTypes = {
  navigation: PropTypes.object,
  lang: PropTypes.string
};

class SideMenuPage extends Component {
  state = {
    currentIndex: 0,
    itemHeight: 44
  };

  onPress = currentIndex => () => {
    this.setState({ currentIndex });
    this.navigateRoute(currentIndex);
  };

  navigateRoute = index => {
    const routes = Object.keys(DrawerRoutes);
    const navigateAction = NavigationActions.navigate({
      routeName: routes[index]
    });
    this.props.navigation.dispatch(navigateAction);
  };

  onLayout = ({ nativeEvent }) => {
    const { height } = nativeEvent.layout;
    const itemHeight = menuItems.length > 0 ? height / menuItems.length : 0;
    this.setState({ itemHeight });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title={settings[this.props.lang].text.title} />
        <View style={styles.menuContainer} onLayout={this.onLayout}>
          {menuItems.map((item, index) => (
            <MenuItem
              onPress={this.onPress(index)}
              key={index}
              regularImage={item.image}
              selectedImage={item.selectedImage}
              title={item.title[this.props.lang]}
              isSelected={index === this.state.currentIndex}
              height={this.state.itemHeight}
            />
          ))}
        </View>
      </View>
    );
  }
}

SideMenuPage.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  menuContainer: {
    flex: 1,
    marginVertical: 10
  }
});

const mapStateToProps = ({ settings }) => ({
  lang: settings.lang
});

export const SideMenu = connect(mapStateToProps)(SideMenuPage);
