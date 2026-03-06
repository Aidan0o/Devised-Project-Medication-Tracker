// import {useForm, Controller} from "react-hook-form"
import { Formik } from 'formik';
import { Button, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

//all set to string for now will be converted to correct types after submit before reaches back end
type AddPrescriptionForm = {
    drugName: string;
    drugDoseNum: string;
    drugDoseUnit: string;
    totalDose: string;
    frequencyNum: string;
    startTimeDate: string;

}


const validate = (values: AddPrescriptionForm) => {
    const errors : Partial<Record<keyof AddPrescriptionForm, string>> = {};
    if (!values.drugName) errors.drugName = 'Drug name Required';
    if (!values.drugDoseNum) errors.drugDoseNum = 'Drug Dose Required';
    if (!values.drugDoseUnit) errors.drugDoseUnit = 'Drug Dose Unit Required';
    if (!values.totalDose) errors.totalDose = 'Required';
    if (!values.frequencyNum) errors.frequencyNum = 'Required';
    if (!values.startTimeDate) errors.startTimeDate = 'Required';
    console.log("hello")
    console.log(errors)
    return errors;
}


 export const AddPrescriptionForm = props => {

   
   return(
    <Formik<AddPrescriptionForm >
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values: AddPrescriptionForm) => console.log(values)}
    >
        
        {({ handleChange,handleBlur, handleSubmit, values, errors, touched }) => (
            <SafeAreaProvider> {/* only uses the space visible on the phone screen to avoid notches etc from covering */}
                <SafeAreaView style={styles.form}>
                    <ScrollView style={styles.scrollContainer}> 
                        <TextInput
                            style={[
                                styles.formFields,
                                touched.drugName && errors.drugName && { borderColor: 'red' },
                            ]}
                            onChangeText={handleChange('drugName')}
                            onBlur={handleBlur('drugName')}
                            value={values.drugName}
                            placeholder='Drug Name'
                        />
                        {touched.drugName && errors.drugName ? (
                            <Text style={styles.errorText}>{errors.drugName}</Text>
                        ) : null}
                        <TextInput
                            style={[
                                styles.formFields,
                                touched.drugDoseNum && errors.drugDoseNum && { borderColor: 'red' },
                            ]}
                            onChangeText={handleChange('drugDoseNum')}
                            value={values.drugDoseNum}
                            keyboardType='numeric'
                            placeholder='Drug Dose Number'
                        />
                        {touched.drugDoseNum && errors.drugDoseNum ? (
                            <Text style={styles.errorText}>{errors.drugDoseNum}</Text>
                        ) : null}
                        <TextInput
                            style={styles.formFields}
                            onChangeText={handleChange('drugDoseUnit')}
                            value={values.drugDoseUnit}
                            placeholder='Drug Dose Unit (mg,ug)'
                        />
                        {touched.drugDoseUnit && errors.drugDoseUnit ? (
                            <Text style={styles.errorText}>{errors.drugDoseUnit}</Text>
                        ) : null}
                        <TextInput
                            style={styles.formFields}
                            onChangeText={handleChange('totalDose')}
                            value={values.totalDose}
                            keyboardType='numeric'
                            placeholder='Total Doses'
                        />
                        <TextInput
                            style={styles.formFields}
                            onChangeText={handleChange('frequencyNum')}
                            value={values.frequencyNum}
                            placeholder='Frequency of dose'
                        />
                        <TextInput
                            style={styles.formFields} 
                            onChangeText={handleChange('startTimeDate')}
                            value={values.startTimeDate}
                            placeholder='Start date'
                        />
                        
        {/* scroll test */}

                                        <TextInput
                        style={styles.formFields}
                        onChangeText={handleChange('drugName')}
                        value={values.drugName}
                        />
                        <TextInput
                        style={styles.formFields}
                        onChangeText={handleChange('drugDoseNum')}
                        value={values.drugDoseNum}
                        keyboardType='numeric'
                        />
                        <TextInput
                        style={styles.formFields}
                        onChangeText={handleChange('drugDoseUnit')}
                        value={values.drugDoseUnit}
                        />
                        <TextInput
                        style={styles.formFields}
                        onChangeText={handleChange('totalDose')}
                        value={values.totalDose}
                        keyboardType='numeric'
                        />
                        <TextInput
                        style={styles.formFields}
                        onChangeText={handleChange('frequencyNum')}
                        value={values.frequencyNum}
                        />
                        <TextInput
                        style={styles.formFields} 
                        onChangeText={handleChange('startTimeDate')}
                        value={values.startTimeDate}
                        />
                                        <TextInput
                        style={styles.formFields}
                        onChangeText={handleChange('drugName')}
                        value={values.drugName}
                        />
                        <TextInput
                        style={styles.formFields}
                        onChangeText={handleChange('drugDoseNum')}
                        value={values.drugDoseNum}
                        keyboardType='numeric'
                        />
                        <TextInput
                        style={styles.formFields}
                        onChangeText={handleChange('drugDoseUnit')}
                        value={values.drugDoseUnit}
                        />
                        <TextInput
                        style={styles.formFields}
                        onChangeText={handleChange('totalDose')}
                        value={values.totalDose}
                        keyboardType='numeric'
                        />
                        <TextInput
                        style={styles.formFields}
                        onChangeText={handleChange('frequencyNum')}
                        value={values.frequencyNum}
                        />
                        <TextInput
                        style={styles.formFields} 
                        onChangeText={handleChange('startTimeDate')}
                        value={values.startTimeDate}
                        />

                        <Button onPress={handleSubmit}
                        title="Submit"
                        />
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        )}
    </Formik>)
    };





const initialValues: AddPrescriptionForm={
    drugName: '',
    drugDoseNum: '',
    drugDoseUnit:'',
    totalDose:'',
    frequencyNum:'',
    startTimeDate: '',

    // repeatScript: false
}

const styles = StyleSheet.create({
    form:{
        // flex: 1,


        backgroundColor: "#F9F9F9",
        // justifyContent: "center",
        // margin: "%"

    },

    formFields:{
        borderWidth: 2,
        borderColor: "#E0E0E0",
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "5%",
        minHeight: 100,
        fontSize: 30,
        paddingLeft: "5%",
        backgroundColor: "#E0E0E0",
        borderRadius: 20,        
    },


    scrollContainer:{
        flexGrow:1,
        paddingBottom: 100,

    },

});