import { Medication } from '@/components/medicationTypes';
import * as Notifications from 'expo-notifications';

export async function notificationPermissions() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        throw new Error('Notification permission not granted');
    }
}


export function scheduleNotification(medication: Medication, dateTime: Date) {

    return Notifications.scheduleNotificationAsync({
        content: {
            title: 'Medication Time!',
            body: `Take ${medication.pillCountPerDose} ${medication.doseAmount, medication.doseUnit} pills of ${medication.name}`,
            data: {
                ...medication,
                type: "medicationNotification"
            }
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: dateTime
        }
    });



}
