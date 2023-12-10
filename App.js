import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationStack, store} from './ConfigApp';
import {requestUserPermissionNotify} from './PermissionAndroid';
import {Color} from './Constances';

export default function App() {
  useEffect(() => {
    if (requestUserPermissionNotify()) {
      messaging()
        .getToken()
        .then(token => console.log('token', token));
    } else {
      console.log('Failed token status');
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
      const {title, body} = remoteMessage.notification;
    });
    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          animated={true}
          backgroundColor={Color.StatusbarBackground}
          networkActivityIndicatorVisible={true}
        />
        <NavigationStack />
      </SafeAreaProvider>
    </Provider>
  );
}
