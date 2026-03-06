import { Image, StyleSheet } from 'react-native';

import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import AddMedButton from '@/components/NavButtons/addMedButton';
import ViewMedButton from '@/components/NavButtons/viewMedButton';

function bluetoothConnect() {
  console.log("HELL")
} 

export default function HomeScreen() {
  const [connected, setConnected] = useState(false)
  useEffect(() => {
    console.log("IM LOADED")
  }, [])



  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.Container}>
            <Image 
            source={require('../../assets/images/PillPallLogo.png')} 
            style={{width: 160, height: 70}}
            />
            <AddMedButton/>
            <ViewMedButton/>
        </SafeAreaView>
    </SafeAreaProvider>


  );
}


const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
