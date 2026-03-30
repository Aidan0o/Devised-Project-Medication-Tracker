import { Image, StyleSheet, View } from 'react-native';

import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import AddMedButton from '@/components/ui/NavButtons/addMedButton';
import ViewMedButton from '@/components/ui/NavButtons/viewMedButton';

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
          style={{ width: 500, height: 500 }}
        />
        <View style={styles.tempPlaceholder}>

        </View>
        <View style={styles.buttons}>
          <AddMedButton />
          <ViewMedButton />
        </View>

      </SafeAreaView>
    </SafeAreaProvider>


  );
}


const styles = StyleSheet.create({
  Container: {
    // flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    alignContent: 'space-between'
    // gap: 8,
  },

  buttons: {
    flexDirection: 'row',
    gap: 10,
  },

  tempPlaceholder: {
    borderWidth: 5,


  }
});
