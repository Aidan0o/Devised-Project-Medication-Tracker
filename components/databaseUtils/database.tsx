import { formatISO } from 'date-fns';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('medications.db');

export const dropDB = () => {
  db.execSync(`
    DROP TABLE medicine;
    DROP TABLE schedule;
    DROP TABLE scheduleItems;

  `)
}

export const createDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS medicine (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      pillStrength INTEGER NOT NULL,
      pillStrengthUnit TEXT NOT NULL,
      doseAmount INTEGER NOT NULL,
      doseUnit TEXT NOT NULL,
      totalSupply INTEGER NOT NULL,
      frequencyTimes INTEGER NOT NULL,
      frequencyPer TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS schedule (
      id INTEGER PRIMARY KEY,
      scriptLength INTEGER NOT NULL,
      startDate TEXT NOT NULL,
      completed INTEGER NOT NULL,
      medicineID INTEGER NOT NULL,
      FOREIGN KEY (medicineID) REFERENCES medicine(id)
    );

    CREATE TABLE IF NOT EXISTS scheduleItems (
      id INTEGER PRIMARY KEY,
      time TEXT NOT NULL,
      date TEXT NOT NULL,
      taken INTEGER NOT NULL,
      notificationID TEXT NULL, 
      scheduleID INTEGER NOT NULL,
      FOREIGN KEY (scheduleID) REFERENCES schedule(id)
    );
  `)
};

export const insertMedicine = (params): number => {
  console.log(params)
  const result = db.runSync(`
    INSERT INTO medicine (
      doseAmount, 
      doseUnit, 
      frequencyPer, 
      frequencyTimes, 
      name, 
      pillStrength, 
      pillStrengthUnit, 
      totalSupply)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
   `, [
    params.doseAmount,
    params.doseUnit,
    params.frequencyPer,
    params.frequencyTimes,
    params.name,
    params.pillStrength,
    params.pillStrengthUnit,
    params.totalSupply
  ]);
  console.log("inserting ", result)


  return result.lastInsertRowId; //returns the ID given to the medication so we can make it into a schedule
};

export const insertSchedule = (scriptLength, startDate, medicineID): number => {
  console.log(scriptLength, startDate, medicineID)
  const result = db.runSync(`
    INSERT INTO schedule (
      scriptLength, 
      startDate, 
      completed, 
      medicineID 
  )VALUES (?, ?, ?, ?);
   `, [
    scriptLength,
    startDate,
    false,
    medicineID
  ]);
  console.log("inserting ", result)
  return result.lastInsertRowId;
}

export const insertScheduleItem = (time: string, date: Date, scheduleID: number): number => {
  console.log(time)

  const result = db.runSync(`
    INSERT INTO scheduleItems (
      time, 
      date,
      taken, 
      scheduleID 
  )VALUES (?, ?, ?, ?);
   `, [
    time,
    formatISO(date),
    false,
    scheduleID,

  ]);
  console.log("inserting ", result)
  return result.lastInsertRowId; //returns the ID given to the medication so we can make it into a schedule
};

//functions to console log the content of db
export const debugDB = () => {
  const Mrows = db.getAllSync("SELECT * FROM medicine;");
  console.log("Medicine table:", Mrows);
  const Srows = db.getAllSync("SELECT * FROM schedule;");
  console.log("Schedule table:", Srows);
  const SIrows = db.getAllSync("SELECT * FROM scheduleItems;");
  console.log("Schedule Item table:", SIrows);
};

export const updateScheduleItem = (scheduleItemID, notificationID) => {
  const result = db.runSync(`
    UPDATE scheduleItems SET notificationID = ? WHERE id = ?
   `, [
    scheduleItemID,
    notificationID
  ]);
}


export const readMedicationsSchedule = (showUpcomingOnly: boolean = true) => {
  const dateFilter = showUpcomingOnly ? "WHERE si.date > datetime('now')" : "";
  const rows = db.getAllSync(`
    SELECT m.name, si.date, si.notificationID 
    FROM medicine m 
    JOIN schedule s on s.medicineID = m.id
    JOIN scheduleItems si on si.scheduleID = s.id  
    ${dateFilter}
    ORDER BY si.date ASC
  `);

  return rows;
}

export const readMedications = () => {

  const rows = db.getAllSync(`
    SELECT m.name 
    FROM medicine m 
    JOIN schedule s on s.medicineID = m.id
    ORDER BY m.name ASC
  `);

  return rows;
}
