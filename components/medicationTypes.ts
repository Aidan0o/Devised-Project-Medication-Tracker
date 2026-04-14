export type Medication = {
    doseAmount : number;
    doseUnit : 'g'|'mg'| 'ug' ;
    frequencyPer : 'day'|'week';
    frequencyTimes : number;
    name : string;
    pillStrength : number;
    pillStrengthUnit : 'g'|'mg'| 'ug';
    pillCountPerDose : number | null;
    totalSupply : number;
    scriptLength : number;
    startDate : Date | string | number;
    times : string[];

}


