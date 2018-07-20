import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

export const MenuItem = ({ image, title }) => (
    <TouchableOpacity>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={image}/>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{ title }</Text>
            </View>
        </View>
    </TouchableOpacity>
)

const styles = {
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 5
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    image: {
        width: 50,
        height: 50
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        backgroundColor: 'yellow'
    },
    title: {
        fontSize: 25,
        color: 'black'
    }
}