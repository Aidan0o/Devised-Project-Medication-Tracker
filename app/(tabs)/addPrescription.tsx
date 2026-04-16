import { AddPrescriptionForm } from '@/components/formComps/addPrescriptionForm';
import { Medication } from '@/components/medicationTypes';

// export default function AddPrescription(){

//     return <addPrescriptionForm />;
// }

import { StyleSheet } from 'react-native';


const initialValues: Medication = {
    name: '',
    pillStrength: 0,
    pillStrengthUnit: 'mg',
    pillCountPerDose: 0,
    doseAmount: 0,
    doseUnit: 'mg',
    frequencyTimes: 0,
    frequencyPer: 'day',
    totalSupply: 0,
    scriptLength: 0,
    startDate: '',
    times: [],
}


export default function boop() {
    return (
        <AddPrescriptionForm
            style={styles.container}
            values={initialValues}
        />
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});