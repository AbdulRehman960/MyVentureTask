import { Button, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { lightTheme,darkTheme } from './src/theme/Theme';
import store from './src/redux_toolkit/store';
import {Provider} from 'react-redux';
import RootNavigator from './src/navigation/RootNavigator';
const App = () => {
 
  return (
    <Provider store={store}>
    <NavigationContainer theme={lightTheme}>
      <StatusBar backgroundColor="transparent"   barStyle={'dark-content'}/>
      <RootNavigator/>
    </NavigationContainer>
    </Provider>
  )
}

export default App

