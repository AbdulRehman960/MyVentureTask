import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Dimensions,
  PermissionsAndroid,
  Image,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { images } from "../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { saveLocation } from "../redux_toolkit/slices/LocationSlice";
const MyLocationScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState({
    name:"",
    latitude: null,
    longitude: null,
  });
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "so you can choose location",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("you can choose location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handlePlaceSelection = (data, details = null) => {
    if (details) 
    {
        const { formatted_address, geometry } = details;
        const { location } = geometry;
        setSelectedLocation({
            name: formatted_address,
          latitude: location.lat,
          longitude: location.lng,
        });

        dispatch(saveLocation({
          name: formatted_address,
        latitude: location.lat,
        longitude: location.lng,
      }));
     
      }
  };
 
  const handleConfirm = () => {
    props?.navigation.goBack();
    props?.route?.params?.onSelectLocation({ coords : selectedLocation });
  };
  return (
    <View style={styles.saveAreaViewContainer}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
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
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title={selectedLocation.name}
              image={images.MapUserpin}
            />
          )}
        </MapView>
     
      <View style={styles.searchBoxMainViewStyle}>
        <GooglePlacesAutocomplete
          placeholder="Type your Location / Address here"
          minLength={2} 
          autoFocus={false}
          returnKeyType={"search"} 
          fetchDetails={true} 
          onPress={(data, details) => {
            handlePlaceSelection(data, details);
          }}
          query={{
            key: "AIzaSyDCtippmTE1DS7339j-zKhsIEMG0Y1m2uM",
            language: "en", 
          }}
          styles={{
            container: {
              position: "absolute",
              top: 7,
              left: 10,
              right: 10,
            },
            listView: {},
          }}
          renderLeftButton={() => (
            <View style={styles.searchIconContainer}>
              <Image
                source={images.Currentlocation}
                style={{ height: 22, width: 16 }}
              />
            </View>
          )}
        />
      </View>

     
        {
          props?.route?.params?.isAllowReturn&&
          <TouchableOpacity style={styles.confirmButtonStyle} onPress={()=>{handleConfirm()}}>
        <Text style={{color:'#FFF'}}>Confirm</Text>
        </TouchableOpacity>
        }
        
     
    </View>
  );
};

export default MyLocationScreen;

const styles = StyleSheet.create({
  saveAreaViewContainer: {
    flex: 1,
    alignItems: "center",
  },
  mapStyle: {
    minHeight: "100%",
    minWidth: "100%", 
  },
 
  searchBoxMainViewStyle: {
    position: "absolute",
    top: 10,
    zIndex: 1,
    width: "90%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#CDCDCD",
    backgroundColor: "#FFFFFF",
  },
 
  searchIconContainer: {
    justifyContent: "center",
    marginBottom: 7,
  },
  confirmButtonStyle:{
    position: "absolute",
    width: "90%",
    bottom: "10%",
    borderRadius: 15,
    backgroundColor:'green',height:48,alignItems:'center',justifyContent:'center'
  }
});
