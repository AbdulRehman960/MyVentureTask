import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'


const Button = ({text,onPress}) => {
  return (
    <TouchableOpacity style={styles.btnStyle} onPress={()=>{onPress()}}>
            <Text style={{color:'#FFF',fontSize:16}}>{text}</Text>
          </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    btnStyle:{marginTop:20,height:48,backgroundColor:'green',alignItems:'center',justifyContent:'center',borderRadius:6}
})