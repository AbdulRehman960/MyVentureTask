import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity,Image,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../assets/images'
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { taskManager } from '../../redux_toolkit/slices/TaskSlice';
import axios from 'axios';
import Notifications from '../../notification/Notifications';
const TaskDetailScreen = ({navigation,route}) => {
    const dispatch = useDispatch();
    const [areaName,setAreaName]=useState('')
    const [weather,setWeather]=useState({})
    const [selectedLocation, setSelectedLocation] = useState({
        name:"",
        latitude: null,
        longitude: null,
      });
    useEffect(()=>{
        setSelectedLocation(route?.params?.item?.location)
        getWeatherData(route?.params?.item?.location?.latitude,route?.params?.item?.location?.longitude)
        console.log(route?.params?.item)
    },[])

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
    const handleDeleteTask=()=>{

        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete This task?',
            [
              
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Yes', 
                onPress: () => {
                  Notifications.cancelNotification(route?.params?.item?.taskId)
                    dispatch(
                        taskManager({
                          type: "deleteTask",
                          payload: {
                            toBeRemoved: true,
                            name: route?.params?.item?.taskName,
                          },
                        })
                      );
                      navigation.goBack()
                }
              },
            ],
            {cancelable: false},
          );
       
    }
  return (
    <SafeAreaView style={styles.contaierStyle}>
   <TouchableOpacity onPress={()=>{navigation.goBack()}}>
    <Image source={images.Back} style={styles.backImageStyle}/>
   </TouchableOpacity>
  <View style={{marginHorizontal:16,marginTop:10}}>
  <Text style={{color:'#000',fontSize:14}}>Task Name:</Text>
   <Text style={{color:'#000',fontSize:16,marginTop:5}}>{route?.params?.item?.taskName}</Text>
   <Text style={{color:'#000',fontSize:14,marginTop:10}}>Task Description:</Text>
   <Text style={{color:'#000',fontSize:16,marginTop:5}}>{route?.params?.item?.taskDescription}</Text>
   <Text style={{color:'#000',fontSize:14,marginTop:10}}>Task Date:</Text>
   <Text style={{color:'#000',fontSize:16,marginTop:5}}>{route?.params?.item?.taskDate}</Text>
   <Text style={{marginTop:10}}>Area : {areaName}</Text>
 
 <Text style={{marginTop:10}}>Himidity : {weather?.humidity}</Text>

 <Text style={{marginTop:10}}>Pressure : {weather?.pressure}</Text>

 <Text style={{marginTop:10}}>Temperature : {weather?.temp}</Text>
   {
    route?.params?.item?.location?.latitude!=null&& route?.params?.item?.location?.longitude!=null&&
    <View style={styles.mapViewStyle}>
           <MapView 
            customMapStyle={[
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]}
          style={styles.mapStyle}
          initialRegion={{
            latitude: selectedLocation?.latitude || 31.4731423,
            longitude: selectedLocation?.longitude || 74.3020662,
            latitudeDelta: 0.09*10,
            longitudeDelta: 0.09 * 10
          }}
        
        >
          {selectedLocation.latitude && selectedLocation.longitude && (
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude??0,
                longitude: selectedLocation.longitude??0,
              }}
              title={selectedLocation.name}
              image={images.MapUserpin}
            />
          )}
           </MapView>
    </View>

   }
     <TouchableOpacity style={{width:'10%',height:30,marginTop:30,alignSelf:'center'}} onPress={()=>{handleDeleteTask()}}>
<Image source={images.Delete} style={{height:25,width:25}}/>
         </TouchableOpacity>
  </View>
   </SafeAreaView>
  )
}

export default TaskDetailScreen

const styles = StyleSheet.create({
    contaierStyle:{flex:1,marginHorizontal:14},
  backImageStyle:{height:30,width:20,marginTop:10},
  mapViewStyle:{height:200,marginTop:20},
  mapStyle: {
    minHeight: 200,
    minWidth: "100%", 
  }
})