import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';


import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { medBoxBle } from '@/components/bluetoothUtils/BLE-connect';
import { createDB, debugDB, dropDB, insertMedicine, insertSchedule, insertScheduleItem } from '@/components/databaseUtils/database';
import { dateIterator } from '@/components/dateIterator';
// import { createDB } from '@/components/databaseUtils/database';
//temp obj:
const tempObj = {
  doseAmount: 300,
  doseUnit: 'mg',
  frequencyPer: 'day',
  frequencyTimes: 3,
  name: 'test',
  pillStrength: 3,
  pillStrengthUnit: 'test',
  pillCountPerDose : '2',
  totalSupply: 6,
  scriptLength: 5,
  startDate: 1,
  times: ["9:00", "15:00", "21:00"]
}



let date = tempObj.startDate

//tabs
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [manager, setManager] = useState(medBoxBle);
  // const [fontsLoaded] = useFonts({
  //   Lexend_400Regular, // regular weight
  //   Lexend_700Bold,    // bold weight
  // });

  //Bluetooth Connection 
  useEffect(() => {
    if (manager) {
      dropDB();
      createDB(); //creates database when app starts
      //test
      
      let medicineID = insertMedicine(tempObj);
      let scheduleID = insertSchedule(tempObj.scriptLength, tempObj.startDate, medicineID);
      date = dateIterator(tempObj.startDate, date);
      for (let i = 0; i < tempObj.scriptLength; i++) {
        tempObj.times.forEach((time) => {
          const scheduleItemId = insertScheduleItem(time, date, scheduleID);
          //make notification.then(update scheduleItemId with notiication id)
        });
        date += 1;
      }
      debugDB();
      manager.connect().then(() => {
        console.log("im connected to the ESP32");
        manager.send("test")
          .then((r) => { console.log("sent!", r) })
          .catch((err) => console.log("error: ", err))
      });
    }
  },
    [manager]
  )

  //sqlite db
  // useEffect(() => {
  //   createDB();
  // }, []);




  // if (!fontsLoaded) return null;

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
