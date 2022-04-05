import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity,ToastAndroid } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { setDoc,doc,serverTimestamp, } from 'firebase/firestore'
import useAuth from '../hooks/useAuth'
import { db } from '../Firebase'
import { useState } from 'react/cjs/react.development'
import { useNavigation } from '@react-navigation/native'

const ModelScreen = () => {

  const { user } = useAuth()
  const [image, setImage] = useState(null)
  const [job, setJob] = useState(null)
  const [age,setAge] = useState(null)
  
  const navigation = useNavigation()

  const incompleteForm = !image || !job || !age

  const updateUserProfile = () =>{
    setDoc(doc(db,'users',user.uid),{
      id : user.uid,
      displayName : user.displayName,
      photoURL : user.photoURL,
      job : job,
      age : age,
      timeStamp : serverTimestamp(),
    }).then(()=>{
      navigation.navigate('Home')
    }).catch((err)=>{
      ToastAndroid.showWithGravity('Error : ' + err , ToastAndroid.SHORT, ToastAndroid.CENTER)
    })
  }

  return (
    <View style={tw`flex-1 pt-6 items-center`}>
      <Image style={tw`w-full h-20`} resizeMode='contain' source={require('../assets/tinder_logo.png')} />
      <Text style={tw`text-xl text-gray-500 font-bold p-2`}>Welcome {user.displayName}</Text>

      <Text style={tw`text-center text-red-400 font-bold p-4`}>Step 1: The Profile Pic</Text>
      <TextInput value={image} onChangeText={setImage} style={tw`text-xl text-center pb-2`} placeholder='Enter profile pic url' />

      <Text style={tw`text-center text-red-400 font-bold p-4`}>Step 2: The Job</Text>
      <TextInput value={job} onChangeText={setJob} style={tw`text-xl text-center pb-2`} placeholder='Enter your occupation' />

      <Text style={tw`text-center text-red-400 font-bold p-4`}>Step 3: The Age</Text>
      <TextInput value={age} onChangeText={setAge} keyboardType='numeric' maxLength={2} style={tw`text-xl text-center pb-2`} placeholder='Enter your age' />

      <TouchableOpacity
        disabled={incompleteForm}
        onPress={updateUserProfile}
        style={[tw`absolute bottom-10 p-3 rounded-xl items-center w-64`,
        incompleteForm ? tw`bg-gray-400` : tw`bg-red-400`]}>
        <Text style={tw`text-white text-xl font-bold`}>Update Profile</Text>
      </TouchableOpacity>

    </View>
  )
}

export default ModelScreen

const styles = StyleSheet.create({})