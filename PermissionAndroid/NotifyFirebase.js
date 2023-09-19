import {PermissionsAndroid} from 'react-native'
import messaging from "@react-native-firebase/messaging";
const requestUserPermissionNotify = async () => {
    try {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    } catch (error) {
        console.error('Firebase Error:', error);
    }
}

export default requestUserPermissionNotify