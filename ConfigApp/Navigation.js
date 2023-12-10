import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Color } from "../Constances";
import HomeScreen from "../Screens/HomeScreen";
import LoadAppScreen from "../Screens/LoadAppScreen";
import SmsListenScreen from "../Screens/SmsListenScreen";
import SendSmsScreen from "../Screens/SendSmsScreen";

const Stack = createStackNavigator();

function NavigationStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadAppScreen">
        <Stack.Screen
          name="LoadAppScreen"
          component={LoadAppScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerTitle: "Home",
            headerLeft: null,
            headerStyle: {
              backgroundColor: Color.HeaderColor,
            },
            headerTintColor: Color.HeaderTextColor,
          }}
        />
        <Stack.Screen
          name="SmsListenScreen"
          component={SmsListenScreen}
          options={{
            headerTitle: "Lắng nghe SMS",
            headerStyle: {
              backgroundColor: Color.HeaderColor,
            },
            headerTintColor: Color.HeaderTextColor,
          }} />
        <Stack.Screen
          name="SendSmsScreen"
          component={SendSmsScreen}
          options={{
            headerTitle: "Send SMS",
            headerStyle: {
              backgroundColor: Color.HeaderColor,
            },
            headerTintColor: Color.HeaderTextColor,
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationStack;
