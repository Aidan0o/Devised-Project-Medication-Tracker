import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';


import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { Medication } from '@/components/medicationTypes';

import { medBoxBle } from '@/components/bluetoothUtils/BLE-connect';
import { createDB, debugDB, dropDB, insertMedicine, insertSchedule, insertScheduleItem, updateScheduleItem } from '@/components/databaseUtils/database';
import { dateTimeBuilder } from '@/components/dateTimeBuilder';
import { notificationPermissions, scheduleNotification, showNotifications } from '@/components/notificationUtils/notificationScheduler';
import { add } from 'date-fns';
// import { createDB } from '@/components/databaseUtils/database';
//temp obj:
const tempObj: Medication = {
  doseAmount: 300,
  doseUnit: 'mg',
  frequencyPer: 'day',
  frequencyTimes: 3,
  name: 'paracetamol',
  pillStrength: 300,
  pillStrengthUnit: 'mg',
  pillCountPerDose: 2,
  totalSupply: 6,
  scriptLength: 5,
  startDate: 1,
  times: ["9:00", "15:00", "21:00"]
}



// let date = tempObj.startDate

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
      const startDate = new Date(); //sets start date to today
      let date = startDate;
      let medicineID = insertMedicine(tempObj);
      let scheduleID = insertSchedule(tempObj.scriptLength, tempObj.startDate, medicineID);
      // date = dateIterator(tempObj.startDate, date);
      notificationPermissions().then(() => console.log('permission granted'),)
      showNotifications();
      // testNotification().then((res) => console.log("test", res));
      for (let i = 0; i < tempObj.scriptLength; i++) {
        tempObj.times.forEach((time) => {
          const notiDateTime = dateTimeBuilder(date, time);
          const scheduleItemId = insertScheduleItem(time, notiDateTime, scheduleID);
          console.log(notiDateTime);
          scheduleNotification(tempObj, notiDateTime).then((notificationId) => {
            updateScheduleItem(scheduleItemId, notificationId)
            console.log(notificationId);
          })
          //make notification.then(update scheduleItemId with notiication id)
        });
        date = add(date, { days: 1 });

      }

      // scheduleNotification(tempObj, new Date(2026, 3, 16, 22, 26, 0)).then(console.log);
      scheduleNotification(tempObj, new Date('2026-04-16T19:35:45.000Z')).then(console.log);


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
