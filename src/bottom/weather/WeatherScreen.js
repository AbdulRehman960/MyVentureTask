import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { saveLocation } from '../../redux_toolkit/slices/LocationSlice';
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from 'react'
import Helper from '../../utils/Helper';
import axios from 'axios';
const WeatherScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [areaName,setAreaName]=useState('')
  const [weather,setWeather]=useState({})
  const {location} =useSelector((state)=>state.location)
  let help=new Helper()

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLocation()
    });
    return unsubscribe;
  }, [navigation]);
 


  const getLocation=async()=>{
    const locPermissionDenied = await help.locationPermission()
    if (locPermissionDenied) 
    {
        const { latitude, longitude, heading } = await help.getCurrentLocation()
        getWeatherData(latitude,location?.longitude)
        dispatch(saveLocation({
          name: "",
        latitude: latitude,
        longitude:longitude,
      }));
        
    }
  }
   const getWeatherData = async (lat,lng) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=d712b9ee8f681608486a37fdec8473e3`);
      console.log(response.data);
      setWeather(response.data?.main)
      setAreaName(response.data?.name)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  return (
    <SafeAreaView style={styles.containerStyle}>
    <Text>Area : {areaName}</Text>
 
    <Text style={{marginTop:10}}>Himidity : {weather?.humidity}</Text>
  
    <Text style={{marginTop:10}}>Pressure : {weather?.pressure}</Text>
  
    <Text style={{marginTop:10}}>Temperature : {weather?.temp}</Text>



    </SafeAreaView>
  )
}

export default WeatherScreen

const styles = StyleSheet.create({
  containerStyle:{flex:1,alignItems:'center',justifyContent:'center'}
})