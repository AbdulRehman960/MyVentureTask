import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
const PickerDate = (props) => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  return (
    <DatePicker
    modal
    open={props.open}
    mode='datetime'
    date={date}
    is24hourSource="device"
    onConfirm={(date) => {
      setDate(date)
      props.onDateSelect(date)
    }}
    onCancel={() => {
      props.onCancel()
    }}
  />
  )
}

export default PickerDate

const styles = StyleSheet.create({})