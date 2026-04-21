import { add } from "date-fns";
import { insertMedicine, insertSchedule, insertScheduleItem, updateScheduleItem } from "./databaseUtils/database";
import { dateTimeBuilder } from "./dateTimeBuilder";
import { Medication } from "./medicationTypes";
import { scheduleNotification } from "./notificationUtils/notificationScheduler";




export function createSchedule(scheduleData: Medication) {

    const startDate = new Date(); //sets start date to today
    let date = startDate;
    const medicineID = insertMedicine(scheduleData);
    const scheduleID = insertSchedule(scheduleData.scriptLength, scheduleData.startDate, medicineID);
    for (let i = 0; i < scheduleData.scriptLength; i++) {
        scheduleData.times.forEach((time: string) => {
            const notiDateTime = dateTimeBuilder(date, time);
            const scheduleItemId = insertScheduleItem(time, notiDateTime, scheduleID);
            console.log(notiDateTime);
            scheduleNotification(scheduleData, notiDateTime).then((notificationId) => {
                updateScheduleItem(scheduleItemId, notificationId)
                console.log(notificationId);
            })
        });
        date = add(date, { days: 1 });

    }
}