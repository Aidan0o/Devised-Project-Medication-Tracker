import { AddPrescriptionForm } from '@/components/formComps/addPrescriptionForm';

// export default function AddPrescription(){

//     return <addPrescriptionForm />;
// }

import { StyleSheet } from 'react-native';

export default function boop(){
    return(
        <AddPrescriptionForm style ={styles.container}/>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});