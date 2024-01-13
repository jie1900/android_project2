import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Text, Button, SafeAreaView, StyleSheet, Linking, Platform, View, Image } from 'react-native';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 'Not known',
    longitude: 'Not known',
  });
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const getCurrentPosition = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const showMapwithCurrentPosition = () => {
    const url = Platform.select({
      android: `geo:${currentLocation.latitude},${currentLocation.longitude}`,
      ios: `maps:${currentLocation.latitude},${currentLocation.longitude}`,
    });
    Linking.openURL(url);
  };

  const callMe = () => {
    const url = `tel:${'1234567'}`;
    Linking.openURL(url);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <Text style={{ fontSize: 35 }}>
        {'Lat: ' + currentLocation.latitude + ' Lng: ' + currentLocation.longitude}
      </Text>
      <Button title="Get Current Position" onPress={getCurrentPosition} />
      <Button title="Show on Map" onPress={showMapwithCurrentPosition} />
      <Button title="Call 1234567" onPress={callMe} />
      <Button title="Take a Picture" onPress={takePicture} />
      <Button title="Pick an Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {hasCameraPermission && (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={Camera.Constants.Type.back}
        />
      )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  camera: {
    height: 300,
    width: '100%',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});