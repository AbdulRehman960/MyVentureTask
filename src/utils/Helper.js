import { Alert, Linking } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';
export default class Helper {
  Condition = true; // Condition to switch b/w API == true and Firebase == false.

  isEmptyString(str) {
    return str == '' || !str;
  }

  isEmptyArray(arr) {
    return !arr || arr.length == 0;
  }

  isValidEmail(email) {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  isValidPhoneNumber(phone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
  }
  isValidPassword(password) {
    let re =
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$_&-+-()/="':;?,.<>%^&*])[a-zA-Z0-9!@#$_&-+-()/="':;?,.<>%^&*]{8,100}$/;
    return password.match(re);
  }

  showToast(message) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: 'green',
      textColor:  'white',
      action: {
        text: 'Ok',
        textColor: 'white',
      },
    });
  }

  showAlert(title, msg, color, onPress) 
  {
    // Alert.alert(title, msg, [{ text: 'TryAgain', style: 'cancel',onPress={onPress} }]);
    Alert.alert(
      title,
      msg,
      [
        {
          text: "Ok",
          onPress: () => { },
          style: "cancel"
        },
      ]
    );
  }

  

  getCurrentLocation = () =>
    new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            position => {
                const cords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    heading: position?.coords?.heading,
                };
             
                resolve(cords);
            },
            error => {
                reject(error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        )
    })

 locationPermission = () => new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
        try {
            const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
            if (permissionStatus === 'granted') {
                return resolve("granted");
            }
            reject('Permission not granted');
        } catch (error) {
            return reject(error);
        }
    }
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve("granted");
        }
        return reject('Location Permission denied');
    }).catch((error) => {
        console.log('Ask Location permission error: ', error);
        return reject(error);
    });
});

}
