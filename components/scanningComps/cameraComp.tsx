
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, Image, StyleSheet, View } from 'react-native';

//seperate into different comps
//taking/choosing image lib
import * as ImagePicker from 'expo-image-picker'; //imports all 
//OCR lib 
import { extractTextFromImage } from 'expo-text-extractor';
//openAI lib
import { timeMap } from '@/constants/timeMap';
import { OpenAI } from 'openai';

const scriptAI = new OpenAI({
  apiKey: 'No key for you',

  dangerouslyAllowBrowser: true,
})



const prompt =
  `
Im sending you the instructions from a prescription form.
I want you to extract the following data from the instructions 
Medication name
Medication dose (number and unit should be seperate)
The strength of each capsule (number and unit should be seperate)
Supply number
frequency of dose (seperated into the number and the time period ((3) times (daily))


return this data as JSON only - no markdown, no extra comments, purely just the JSON data in the following structure:
Never attempt to fill the scriptLength, notiTimes, pillsPerDose or scripStartDate fields - leave them empty every time
{
  "medication": {
    "doseAmount": "number",
    "doseUnit": "string",
    "frequencyPer": "string",
    "frequencyTimes" : "number",
    "name": "string",
    "pillStrength": "number",
    "pillStrengthUnit" : "string",
    "pillCountPerDose" : "number",
    "totalSupply": "number",
    "scriptLength" : "number,
    "StartDate" : "string",
    "times" :  "string []"
  }
}

Here are the instructions:  SCRIPTTEXT
`





export default function ImagePickerComp({ onImageChange }) {
  const [image, setImage] = useState<string | null>(null);

  const router = useRouter();
  //break into seperate functions
  useEffect(() => {
    if (image) {
      // onImageChange(image);
      extractTextFromImage(image).then((OCRresponse) => {
        console.log(OCRresponse);
        const parsedPrompt = prompt.replace('SCRIPTTEXT', OCRresponse.join('\n')) //replaces SCRIPTTEXT with the text from the OCR reader
        console.log(parsedPrompt)


        scriptAI.chat.completions.create({
          model: 'gpt-4o',
          temperature: 0,
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: parsedPrompt, //sends prompt to api
                },
              ],
            },
          ],
        }).then((aiResponseTemp) => {
          const aiResponse = aiResponseTemp.choices[0].message.content //selects only the JSON content from the API response
          console.log(aiResponse)
          const parsedAiResponse = JSON.parse(aiResponse)
          console.log(parsedAiResponse.medication.name)
          const numPerDay = parsedAiResponse.medication.frequencyTimes
          const times = timeMap[numPerDay];
          console.log(times);
          let pillsPerDose = (parsedAiResponse.medication.doseAmount) / (parsedAiResponse.medication.pillStrength)
          let pillPerDay = (parsedAiResponse.medication.frequencyTimes) * (pillsPerDose);
          console.log(pillPerDay);
          let scriptLength = (parsedAiResponse.medication.totalSupply) / (pillPerDay);
          console.log(scriptLength);

          parsedAiResponse.medication.scriptLength = scriptLength;
          parsedAiResponse.medication.times = times;
          parsedAiResponse.medication.pillCountPerDose = pillsPerDose;
          onImageChange(parsedAiResponse);
          console.log(parsedAiResponse.medication);
        });
      })

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
      router.navigate('/(tabs)/addPrescription')
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
      router.navigate('/(tabs)/addPrescription')
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