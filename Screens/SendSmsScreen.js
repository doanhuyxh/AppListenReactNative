import React, { Component, useRef } from "react";
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import SendSMS from 'react-native-sms';

function SendSmsScreen() {
  const phoneRef = useRef("");
  const contentRef = useRef("");
  const SentData = () => {
    const sms = SendSMS;
    sms.send({
      body: contentRef.current.value,
      recipients:[phoneRef.current.value],
      successTypes: ['sent', 'completed','cancelled'],
    },(completed, cancelled, error) => {
      if (completed) {
        console.log('SMS Sent Completed');
      } else if (cancelled) {
        console.log('SMS Sent Cancelled');
      } else if (error) {
        console.log('Some error occured');
      }
    },).then(res=>console.log(res))
  };

  return (
    <View className="flex-col">

      <View className="flex-row pt-1 justify-evenly">
        <TextInput className="w-64 border rounded-3xl" ref={phoneRef}
                   onChangeText={(e) => phoneRef.current.value = e} />
        <View className="flex-col justify-center">
          <Text className="w-fit h-fit">Số điện thoại nhận</Text>
        </View>
      </View>

      <View className="flex-row w-screen justify-between p-2">
        <View className="flex-col justify-center">
          <Text className="w-fit h-fit p-2">Nội dung</Text>
        </View>
        <View className="w-80">
          <TextInput ref={contentRef} onChangeText={(e) => contentRef.current.value = e}
                     className="border-amber-600 rounded-2xl border-2 w-full px-1 text-xl" />
        </View>
      </View>

      <View className="flex-row justify-end">
        <TouchableOpacity className="p-2" onPress={SentData}>
          <Text className="bg-emerald-600 py-2 px-5 rounded-2xl text-white">Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


export default SendSmsScreen;
