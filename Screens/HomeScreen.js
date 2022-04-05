import { View, Text, TouchableOpacity, Image, StyleSheet ,LogBox} from 'react-native'
import React from 'react'
import tw from 'twrnc'
import useAuth from '../hooks/useAuth'
import { useEffect, useLayoutEffect, useRef, useState } from 'react/cjs/react.development'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import Swiper from 'react-native-deck-swiper'
import {collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where} from 'firebase/firestore'
import { db } from '../Firebase'
import generateId from '../lib/generateId'
LogBox.ignoreAllLogs()

const data = [
  {
    firstName: 'Ajinkya',
    lastName: 'Shinde',
    occupation: 'Developer',
    photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GgHMTSzzpBsmkMZGy0nzRbh3uj-u9tKz-TEQe-zrw=s96-c',
    age: 23,
    id: 1
  },
  {
    firstName: 'Ajinkya',
    lastName: 'Shinde',
    occupation: 'Developer',
    photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GgHMTSzzpBsmkMZGy0nzRbh3uj-u9tKz-TEQe-zrw=s96-c',
    age: 23,
    id: 2
  },
  {
    firstName: 'Ajinkya',
    lastName: 'Shinde',
    occupation: 'Developer',
    photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GgHMTSzzpBsmkMZGy0nzRbh3uj-u9tKz-TEQe-zrw=s96-c',
    age: 23,
    id: 3
  },
  {
    firstName: 'Ajinkya',
    lastName: 'Shinde',
    occupation: 'Developer',
    photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GgHMTSzzpBsmkMZGy0nzRbh3uj-u9tKz-TEQe-zrw=s96-c',
    age: 23,
    id: 4
  },
  {
    firstName: 'Ajinkya',
    lastName: 'Shinde',
    occupation: 'Developer',
    photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GgHMTSzzpBsmkMZGy0nzRbh3uj-u9tKz-TEQe-zrw=s96-c',
    age: 23,
    id: 5
  },
  {
    firstName: 'Ajinkya',
    lastName: 'Shinde',
    occupation: 'Developer',
    photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GgHMTSzzpBsmkMZGy0nzRbh3uj-u9tKz-TEQe-zrw=s96-c',
    age: 23,
    id: 6
  }
]

