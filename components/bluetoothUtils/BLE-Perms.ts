import { PermissionsAndroid, Platform } from "react-native";

export async function ensureBlePermissions() {
  if (Platform.OS !== "android") return true;

  // Android 12+ (SDK 31+)
  const scan = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
  );
  const connect = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
  );

  // Android 11 and below: location for scan
  let fineLocation = PermissionsAndroid.RESULTS.GRANTED;
  if (Platform.Version <= 30) {
    fineLocation = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
  }

  return (
    scan === PermissionsAndroid.RESULTS.GRANTED &&
    connect === PermissionsAndroid.RESULTS.GRANTED &&
    fineLocation === PermissionsAndroid.RESULTS.GRANTED
  );
}