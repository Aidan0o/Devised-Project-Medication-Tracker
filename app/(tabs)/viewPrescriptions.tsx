import { showMedicationTable } from '@/components/ui/viewScriptTable';

// export default function AddPrescription(){

//     return <addPrescriptionForm />;
// }

import { StyleSheet } from 'react-native';

export default function viewMedication() {
    return (
        showMedicationTable()
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});