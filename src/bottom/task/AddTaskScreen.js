import { Image, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useEffect, useRef, useState } from 'react'
import { images } from '../../assets/images';
import { FONTS } from '../../theme/GlobalStyle';
import PickerDate from '../../components/PickerDate';
import InputText from '../../components/InputText';
import Helper from '../../utils/Helper';
import Button from '../../components/Button';
import {clearTaskSliceState, saveTasks} from '../../redux_toolkit/slices/TaskSlice';
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from '../../components/LoadingPage';
import UUIDGenerator from 'react-native-uuid-generator';
import Notifications from '../../notification/Notifications';
const AddTaskScreen = ({navigation}) => {
  const dispatch = useDispatch();
  let help=new Helper()
 const {isTaskSavedSuccess,isTaskSavedFail,isTaskSavedFetch,taksData} =useSelector((state)=>state.task)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [taskDate, setTaskDate] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedLocation, setSelectedLocation] = useState({
    name:"",
    latitude: null,
    longitude: null,
  });
  
  const textInput1 = useRef(null);
  const textInput2 = useRef(null);

  useEffect(()=>{
    if(isTaskSavedSuccess)
    {
      dispatch(clearTaskSliceState())
      navigation.goBack()
      help.showToast("Task Added Successfully!!!")
    }
  },[isTaskSavedSuccess])
  useEffect(()=>{
    if(isTaskSavedFail)
    {
      dispatch(clearTaskSliceState())
      help.showToast("Task Failed")
    }
  },[isTaskSavedFail])
  const handleAddTask=()=>{
    if(help.isEmptyString(taskName))
    {
      textInput1.current.focus()
      help.showToast("Task Name is Required")
    }
    else  if(help.isEmptyString(taskDescription))
    {
      textInput2.current.focus()
      help.showToast("Task Description is Required")
    }
    else  if(help.isEmptyString(taskDate))
    {
      help.showToast("Task Date is Required")
    }
    else
    {
     
      let time=getExactTime(taskDate)
        Notifications.schduleNotification(new Date(Date.now() + time * 1000),1+taksData?.length,taskName)
        dispatch(saveTasks({
          taskId:1+taksData?.length,
          taskName,
          taskDescription,
          taskDate,
          location:selectedLocation,
          status:"Pending"
        }));
     
    }

  }

  const getExactTime=(dateString)=>{
const specifiedDateTime = new Date(dateString);
const currentDateTime = new Date();
const differenceInSeconds = (specifiedDateTime.getTime() - currentDateTime.getTime()) / 1000;
console.log(differenceInSeconds)
return differenceInSeconds

  }
  const onSelectLocation = (data) => {
    console.log(data)
    setSelectedLocation({
      name: data?.coords?.name,
      latitude: data?.coords?.latitude,
      longitude: data?.coords?.longitude,
    })
    
  };
  return (
   <SafeAreaView style={styles.contaierStyle}>
   <TouchableOpacity onPress={()=>{navigation.goBack()}}>
    <Image source={images.Back} style={styles.backImageStyle}/>
   </TouchableOpacity>
   {
    isTaskSavedFetch&&
    <LoadingPage/>
   }
   <View style={styles.subViewStyle}>
       <InputText Ref={textInput1} keyType={"next"} autoFocus={true} heading={"Task Name"} value={taskName} placeholder='Name Of Task' onChangeText={(name)=>{setTaskName(name)}} onSubmitEditing={()=>{textInput2.current.focus()}}/>
       <InputText Ref={textInput2} keyType={"done"} heading={"Task Description"} value={taskDescription} placeholder='Task Description' onChangeText={(desc)=>{setTaskDescription(desc)}} onSubmitEditing={()=>{Keyboard.dismiss()}}/>
         <Text style={[FONTS.h20,{marginVertical:8,color:"#000"}]}>Date/Time</Text>
        <View style={styles.dateTimeViewStyle}>
          <TextInput value={taskDate} placeholder='e.g' placeholderTextColor={'#C8C8C8'} style={styles.textFieldStyle} editable={false}/>
          <TouchableOpacity style={styles.datePickerBtnStyle} onPress={()=>{setIsDatePickerOpen(!isDatePickerOpen)}}>
            <Image resizeMode='contain' source={images.DatePicker} style={styles.dateImageStyle}/>
          </TouchableOpacity>
        </View>
        <Text style={[FONTS.h20,{marginVertical:8,color:"#000"}]}>location</Text>
        <View style={styles.dateTimeViewStyle}>
          <TextInput value={""} placeholder='Lahore' placeholderTextColor={'#C8C8C8'} style={styles.textFieldStyle} editable={false}/>
          <TouchableOpacity style={styles.datePickerBtnStyle} onPress={()=>{navigation.navigate("LocationScreen",{onSelectLocation :onSelectLocation,isAllowReturn:true })}}>
            <Image resizeMode='contain' source={images.Currentlocation} style={styles.dateImageStyle}/>
          </TouchableOpacity>
        </View>
          {
            isDatePickerOpen&&
            <PickerDate open={isDatePickerOpen} onCancel={()=>{setIsDatePickerOpen(false)}} onDateSelect={(date)=>{setTaskDate(date.toString().substring(0,24))}}/>
          }
          {
            selectedLocation?.latitude!=null &&selectedLocation?.longitude!=null &&
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
         <Button text="Add Task" onPress={()=>{handleAddTask()}}/>
   </View>
  
    
       
         
   </SafeAreaView>
  )
}

export default AddTaskScreen

const styles = StyleSheet.create({
  contaierStyle:{flex:1,marginHorizontal:14},
  backImageStyle:{height:30,width:20,marginTop:10},
  subViewStyle:{flex:1,paddingTop:10},
  dateTimeViewStyle:{height:40,borderRadius:4,borderWidth:1,borderColor:'#D9DADB',paddingHorizontal:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  textFieldStyle:{height:40,width:'90%'},
  datePickerBtnStyle:{height:40,width:40,alignItems:'center',justifyContent:'center'},
  dateImageStyle:{height:16.25,width:16.25},
  mapViewStyle:{height:200,marginTop:20},
  mapStyle: {
    minHeight: 200,
    minWidth: "100%", 
  }
})