import React, { Component } from 'react'
import { View, FlatList } from 'react-native'

import { Header } from './Header'
import { MenuItem } from './MenuItem'

import { images } from '../../assets'

const mockData = [
    {image: images.home, title: 'Главная'}, 
    {image: images.case, title: 'Все услуги'}, 
    {image: images.star, title: 'Мои услуги'}, 
    {image: images.news, title: 'Уведомления'}, 
    {image: images.speaker, title: 'Новости'}, 
    {image: images.question, title: 'Справка'}, 
    {image: images.pin, title: 'Контакты'}, 
    {image: images.info, title: 'О приложении'}, 
    {image: images.settings, title: 'Настройки'},
    {image: images.exit, title: 'Выход'} 
]

class SideMenu extends Component {

    state = {}

    renderItem = ({ item }) => <MenuItem image={item.image} title={item.title}/>

    render() {
        return (
            <View style={styles.container}>
                <Header title='социальное обеспечение актау'/>
                <View style={styles.menuContainer}>
                    {mockData.map(item => <MenuItem image={item.image} title={item.title}/>)}
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    menuContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    }
}

export { SideMenu }