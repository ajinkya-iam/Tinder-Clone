import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import tw from 'twrnc'

const MatchScreen = () => {

  const navigation = useNavigation()
  const { params } = useRoute()
  const { loggedInProfile, userSwiped } = params

  return (
    <View style={[tw`h-full pt-10`, { opacity: 0.90 }]}>
      <View style={tw`items-center`}>
        <Image style={{ width: '80%', height: '40%', resizeMode: 'contain' }} source={require('../assets/its_match.png')} />
        <Text>You and {userSwiped.displayName} liked each other.</Text>
        <View style={tw`flex-row justify-evenly mt-10`}>
          <Image style={tw`w-32 h-32 rounded-full mr-5`} source={{ uri: loggedInProfile.photoURL }} />
          <Image style={tw`w-32 h-32 rounded-full ml-5`} source={{ uri: userSwiped.photoURL }} />
        </View>
      </View>
      <TouchableOpacity onPress={()=>{
        navigation.goBack()
        navigation.navigate('Chat')
      }} style={tw`p-4 mr-13 ml-13 bg-white items-center justify-center rounded-2xl`}>
      <Text style={tw`font-bold text-red-500`}>Send Message</Text>
    </TouchableOpacity>
    </View >
  )
}

export default MatchScreen