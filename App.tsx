import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  LoadingScreen  from './Screens/LoadingScreen';
import  CreateAccountScreen  from './Screens/CreateAccountScreen';
import  LoginScreen  from './Screens/LoginScreen';
import  IntroductionScreen  from './Screens/IntroductionScreen';



type RootStackParamList = {
  Home: undefined; //means route doesnt have params
  UserDashboard: { name : string };
  Login: { name: string }
  CreateAccount: undefined,
  Loading: undefined,
  Introduction: undefined
}


const Stack = createNativeStackNavigator<RootStackParamList>();

const App:FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{headerShown:false}}
        >
      </Stack.Screen>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown:false}}>
        </Stack.Screen>
        <Stack.Screen
      name="Loading"
      component={LoadingScreen}>
    </Stack.Screen>
      {/* <Stack.Screen
      name="Loading"
      component={LoadingScreen}
      options={{headerShown:false}}>
    </Stack.Screen> */}
    <Stack.Screen
    name="Introduction"
    component={IntroductionScreen}
    options={{headerShown: false}}
    >
  </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
