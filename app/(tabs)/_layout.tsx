import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';


import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { medBoxBle } from '@/components/bluetoothUtils/BLE-connect';


import { Lexend_400Regular, Lexend_700Bold, useFonts } from '@expo-google-fonts/lexend';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [manager, setManager] = useState(medBoxBle);
  const [fontsLoaded] = useFonts({
    Lexend_400Regular, // regular weight
    Lexend_700Bold,    // bold weight
  });


  useEffect(() => {
    if(manager){
      manager.connect().then(() =>{
        console.log("im connected to the ESP32");
        manager.send("HELLO ESP MADAFAKA")
          .then((r) => {console.log("sent!", r)
          .catch((err) => console.log("error: ", err))
        })
      });
    }
  },
  [manager]
  )  

  

  

  if (!fontsLoaded) return null;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="viewPrescriptions"
        options={{
          title: 'View Medications',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="cross.case.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="addPrescription"
        options={{
          title: 'Add Prescription',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
          name="connectPage"
          options={{
          title: 'connect',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="dot.radiowaves.left.and.right" color={color} />,
        }}
      />
    </Tabs>
  );
}
