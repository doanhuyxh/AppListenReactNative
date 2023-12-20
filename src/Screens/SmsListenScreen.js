import React, {Component, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import SmsListener from 'react-native-android-sms-listener';
//import database from '@react-native-firebase/database';
import {format} from 'date-fns';
import {requestSMSPermissions} from '../PermissionAndroid';
import {ScrollView} from 'react-native-gesture-handler';

function SmsListenScreen({navigation}) {
  const [smsData, setSmsData] = useState([]);

  const SenData = (res2) => {
    let {body, originatingAddress, timestamp} = res2

    let data = new FormData();
     data.append('From', originatingAddress);
     data.append('Content', body);
     data.append('Time', timestamp);

    fetch('https://app.trademeata.mom/api/Sms', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(res=>{
        if(res.statusCode===200){
          CallData()
        }
      })
      .catch(err => {
        console.log('err save :: ', err);
      });
  };

  function CallData() {
    fetch('http://app.trademeata.mom/api/Sms')
      .then(res => res.json())
      .then(res => {
        if (res.statusCode === 200) {
          setSmsData(res.data);
        }
      })
      .catch(err => {
        console.log('err sms ::', err);
      });
  }

  useEffect(() => {
    CallData();
    requestSMSPermissions();
    const sms = SmsListener.addListener(message => {
      let data = {
        originatingAddress: message.originatingAddress,
        body: message.body,
        timestamp: format(new Date(message.timestamp), 'yyyy-MM-dd HH:mm:ss'),
      };
      SenData(data)
    });
  }, []);

  return (
    <ScrollView>
      <View className="pt-2 px-2 ">
        <Text className="text-center text-lg text-lime-800">Lịch sử record</Text>
      </View>
      {smsData.map(item => {
        return (
          <View key={item.id} className="flex-row py-1 px-1">
            <Text className="text-red-500">{item.from}</Text>
            <Text className="px-1 text-green-800">{item.content}</Text>
            <Text className="text-red-500">{format(new Date(item.time), 'HH:mm:ss')}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

export default SmsListenScreen;
