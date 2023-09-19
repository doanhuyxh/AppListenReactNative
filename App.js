import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import SmsListener from 'react-native-android-sms-listener'
import { format } from 'date-fns';
import messaging from "@react-native-firebase/messaging";
import { requestSMSPermissions, requestUserPermissionNotify } from './PermissionAndroid';

export default function App() {

  const [smsData, setSmsData] = useState([])

  useEffect(() => {
    // listen sms
    requestSMSPermissions();
    const sms = SmsListener.addListener(message => {
      let data = {
        originatingAddress: message.originatingAddress,
        body: message.body,
        timestamp: format(new Date(message.timestamp), 'yyyy-MM-dd HH:mm:ss')
      }
      setSmsData([...smsData, data])
    })
    // notify

    if (requestUserPermissionNotify()) {
      messaging().getToken().then(token => console.log("token", token))
  } else {
      console.log("Failed token status")
  }
  messaging()
      .getInitialNotification()
      .then(remoteMessage => {
          if (remoteMessage) {
              console.log(
                  'Notification caused app to open from quit state:',
                  remoteMessage.notification,
              );
          }
      });
  messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
      );
  });
  messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
  });

  const unsubscribe = messaging().onMessage(async remoteMessage => {
    const { title, body } = remoteMessage.notification;
    //
  });

  return ()=>{
    sms.remove();
    unsubscribe;
  };

  }, []);

  return (
    <View>
      {
        smsData.map((item, index)=>{
          return(
            <View key={index}>
              <Text>{item.originatingAddress}</Text>
              <Text>{item.body}</Text>
              <Text>{item.timestamp}</Text>
            </View>
          )
        })
      }
    </View>
  );
}
