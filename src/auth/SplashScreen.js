import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react'
import { images } from '../assets/images'
const SplashScreen = ({navigation}) => {
    useEffect(()=>{
        setTimeout(async()=>{
          let status= await GoogleSignin.isSignedIn()
          if(status)
          {
            navigation.reset({
              index: 0,
              routes: [{ name: 'BottomTabs'}],
            })
            
          }
          else
          {
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen'}],
            })
          }
           
           
         
         },2000)
      },[])
  return (
    <SafeAreaView style={styles.containerStyle}>
    <Image source={images.SplashIcon} style={styles.splashIconStyle} />
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    containerStyle:{flex:1,alignItems:'center',justifyContent:'center'},
    splashIconStyle:{height:140,width:140}
})