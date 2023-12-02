import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { FONTS } from '../theme/GlobalStyle'

const InputText = ({heading,value,placeholder,onChangeText,autoFocus,keyType,Ref,onSubmitEditing}) => {
  return (
    <View>
         <Text style={[FONTS.h20,{marginVertical:8,color:"#000"}]}>{heading}</Text>
         <View style={{height:40,borderRadius:4,borderWidth:1,borderColor:'#D9DADB',paddingHorizontal:10}}>
        <TextInput ref={Ref} returnKeyType={keyType} autoFocus = {autoFocus} value={value} placeholder={placeholder} placeholderTextColor={'#C8C8C8'} style={{height:40,width:'100%'}} onChangeText={((desc)=>{
         onChangeText(desc)
        })}  onSubmitEditing={() => {onSubmitEditing()}}
    blurOnSubmit={false}/>
        </View>
    </View>
    
  )
}

export default InputText

const styles = StyleSheet.create({})