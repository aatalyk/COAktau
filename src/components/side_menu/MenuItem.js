import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

<<<<<<< HEAD
import { fonts } from '../../assets'

=======
>>>>>>> menu
export const MenuItem = ({ image, title }) => (
    <TouchableOpacity>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
<<<<<<< HEAD
                <Image source={image} style={styles.image}/>
=======
                <Image source={image}/>
>>>>>>> menu
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
<<<<<<< HEAD
        margin: 5,
        marginLeft: 15
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 25,
        height: 25
    },
    titleContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 30
    },
    title: {
        fontSize: 18,
        textAlign: 'left',
        color: 'black',
        fontFamily: fonts.MerriweatherRegular
=======
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
>>>>>>> menu
    }
}