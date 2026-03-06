import BluetoothConnectButton from '@/components/connect-button'; //not in curly brackets because its a default export
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";



export default function connectPage(){
    const [fieldValue, setFieldValue] = useState("")

    const connectionHandler = (connectionState: boolean) => {
        console.log("I'm NOW CONNECTED");
    }
    const style = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'lightblue',
        },
        input: {
            color: 'black'
        },
    });

    return(
        <SafeAreaProvider>
            <SafeAreaView style={style.container}>
                <BluetoothConnectButton onConnect={connectionHandler}/>

                <TextInput 
                    style={style.input} 
                    value={fieldValue} 
                    onChange={setFieldValue}
                    placeholder='Enter Text here!'
                />
        

            </SafeAreaView> 
        </SafeAreaProvider>

           

    );
}