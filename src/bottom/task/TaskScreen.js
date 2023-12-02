import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity, Image, FlatList, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { images } from '../../assets/images'
import { useDispatch, useSelector } from "react-redux";
import { taskManager } from '../../redux_toolkit/slices/TaskSlice';
import * as Animatable from 'react-native-animatable';
const TaskScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isTaskSavedSuccess,isTaskSavedFail,isTaskSavedFetch,taksData} =useSelector((state)=>state.task)
  useEffect(()=>{
    console.log(taksData)
  },[taksData])

  const handleComplete=(item)=>{
    Alert.alert(
      'Complete Task',
      'Are you sure you want to Complete This task?',
      [
        
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes', 
          onPress: () => {
              dispatch(
                taskManager({
                    type: "updateTask",
                    payload: {
                      toBeUpdate: true,
                      name: item?.taskName,
                    },
                  })
                );
              
          }
        },
      ],
      {cancelable: false},
    );
  }
  return (
   <SafeAreaView style={styles.containerStyle}>
   <TouchableOpacity style={styles.PlustBtnStyle} onPress={()=>{navigation.navigate("AddTaskScreen")}}>
    <Image source={images.Plus} style={styles.PlusImageStyle}/>
   </TouchableOpacity>
   <View style={{flex:1,marginTop:30}}>
    <FlatList
      data={taksData}
      ListEmptyComponent={()=>{
        return<View style={styles.emptyViewStyle}>
          <Text>No Tasks</Text>
        </View>
      }}
      renderItem={({item,index})=>{
        return(
          <Animatable.View animation="fadeInUp" iterationCount={1}>
          <TouchableOpacity   style={styles.flatListTileStyle} onPress={()=>{navigation.navigate("TaskDetailScreen",{item})}} onLongPress={()=>{handleComplete(item)}}>
       
         <View style={{width:'10%',height:30}}>
          <Image source={images.Task} style={styles.taskImageStyle}/>
          </View>
          <View style={{width:'90%',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{color:'#000',fontSize:14}}>{item.taskName}</Text>
          <Text style={{color:'gray',fontSize:11}}>{item.status}</Text>
          </View>
          </TouchableOpacity>
          </Animatable.View>
        )
      }}
    />
   </View>

   </SafeAreaView>
  )
}

export default TaskScreen

const styles = StyleSheet.create({
  containerStyle:{flex:1,paddingHorizontal:16},
  PlustBtnStyle:{marginTop:10,alignSelf:'flex-end'},
  PlusImageStyle:{height:40,width:40},
  emptyViewStyle:{flex:1,alignItems:'center',justifyContent:'center'},
  flatListTileStyle:{flexDirection:'row',alignItems:'center',width:'100%',borderWidth:1,borderColor:'#D9DADB',padding:10,borderRadius:6,marginBottom:5},
  taskImageStyle:{height:25,width:25}
})