import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../Firebase'
import useAuth from '../hooks/useAuth'
import ChatRow from './ChatRow'


const ChatList = () => {

    const [matches,setMatches] = useState([])
    const {user} = useAuth()

    useEffect(()=>{
        onSnapshot(
            query(
                collection(db,'matches'),
                where('usersMatched','array-contains',user.uid)
            ),
            (snapShot) =>
            setMatches(
                snapShot.docs.map((doc)=>({
                    id : doc.id,
                    ...doc.data()
                }))
            )
        )
    },[])

    // console.log(matches)

    return (
        matches.length > 0 ? 
        <FlatList 
            data={matches}
            keyExtractor={(item)=>item.id}
            renderItem={({item}) => <ChatRow matchDetails={item}/>}
        /> :
        <View style={{height:'90%',justifyContent:'space-evenly',alignSelf:'center',flexDirection:'column'}}>
            <Text>No matches at the moment...</Text>
        </View>
    )
}

export default ChatList

const styles = StyleSheet.create({})