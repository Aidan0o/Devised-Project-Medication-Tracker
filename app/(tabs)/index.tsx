import { Image } from 'expo-image';
import { StyleSheet, TextInput } from 'react-native';

import BluetoothConnectButton from '@/components/connect-button';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useEffect, useState } from 'react';

import AddMedButton from '@/components/ui/NavButtons/addMedButton';
import ViewMedButton from '@/components/ui/NavButtons/viewMedButton';

function bluetoothConnect() {
  console.log("HELL")
} 

export default function HomeScreen() {
  const [connected, setConnected] = useState(false)
  const [fieldValue, setFieldValue] = useState("red")
  const [fieldValue2, setFieldValue2] = useState("")
  const [color, setColor] = useState("blue")
  useEffect(() => {
    console.log("IM LOADED")
  }, [])

  useEffect(() => {
    if (fieldValue!="blue") {
      setColor(fieldValue)
    } else {
      setColor("blue")
    }
  }, [fieldValue])

  const clickHandler = (ev) => {
    const values = {
      value1: fieldValue, 
      value2: fieldValue2
    }
    setConnected(!connected) //sets the bool value of connected to the opposite of what it currently is
    console.log("Submiting", values)
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: color, dark: color }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{fieldValue}</ThemedText>
        <BluetoothConnectButton
           onConnect={setConnected}
          />
        
        <TextInput 
           value={fieldValue}
            style={styles.input}
            onChangeText={(value) => {
              console.log(value)
             setFieldValue(value)
          }}
        /> 
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
         <TextInput 
           value={fieldValue2}
            style={styles.input}
            onChangeText={(value) => {
              console.log(value)
             setFieldValue2(value)
          }}
        />
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <BluetoothConnectButton onConnect={{setConnected}}/> 
      </ThemedView>

      <ThemedView>
        <ViewMedButton/>
      </ThemedView>
      <ThemedView>
        <AddMedButton/>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
