import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

function HomeScreen({navigation}) {

  return (
    <ScrollView>
      <View className="mt-7 flex flex-row justify-evenly">
        <TouchableOpacity
          onPress={()=>{navigation.navigate("SmsListenScreen")}}
          className="bg-rose-400 p-2 rounded-2xl">
          <Text>Lắng nghe tin nhắn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-rose-400 p-2 rounded-2xl">
          <Text>Chụp ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{navigation.navigate("SendSmsScreen")}}
          className="bg-rose-400 p-2 rounded-2xl">
          <Text>Gửi tin nhắn</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


export default HomeScreen;
