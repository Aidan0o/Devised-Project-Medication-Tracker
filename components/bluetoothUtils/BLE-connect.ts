import { encode as btoa } from "base-64";
import { BleManager } from "react-native-ble-plx";
import { ensureBlePermissions } from "./BLE-Perms";

const TARGET_NAME = "ESP32_Test"; //name of device app should connect to


const SERVICE_UUID = "00001801-0000-1000-8000-00805f9b34fb ";
const WRITE_CHAR_UUID = "00002a05-0000-1000-8000-00805f9b34fb";

class MedBoxBle {
  manager = new BleManager(); //from ble plx - instantiation of the bleManager obj
  device = null; //the device we connect to (esp32)
  isConnecting = false; 

  // Called when app loads

  //function to connect to device
  connect = async () => { 
    //checks if device is connected or connecting already
    if (this.device) return this.device; 
    if (this.isConnecting) return null;

    //start connecting process
    this.isConnecting = true;
    try {
      const ok = await ensureBlePermissions(); //waits to check if phone has ble permissions
      if (!ok) throw new Error("BLE permissions not granted"); //errors if no permissions

      // Start scanning
      return await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => { //waits 15 seconds then stops scan and rejects promise
          this.manager.stopDeviceScan(); 
          reject(new Error("Timed out scanning for MedBox")); //gives reason for rejection
        }, 15000);
        //first argument for UUIDs - null means will scan all available devices, doesn't scan duplicate devices no telling which is correct 
        this.manager.startDeviceScan(null, { allowDuplicates: false }, async (error, scannedDevice) => { //third is function to handle error and what device is being scanned
         //1 scan per device 
          if (error) { 
            clearTimeout(timeout); //stops time out timer
            this.manager.stopDeviceScan(); //stops device scan for specific device
            reject(error); //rejects promise with given error
            return;
          }

          //stops scan if device info is null or undefined
          if (!scannedDevice) return;
          
          //checks if name of device matches the arduino boxes name
          const name = scannedDevice.name || scannedDevice.localName;
          if (name !== TARGET_NAME) return; //if not target name, exit function

          //if target name matches, clear timeout and stop the scan 
          clearTimeout(timeout);
          this.manager.stopDeviceScan();

          //once device is found the program attempts to connect to it
          try {
            const connected = await this.manager.connectToDevice(scannedDevice.id, { autoConnect: true }); //autoConnect option is android only and will automatically connect to the device when available
            this.device = connected; // sets device property to connected device

            //gets all the information about the features of the connected device (arduino box) - not in use right now
            await connected.discoverAllServicesAndCharacteristics();

            //checks if device has been disconnected or not
            this.device.onDisconnected(async () => {
              this.device = null; //when device disconnects , resets device property to null 
              try { await this.connect(); } catch (e) {} //trys connect again
            });
            
            //if device connected , resolve the promise and pass the device
            resolve(this.device);
          } catch (e) { //catches any errors 
            this.device = null; //resets device property
            reject(e); //resets promise
          }
        });
      });
    } finally {
      this.isConnecting = false; //regardless of outcome above , set connecting state to false
    }
  };

  //function to disconnect device
  disconnect = async () => {
    if (!this.device) return;
    const id = this.device.id;
    this.device = null;
    await this.manager.cancelDeviceConnection(id);
  };

//function to send data to esp32
  send = async (text) => {
    if (!this.device) throw new Error("Not connected");

    // BLE PLX writes are base64-encoded payloads
    const valueBase64 = btoa(text);
    console.log("b64", valueBase64)
    
    const services = await this.device.services();
for (const s of services) {
  const chars = await s.characteristics();
  for (const c of chars) {
    console.log("SVC", s.uuid, "CHAR", c.uuid, {
      isWritableWithResponse: c.isWritableWithResponse,
      isWritableWithoutResponse: c.isWritableWithoutResponse,
      isNotifiable: c.isNotifiable,
      isIndicatable: c.isIndicatable,
      isReadable: c.isReadable,
    });
  }
}
   
    await this.device.writeCharacteristicWithoutResponseForService(
      SERVICE_UUID,
      WRITE_CHAR_UUID,
      valueBase64
    );
    console.log("SEND OK")
  };
}

export const medBoxBle = new MedBoxBle();