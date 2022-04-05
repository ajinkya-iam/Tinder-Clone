import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList
} from 'react-native'

import React from 'react'
import Header from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react/cjs/react.development'
import SenderMessage from '../components/SenderMessage'
import RecieverMessage from '../components/RecieverMessage'
import tw from 'twrnc'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../Firebase'

const MessagesScreen = () => {

    const { user } = useAuth()
    const { params } = useRoute()

    const { matchDetails } = params

    const [input, setInput] = useState('')
    const [message, setMessage] = useState([])

    useEffect(() => {
        onSnapshot(
            query(collection(db, 'matches', matchDetails.id, 'messages'),
            orderBy('timestamp', 'desc')
            ),snapshot=> setMessage(snapshot.docs.map(doc=>({
                id : doc.id,
                ...doc.data()
            })))
            )
    }, [])

    const sendMessage = () => {
        addDoc(collection(db, 'matches', matchDetails.id, 'messages'),
            {
                timestamp: serverTimestamp(),
                userId: user.uid,
                displayName: user.displayName,
                photoURL: matchDetails.users[user.uid].photoURL,
                message: input
            })

        setInput('')
    }

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>

            <Header title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName} callEnabled={true} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={10}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        {/* <SenderMessage />
                        <RecieverMessage /> */}
                        <FlatList
                            data={message}
                            inverted={-1}
                            style={{marginBottom : 10}}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item: msg }) =>
                                msg.userId === user.uid ? 
                                    <SenderMessage key={msg.id} message={msg} />
                                 : 
                                    <RecieverMessage key={msg.id} message={msg} />
                                }
                        />

                    </>
                </TouchableWithoutFeedback>
                <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10, marginRight: 10}}>
                    <TextInput
                        style={{fontSize : 18,width:'85%' }}
                        placeholder='type here....'
                        value={input}
                        onChangeText={setInput} />
                    <TouchableOpacity onPress={sendMessage}>
                        <Text style={{ color: '#ff5864', fontWeight: 'bold', fontSize: 18 }}>SEND</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default MessagesScreen

const styles = StyleSheet.create({

})