import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  LoadingScreen  from './Screens/LoadingScreen';
import  CreateAccountScreen  from './Screens/CreateAccount/CreateAccountScreen';
import  LoginScreen  from './Screens/Login/LoginScreen';
import  IntroductionScreen  from './Screens/IntroductionScreen';
<<<<<<< HEAD
import UserDashboardScreen from './Screens/UserDashboardScreen';
import AvatarScreen from './Screens/AvatarScreen';
=======
import UserDashboardScreen from './Screens/UserDashboard/UserDashboardScreen';
import NewMWGNameScreen from './Screens/UserDashboard/NewMWGNameScreen';
import MemberSearchScreen from './Screens/UserDashboard/MemberSearchScreen';
>>>>>>> 9a805ef83b349525f381795cb2cce0fd94431e5a


type RootStackParamList = {
  Home: undefined; //means route doesnt have params
  UserDashboard: { name : string };
  Login: { name: string }
  CreateAccountScreen: undefined,
  Loading: undefined,
  AvatarScreen: undefined
  Introduction: undefined,
  NewMWGName: undefined,
  MemberSearch: undefined
}


const Stack = createNativeStackNavigator<RootStackParamList>();

const App:FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
    <Stack.Screen
name="AvatarScreen"
component={AvatarScreen}
options={{headerShown:false}}>
</Stack.Screen>
      <Stack.Screen
      name="Loading"
      component={LoadingScreen}
      options={{headerShown:false}}>
    </Stack.Screen>
        {/* <Stack.Screen
          name="Login"
          component={LoginScreen}>
        </Stack.Screen> */}
            <Stack.Screen
    name="Introduction"
    component={IntroductionScreen}
    options={{headerShown: false}}
    >
  </Stack.Screen>
        <Stack.Screen
          name="UserDashboard"
          component={UserDashboardScreen}
          options={{headerShown:false}}>
        </Stack.Screen>
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{headerShown:false}}>
        </Stack.Screen>
        <Stack.Screen
          name="Introduction"
          component={IntroductionScreen}
          options={{headerShown: false}}>
        </Stack.Screen>
        <Stack.Screen
          name="CreateAccountScreen"
          component={CreateAccountScreen}
          options={{headerShown:false}}>
        </Stack.Screen>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown:false}}>
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
