import * as Notifications from 'expo-notifications';
import { Medication }from '@/components/medicationTypes'



export function scheduleNotification(medication : Medication, time : string){
    const = scheduleItemDateStr = medication.startDate + "T" + time;
    Notifications.scheduleNotificationAsync({
        content: {
            title: 'Medication Time!',
            body: `Take ${medication.pillCountPerDose} ${medication.doseAmount, medication.doseUnit} pills of ${medication.name}`,
            data: {
                ...medication,
                type: "medicationNotification"
            }
        },
        trigger: {
            type : Notifications.SchedulableTriggerInputTypes.DATE,
            // date : medication.date
        }
    });
    
     
   
}
