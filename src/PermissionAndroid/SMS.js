import { PermissionsAndroid } from "react-native";

async function requestSMSPermissions() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    ]);

    if (
      granted[PermissionsAndroid.PERMISSIONS.READ_SMS] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.RECEIVE_SMS] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('SMS permissions granted');
      // Now you can start listening for SMS
    } else {
      console.log('SMS permissions denied');
      // Handle permission denied
    }
  } catch (error) {
    console.error('Error requesting SMS permissions:', error);
  }
}

export default requestSMSPermissions