const HomeScreen = () => {

  const navigation = useNavigation()
  const { logout, user } = useAuth()
  const swipeRef = useRef(null)
  const [profiles, setProfiles] = useState([])

  // console.log(user)

  const swipeLeft = async(cardIndex) =>{
    if(!profiles[cardIndex]) return

    const userSwiped = profiles[cardIndex]
    console.log(`You swipped pass on ${userSwiped.displayName}`)
    setDoc(doc(db,'users', user.uid, 'passes', userSwiped.id),userSwiped)
  }

  const swipeRight = async(cardIndex) =>{

    if(!profiles[cardIndex]) return
    
    const userSwiped = profiles[cardIndex]

    const loggedInProfile = await(await getDoc(doc(db,'users',user.uid))).data()

    //check if user swipe you
    
    await getDoc(doc(db,'users',userSwiped.id,'swipes',user.uid)).then(
      (DocumentSnapshot)=>{
        console.log(DocumentSnapshot.data())
        if(DocumentSnapshot.exists()){
          //user has matched with you before you match
          //create match
          console.log(`Great !! You Matched with ${userSwiped.displayName}`)
          setDoc(doc(db,'users',user.uid,'swipes',userSwiped.id),userSwiped)

          //Create a match

          setDoc(doc(db,'matches',generateId(user.uid,userSwiped.id)),{
            users:{
              [user.uid] : loggedInProfile,
              [userSwiped.id] : userSwiped
            },
            usersMatched : [user.uid,userSwiped.id],
            timeStamp : serverTimestamp()
          })

          navigation.navigate('Match',{
            loggedInProfile,
            userSwiped
          })

        }else{
          //you swipe user
          console.log(`You swipe on ${userSwiped.displayName}`)
          setDoc(doc(db,'users',user.uid,'swipes',userSwiped.id),userSwiped)
        }
      }
    )

    console.log(`You swipped on ${userSwiped.displayName}`)
    setDoc(doc(db,'users', user.uid, 'swipes', userSwiped.id),userSwiped)
    
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })

    onSnapshot(doc(db,'users',user.uid),snapshot=>{
      if(!snapshot.exists){
        navigation.navigate('Modal')
      }
    })

  }, [])

  useEffect(()=>{
    let unsub

    const fetchCards = async () =>{

      const passes = getDocs(collection(db,'users',user.uid,'passes')).then(
        (snapshot) => snapshot.docs.map((doc)=>doc.id)
      )

      const swipe = getDocs(collection(db,'users',user.uid,'swipes')).then(
        (snapshot) => snapshot.docs.map((doc)=>doc.id)
      )

      const passedUserIds = (await passes).length > 0 ? passes : ['tests']
      const swipedUserIds = (await swipe).length > 0 ? passes : ['tests']
 
      unsub = onSnapshot(
        query(collection(db,'users'),where('id', 'not-in' ,[...passedUserIds,...swipedUserIds])),
        (snapshot)=>{
        setProfiles(
          snapshot.docs
          .filter((doc)=>doc.id !== user.uid)
          .map((doc)=>({
            id : doc.id,
            ...doc.data()
          }))
        )
      })
    }

    fetchCards()
    return unsub

  },[db])


  return (
    <SafeAreaView style={tw`flex-1`}>

      {/* Header Start */}
      <View style={tw`items-center flex-row px-5 justify-between`}>
        <TouchableOpacity>
          <Image style={tw`h-10 w-10 rounded-full`} source={{ uri: user.photoURL }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
          <Image style={tw`h-14 w-14`} source={require('../assets/tinder.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons style={tw`h-10 w-10 rounded-full`} color='#ff5564' name='chatbubbles' size={30} />
        </TouchableOpacity>
      </View>
      {/* Header End */}

      {/* Cards start*/}
      <View style={tw`flex-1 -mt-6`}>
        <Swiper
          ref={swipeRef}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          containerStyle={{
            backgroundColor: 'transparent'
          }}
          onSwipedLeft={(cardIndex) => {
            console.log('Swipe Pass')
            swipeLeft(cardIndex)
          }}
          onSwipedRight={(cardIndex) => {
            console.log('Swipe MATCH')
            swipeRight(cardIndex)
          }}
          cards={profiles}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  color: 'red',
                  textAlign: 'right'
                },
              }
            },
            right: {
              title: 'MATCH',
              style: {
                label: {
                  color: '#4ded30',
                },
              }
            },
          }}
          renderCard={(card) => card ? (
            <>
              <View key={card.id} style={tw`relative bg-white h-3/4 rounded-xl`} >
                <Image style={tw`absolute top-0 h-full w-full rounded-xl`} source={{uri:card.photoURL}} />
                <View style={[tw`absolute flex-row justify-between items-center bottom-0 h-20 w-full bg-white px-6 py-2 rounded-b-xl`, styles.cardBackground]}>
                  <View>
                    <Text style={tw`text-xl font-bold`}>{card.displayName}</Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={tw`text-2xl font-bold `}>{card.age}</Text>
                </View>
              </View>
            </>
          ) : <>
            <View style={tw`relative bg-white h-3/4 rounded-xl items-center justify-center`}>
              <Image style={tw`w-20 h-20`} source={require('../assets/sad.png')}/>
              <Text style={tw`mt-7 text-gray-600`}>No more profiles</Text>
            </View>
          </>} />
      </View>
      {/* Cards end */}

      {/* Bottom start*/}
      <View style={tw`flex flex-row justify-evenly bottom-15`}>
        <TouchableOpacity onPress={() => swipeRef.current.swipeLeft()} style={tw`items-center justify-center bg-red-200 rounded-full w-16 h-16`}>
          <Entypo name='cross' color={'red'} size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swipeRef.current.swipeRight()} style={tw`items-center justify-center bg-green-200 rounded-full w-16 h-16`}>
          <AntDesign name='heart' color={'green'} size={24} />
        </TouchableOpacity>
      </View>
      {/* Bottom end */}

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  cardBackground: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
})