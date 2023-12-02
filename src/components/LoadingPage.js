import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
const LoadingPage = props => {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size={'large'} color="#00AF80" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    elevation: 40,
    left: 0,
    top: 0,
    zIndex: 9999,
    width: '100%',
    opacity: 0.5,
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 80,
    height: 80,
  },
});

export default LoadingPage;