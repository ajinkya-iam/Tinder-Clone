import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Header = ({ title, callEnabled }) => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather onPress={()=>navigation.goBack()} style={styles.icon} name='arrow-left' size={34} color={'#ff5864'} />
                <Text style={styles.title}>{title}</Text>
            </View>
            {callEnabled &&
                <Ionicons style={styles.call} name='call' size={28} color='#ff5864' />}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        marginLeft: 20,
        fontWeight: 'bold'
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    call: {
        alignContent: 'flex-end',
        marginRight: 10,
        alignSelf: 'center'
    }
})