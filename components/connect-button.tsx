import { useEffect, useState } from "react";
import { Button } from "react-native";
import { BTConnect, BTDisconnect } from "./bluetoothUtils";


export default function BluetoothConnectButton({initialConnection = false, onConnect=()=>{}}) { //manually set as false for now
    const [connected, setConnected] = useState(initialConnection) //sets initial value of connected to false with function setConnected
    
    //called when connected variable changes
    useEffect(() => {
        if (connected) {
            onConnect(true) //calls event handler passed to the button in properties 
        }
    }, [connected])

    const clickHandler = (ev) => { //uses the press event as a argument 
        console.log("connecting");
        if (connected) {
            const didDisconnect = BTDisconnect(); //function always returns true
            setConnected(!didDisconnect); //if successful disconnection set connected to false
        } else {
            setConnected(BTConnect()) //BT connect always returns true - sets connected to try
        }
    }

    return (
        <Button
            title={connected ? "Disconnect" : "Connect"} //"?" is true, ":" is false
            onPress={clickHandler} //onPress from react library, when button is pressed, the click handler function is ran
        />
    )

}