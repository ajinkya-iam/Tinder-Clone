import { View, Text } from 'react-native'
import React from 'react'

const SenderMessage = ({message}) => {
  return (
    <View style={{backgroundColor : 'purple', 
    padding : 10, 
    borderTopLeftRadius : 15,
    borderTopRightRadius : 15,
    borderBottomLeftRadius : 15,
    alignSelf : 'flex-end',
    marginRight : 20,
    marginTop : 10}}>
      <Text style={{color : 'white'}}>{message.message}</Text>
    </View>
  )
}

export default SenderMessage