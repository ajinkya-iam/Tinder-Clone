import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const RecieverMessage = ({ message }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image source={{ uri: message.photoURL }} style={{
        width: 25,
        height: 25,
        borderRadius: 13,
        marginTop : -10,
        marginRight : 10,
        marginLeft: 20,
      }} />
      <Text style={{
        color: 'white', backgroundColor: '#ff5864',
        padding: 10,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        alignSelf: 'flex-start',
        marginTop: 10
      }}>{message.message}</Text>
    </View>
  )
}

export default RecieverMessage

const styles = StyleSheet.create({})