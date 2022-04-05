import { View, Text, Button, ImageBackground,TouchableOpacity } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'
import tw from 'twrnc'

const LoginScreen = () => {

  const { signInWithGoogle, loadingState } = useAuth()

  return (
    <View style={tw`flex-1`}>
      <ImageBackground style={tw`flex-1`} resizeMode='cover' source={{ uri: 'https://tinder.com/static/tinder.png' }}>

        <TouchableOpacity style={[tw`absolute bottom-40 w-52 bg-white p-4 rounded-2xl`,{marginHorizontal:'25%'}]}>
          <Text onPress={signInWithGoogle} style={tw`font-semibold text-center`}>Sign In & Get Swiping</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>
  )
}

export default LoginScreen