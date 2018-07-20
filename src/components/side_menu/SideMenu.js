import React, { Component } from 'react'
import { View, FlatList } from 'react-native'

import { Header } from './Header'
import { MenuItem } from './MenuItem'

import { images } from '../../assets'

const mockData = [
    {image: images.menu, title: 'Main We’re hosting Startup School akshkajdjsajdkajdsjajdajllsd'}, 
    {image: images.menu, title: 'Main'}, 
    {image: images.menu, title: 'Main'}, 
    {image: images.menu, title: 'Main'}, 
    {image: images.menu, title: 'Main'}, 
    {image: images.menu, title: 'Main'}, 
    {image: images.menu, title: 'Main'}, 
    {image: images.menu, title: 'Main'}, 
    {image: images.menu, title: 'Main We’re hosting Startup School akshkajdjsajdkajdsjajdajllsd'}, 
]

class SideMenu extends Component {

    state = {}

    renderItem = ({ item }) => <MenuItem image={item.image} title={item.title}/>

    render() {
        return (
            <View style={styles.container}>
                <Header title='социальное обеспечение актау'/>
                <FlatList
                    data={mockData}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
}

export { SideMenu }