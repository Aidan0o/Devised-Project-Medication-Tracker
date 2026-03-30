// import {useForm, Controller} from "react-hook-form"
import { Checkbox } from "expo-checkbox";
import { Formik } from "formik";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


//all set to string for now will be converted to correct types after submit before reaches back end
type AddPrescriptionForm = {
    drugName: string;
    drugDoseNum: string;
    drugDoseUnit: string;
    totalDose: string;
    frequencyNum: string;
    startTimeDate: string;
    repeatScript: boolean;

}

//function containing validation of fields 
const validate = (values: AddPrescriptionForm) => {
    const errors : Partial<Record<keyof AddPrescriptionForm, string>> = {};
    if (!values.drugName) errors.drugName = 'Drug name Required';
    if (!values.drugDoseNum) errors.drugDoseNum = 'Drug Dose Required';
    if (!values.drugDoseUnit) errors.drugDoseUnit = 'Drug Dose Unit Required';
    if (!values.totalDose) errors.totalDose = 'Total Dose Required';
    if (!values.frequencyNum) errors.frequencyNum = 'Frequency Required';
    if (!values.startTimeDate) errors.startTimeDate = 'Start Time Required';
    console.log("hello")
    console.log(errors)
    return errors; //formik stores errors for me automatically in formik.errors
}


 export const AddPrescriptionForm = props => {

   
   return(
    <Formik<AddPrescriptionForm >
        initialValues={initialValues}
        validate={validate} //validate runs automatically when user submits form (formik feature)
        onSubmit={(values: AddPrescriptionForm) => console.log(values)}
    >
        
        {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
            //safe area only uses the space visible on the phone screen to avoid notches etc from covering
            <SafeAreaProvider>  
                <SafeAreaView style={styles.form}>
                    <ScrollView style={styles.scrollContainer}> 
                        <TextInput
                            style={[
                                styles.formFields,
                                touched.drugName && errors.drugName && { borderColor: 'red' }, //adds styles to fields that have errors
                            ]}
                            onChangeText={handleChange('drugName')}
                            value={values.drugName}
                            placeholder='Drug Name'
                        />
                        {touched.drugName && errors.drugName ? ( //if the field has been touched and there is an error it will display error
                            <Text>{errors.drugName}</Text>
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
                            <Text >{errors.drugDoseNum}</Text>
                        ) : null}
                        <TextInput
                            style={styles.formFields}
                            onChangeText={handleChange('drugDoseUnit')}
                            value={values.drugDoseUnit}
                            placeholder='Drug Dose Unit (mg,ug)'
                        />
                        {touched.drugDoseUnit && errors.drugDoseUnit ? (
                            <Text>{errors.drugDoseUnit}</Text>
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
                        <View style={styles.checkBox}>
                            <Checkbox
                                // style={styles.formFields}
                                onValueChange={(value) => setFieldValue("repeatScript", value)}
                                value={values.repeatScript}
                                style={{ transform: [{scale: 2}] , marginRight: '5%'}}
                            />
                            <Text> Repeat Prescription? </Text>
                        </View>

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
    repeatScript: false,

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
        flexDirection: 'column',
        flexGrow:1,
        paddingBottom: 100,
        // backgroundColor: 'red',

    },

    checkBox:{
        flexDirection: 'row',
        marginLeft: "10%",
        marginRight: "5%",
        marginTop: "5%",

    },

});