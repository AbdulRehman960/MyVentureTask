import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyLocationScreen from '../../components/MyLocationScreen'

const GoogleMapScreen = (props) => {
  return (
    <SafeAreaView style={{flex:1}}>
      <MyLocationScreen {...props}/>
    </SafeAreaView>
  )
}

export default GoogleMapScreen

const styles = StyleSheet.create({})