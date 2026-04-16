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

    await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
    });
}


export function scheduleNotification(medication: Medication, dateTime: Date) {
    console.log('datetime', dateTime);
    return Notifications.scheduleNotificationAsync({
        content: {
            title: 'Medication Time!',
            body: `Take ${medication.pillCountPerDose} ${medication.pillStrength}${medication.pillStrengthUnit} pills of ${medication.name}`,
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


//debugging functions
export function testNotification() {

    return Notifications.scheduleNotificationAsync({
        content: {
            title: 'test notification',
            body: 'this is a test'
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 10
        }

    })

}

export const showNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    const all = await Notifications.getAllScheduledNotificationsAsync();
    console.log('pending count:', all.length);
    console.log(all);

}


