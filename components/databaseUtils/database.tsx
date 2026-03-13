import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('medications.db');

export const createDB = () => {
  db.transaction(tx => {

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Medicine (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        DoseQuantity INTEGER,
        DoseUnit TEXT,
        DoseNumOfPills INTEGER,
        TotalDoseQuantity INTEGER,
        MinTimeBetweenDoses INTEGER,
        RepeatScript INTEGER
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Schedule (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        MedicineID INTEGER,
        StartDateTime TEXT,
        EndDateTime TEXT,
        Completed INTEGER,
        FOREIGN KEY (MedicineID) REFERENCES Medicine(ID)
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS ScheduleItems (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        ScheduleID INTEGER,
        DateTime TEXT,
        Taken INTEGER,
        FOREIGN KEY (ScheduleID) REFERENCES Schedule(ID)
      );
    `);

  }, (error) => {
    console.log("DB Init Error:", error);
  }, () => {
    console.log("Database ready");
  });
};