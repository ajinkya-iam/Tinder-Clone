import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../Firebase'

const ChatRow = ({ matchDetails }) => {

    const navigation = useNavigation()
    const { user } = useAuth()
    const [matchedUserInfo, setMatchedUserInfo] = useState(null)
    const [lastMessage, setLastMessage] = useState('')

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
    }, [matchDetails, user])

    useEffect(() => {
        onSnapshot(query(
            collection(db, 'matches', matchDetails.id, 'messages'),
            orderBy('timestamp', 'desc')),
            snapshot=> setLastMessage(snapshot.docs[0]?.data()?.message))
    })

    return (
        <TouchableOpacity style={styles.container} onPress={
            () => {
                navigation.navigate('Message', {
                    matchDetails,
                })
            }
        }>
            <Image style={styles.profileImg} source={{ uri: matchedUserInfo?.photoURL }} />
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <Text style={styles.name}>{matchedUserInfo?.displayName}</Text>
                <Text style={{ color: 'gray' }}>{lastMessage || 'Say Hii'}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatRow

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    profileImg: {
        width: 50,
        height: 50,
        borderRadius: 35,
        marginLeft: 10
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15,
    }
})