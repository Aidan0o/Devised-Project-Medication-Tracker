// import {useForm, Controller} from "react-hook-form"
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import { useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Medication } from "../medicationTypes";



//all set to string for now will be converted to correct types after submit before reaches back end


//function containing validation of fields 
const validate = (values: Medication) => {
    const errors: Partial<Record<keyof Medication, string>> = {};
    if (!values.name) errors.name = 'Drug name Required';
    if (!values.pillStrength) errors.pillStrength = 'Pill strength Required';
    if (!values.pillStrengthUnit) errors.pillStrengthUnit = 'Pill strength Unit Required';
    if (!values.doseAmount) errors.doseAmount = 'Dose Required';
    if (!values.doseUnit) errors.doseUnit = 'Dose Unit Required';
    if (!values.frequencyTimes) errors.frequencyTimes = 'frequency required';
    if (!values.frequencyPer) errors.frequencyPer = 'frequency per ___ (day) required';
    if (!values.totalSupply) errors.totalSupply = 'total supply required';
    if (!values.scriptLength) errors.scriptLength = 'Length of Prescription required';
    if (!values.startDate) errors.startDate = 'Prescription start date required';
    if (!values.pillCountPerDose) errors.pillCountPerDose = 'Pill count per dose required';
    console.log("hello")
    console.log(errors)
    return errors; //formik stores errors for me automatically in formik.errors
}


export const AddPrescriptionForm = ({ values = {} }) => {
    const [showDate, setShowDate] = useState(false);
    return (
        <Formik<Medication >
            enableReinitialize
            initialValues={values}
            validate={validate} //validate runs automatically when user submits form (formik feature)
            onSubmit={(values: Medication) => console.log(values)}
        >

            {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
                //safe area only uses the space visible on the phone screen to avoid notches etc from covering
                <SafeAreaProvider>
                    <SafeAreaView style={styles.form}>
                        <ScrollView style={styles.scrollContainer}>
                            <TextInput
                                style={[
                                    styles.formFields,
                                    touched.name && errors.name && { borderColor: 'red' }, //adds styles to fields that have errors
                                ]}
                                onChangeText={handleChange('name')}
                                value={values.name}
                                placeholder='Drug Name'
                            />
                            {touched.name && errors.name ? ( //if the field has been touched and there is an error it will display error
                                <Text>{errors.name}</Text>
                            ) : null}
                            <TextInput
                                style={[
                                    styles.formFields,
                                    touched.pillStrength && errors.pillStrength && { borderColor: 'red' },
                                ]}
                                onChangeText={handleChange('pillStrength')}
                                value={`${values.pillStrength}`} //converts int to string
                                keyboardType='numeric'
                                placeholder='Dose of 1 pill'
                            />
                            {touched.pillStrength && errors.pillStrength ? (
                                <Text >{errors.pillStrength}</Text>
                            ) : null}
                            <TextInput
                                style={styles.formFields}
                                onChangeText={handleChange('pillStrengthUnit')}
                                value={values.pillStrengthUnit}
                                placeholder='Dose of 1 pill units (mg,ug)'
                            />
                            {touched.pillStrengthUnit && errors.pillStrengthUnit ? (
                                <Text>{errors.pillStrengthUnit}</Text>
                            ) : null}
                            <TextInput
                                style={styles.formFields}
                                onChangeText={handleChange('doseAmount')}
                                value={`${values.doseAmount}`}
                                keyboardType='numeric'
                                placeholder='Dose of 1 intake'
                            />
                            <TextInput
                                style={styles.formFields}
                                onChangeText={handleChange('doseUnit')}
                                value={values.doseUnit}
                                placeholder='unit of one dose (mg,ug)'
                            />
                            <TextInput
                                style={styles.formFields}
                                onChangeText={handleChange('frequencyTimes')}
                                value={`{$values.frequencyTimes}`}
                                placeholder='frequency of intake (number)'
                            />
                            <TextInput
                                style={styles.formFields}
                                onChangeText={handleChange('frequencyPer')}
                                value={values.frequencyPer}
                                placeholder='frequency of intake per __ (day)'
                            />
                            <TextInput
                                style={styles.formFields}
                                onChangeText={handleChange('totalSupply')}
                                value={`${values.totalSupply}`}
                                placeholder='Number of pills supplied'
                            />
                            <TextInput
                                style={styles.formFields}
                                onChangeText={handleChange('scriptLength')}
                                value={`${values.scriptLength}`}
                                placeholder='Number of days the prescription lasts for'
                            />
                            <TextInput
                                style={styles.formFields}
                                onChangeText={handleChange('pillCountPerDose')}
                                value={`${values.pillCountPerDose}`}
                                placeholder='pill count per dose'
                            />
                            <Pressable
                                onPress={() => setShowDate(true)}
                                style={styles.formFields}
                            >
                                <Text style={{ fontSize: 30 }}>{values?.startDate?.toDateString ? values.startDate.toDateString() : "Press Me"}</Text>
                            </Pressable>
                            {showDate && (
                                <DateTimePicker
                                    value={new Date(values.startDate)} //sets value to a date or if not possible, null
                                    onChange={(event, val) => {
                                        setShowDate(false)
                                        setFieldValue('startDate', val)
                                    }}
                                    minimumDate={new Date()}
                                    placeholderText='Select Start Date'

                                />
                            )}
                            <Button onPress={handleSubmit}
                                title="Submit"
                            />
                        </ScrollView>
                    </SafeAreaView>
                </SafeAreaProvider>
            )}
        </Formik>)
};














const styles = StyleSheet.create({
    form: {
        // flex: 1,


        backgroundColor: "#F9F9F9",
        // justifyContent: "center",
        // margin: "%"

    },

    formFields: {
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


    scrollContainer: {
        flexDirection: 'column',
        flexGrow: 1,
        paddingBottom: 100,
        // backgroundColor: 'red',

    },

    checkBox: {
        flexDirection: 'row',
        marginLeft: "10%",
        marginRight: "5%",
        marginTop: "5%",

    },

});