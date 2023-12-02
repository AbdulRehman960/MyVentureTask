import { StyleSheet, Text, View,TouchableOpacity, SafeAreaView, Image } from 'react-native'
import {saveCurrentLogedinUserData} from '../redux_toolkit/slices/AuthSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '../utils/Constants';
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { images } from '../assets/images'
import Helper from '../utils/Helper';
import React from 'react'
let help=new Helper()
const LoginScreen = ({navigation}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const handleGoogleLogin = async () => {
    GoogleSignin.configure({
       androidClientId: ANDROID_CLIENT_ID,
       iosClientId: IOS_CLIENT_ID
    });
    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
        GoogleSignin.signIn().then(async(userInfo) => {
          await help.locationPermission()
          dispatch(saveCurrentLogedinUserData(userInfo?.user));
          navigation.reset({
            index: 0,
            routes: [{ name: 'BottomTabs'}],
          })
        }).catch((e) => {
          console.log("ERROR IS: " + JSON.stringify(e));
        })
   
      }
    }).catch((e) => {
      console.log("ERROR IS: " + JSON.stringify(e));
    })
  }
  return (
  <SafeAreaView style={styles.containerStyle}>
     <TouchableOpacity style={[styles.googleBtnViewStyle,{backgroundColor:colors.primaryColor}]} onPress={()=>{handleGoogleLogin()}}>
      <Image source={images.Google} style={styles.googleImageStyle}/>
      <Text style={[styles.LoginWithGoogleTextStyle,{color:colors.whiteColor}]}>Login With Google</Text>
     </TouchableOpacity>
  </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  containerStyle:{flex:1,alignItems:'center',justifyContent:'center',marginHorizontal:30},
  googleBtnViewStyle:{height:48,flexDirection:'row',alignItems:'center',width:'100%',borderRadius:5,justifyContent:'center'},
  googleImageStyle:{height:35,width:35},
  LoginWithGoogleTextStyle:{marginLeft:10,fontSize:16}
})