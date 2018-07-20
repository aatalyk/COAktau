import React from 'react'
import { View, Image, Text } from 'react-native'

import { images } from '../../assets' 

export const Header = ({ title }) => (
    <View style={styles.fill}>
        <View style={styles.container}>
            <Image style={styles.image} source={images.appicon}/>
            <Text numberOfLines={3} style={styles.title}>{title}</Text>
        </View>
    </View>
) 

const styles = {
    fill: {
        backgroundColor: 'blue'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    image: {
        width: 90,
        height: 90,
        marginLeft: 40
    },
    title: {
        flex: 1,
        fontSize: 30,
        lineHeight: 25,
        margin: 5
    }
}