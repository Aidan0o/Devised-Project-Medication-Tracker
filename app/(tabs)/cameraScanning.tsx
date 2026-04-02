
import { useEffect, useState } from 'react';
import { Alert, Button, Image, StyleSheet, View } from 'react-native';

//seperate into different comps
//taking/choosing image lib
import * as ImagePicker from 'expo-image-picker'; //imports all 
//OCR lib 
import { extractTextFromImage } from 'expo-text-extractor';
//openAI lib





export default function ImagePickerComp({ onImageChange }) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      // onImageChange(image);
      const scriptText = extractTextFromImage(image).then(console.log)

    }
  }, [image])

  //function to handle choosing a photo from devies library
  const pickImage = async () => {
    //asks for permission to access images
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Unable to access image library\nPlease allow access in your devices settings');
      return;
    }

    let chosenImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], //only displays images
      allowsEditing: true, //allows user to crop image so they can crop out personal data
      aspect: [3, 2], //short height in order to better avoid capturing personal data (tested with A4 note - )
      quality: 1, //quality is maximised when image is compressed to improve the accuracy of the OCR (0 focuses on making the file smaller) 
    });
    //Add fail safe to be added incase user doesn't crop out personal data!

    console.log(chosenImage);

    if (!chosenImage.canceled) {
      setImage(chosenImage.assets[0].uri);
    }
  };

  //function to handle taking a photo using camera
  const takePhoto = async () => {
    const cameraPermissionResult = await ImagePicker.getCameraPermissionsAsync();

    if (!cameraPermissionResult.granted) {
      Alert.alert('Unable to access camera\nPlease allow access in your devices settings')
    }

    let takenPhoto = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'], //only allows photos to be taken
      cameraType: ImagePicker.CameraType.back,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    })

    if (!takenPhoto.canceled) {
      setImage(takenPhoto.assets[0].uri)
    }
  };


  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take photo using camera" onPress={takePhoto} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});