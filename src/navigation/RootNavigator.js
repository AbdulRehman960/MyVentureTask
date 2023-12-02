import {
  Button,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from '../auth/SplashScreen';
import LoginScreen from '../auth/LoginScreen';
import WeatherScreen from '../bottom/weather/WeatherScreen';
import GoogleMapScreen from '../bottom/map/GoogleMapScreen';
import TaskScreen from '../bottom/task/TaskScreen';
import AddTaskScreen from '../bottom/task/AddTaskScreen';
import LocationScreen from '../components/MyLocationScreen';
import TaskDetailScreen from '../bottom/task/TaskDetailScreen';
import {images} from '../assets/images';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const RootNavigator = () => {

  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            height: Platform.OS == 'ios' ? '9%' : '8%',
            borderWidth: 0,
            // borderTopLeftRadius: 20,
            // borderTopRightRadius: 20,
            borderColor: '#FFFFFF',
            borderTopWidth: 0,
            shadowOpacity: 0.1,
            position: 'absolute',
          },
        }}
        tabBarStyle={{}}
        tabBarOptions={{
          showLabel: false,
          keyboardHidesTabBar: true,
          tabBarStyle: [{display: 'flex'}, null],
        }}>
        <Tab.Screen
          name="WeatherScreen"
          component={WeatherScreen}
          options={{
            title: 'WeatherScreen',
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  // marginBottom: 10,
                  marginTop: 15,
                }}>
                <Image
                  source={images.Weather}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#00AF80' : '#A1A1AC',
                  }}
                />
                
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="GoogleMapScreen"
          component={GoogleMapScreen}
          options={{
            title: 'GoogleMapScreen',
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  // marginBottom: 10,
                  marginTop: 15,
                }}>
                <Image
                  source={images.Map}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#00AF80' : '#A1A1AC',
                  }}
                />
              
              </View>
            ),
          }}
        />
         <Tab.Screen
          name="TaskScreen"
          component={TaskScreen}
          options={{
            title: 'GoogleMapScreen',
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  // marginBottom: 10,
                  marginTop: 15,
                }}>
                <Image
                  source={images.Task}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused ? '#00AF80' : '#A1A1AC',
                  }}
                />
              
              </View>
            ),
          }}
        />

       

       
      </Tab.Navigator>
    );
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen}  options={{...TransitionPresets.SlideFromRightIOS}} />
      <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{...TransitionPresets.SlideFromRightIOS}} />
      <Stack.Screen name="AddTaskScreen" component={AddTaskScreen}   options={{...TransitionPresets.SlideFromRightIOS}}/>
      <Stack.Screen name="LocationScreen" component={LocationScreen}   options={{...TransitionPresets.SlideFromRightIOS}}/>
      <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen}   options={{...TransitionPresets.SlideFromRightIOS}}/>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
