import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Screens/HomeScreen'
import ChatScreen from './Screens/ChatScreen'
import LoginScreen from './Screens/LoginScreen'
import ModelScreen from './Screens/ModelScreen'
import useAuth from './hooks/useAuth'
import MatchScreen from './Screens/MatchScreen'
import MessagesScreen from './Screens/MessagesScreen'

const StackNavigator = () => {

  const Stack = createNativeStackNavigator()
  const { user } = useAuth()
  return (
    <Stack.Navigator>

      {
        user ?
          <>
            <Stack.Group>
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='Chat' component={ChatScreen} options={{headerShown:false}}/>
              <Stack.Screen name='Message' component={MessagesScreen} options={{headerShown:false}}/>
            </Stack.Group>
            <Stack.Group  screenOptions={{
              presentation:"modal",
            }}>
              <Stack.Screen options={{headerShown:false}} name='Modal' component={ModelScreen} />
              <Stack.Screen options={{headerShown:false}} name='Match' component={MatchScreen} />
            </Stack.Group>
          </>
          :
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
      }

    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})
