import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  LoadingScreen  from './Screens/LoadingScreen';
import  CreateAccountScreen  from './Screens/CreateAccount/CreateAccountScreen';
import  LoginScreen  from './Screens/Login/LoginScreen';
import  IntroductionScreen  from './Screens/IntroductionScreen';
import UserDashboardScreen from './Screens/UserDashboard/UserDashboardScreen';
import NewMWGNameScreen from './Screens/UserDashboard/NewMWGNameScreen';
import MemberSearchScreen from './Screens/UserDashboard/MemberSearchScreen';
import InvitationSentScreen from './Screens/UserDashboard/InvitationSentScreen';


type RootStackParamList = {
  Home: undefined; //means route doesnt have params
  UserDashboard: { name : string };
  Login: { name: string }
  CreateAccountScreen: undefined,
  Loading: undefined,
  Introduction: undefined,
  NewMWGName: undefined,
  MemberSearch: undefined,
  InvitationSent: undefined
}


const Stack = createNativeStackNavigator<RootStackParamList>();

const App:FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {/* <Stack.Screen
      name="NewMWGName"
      component={NewMWGNameScreen}
      options={{headerShown:false}}>
    </Stack.Screen> */}
      <Stack.Screen
      name="MemberSearch"
      component={MemberSearchScreen}
      options={{headerShown:false}}>
    </Stack.Screen>
      <Stack.Screen
      name="InvitationSent"
      component={InvitationSentScreen}
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
    options={{headerShown: false}}
    >
  </Stack.Screen>
        <Stack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
        options={{headerShown:false}}
        >
      </Stack.Screen>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown:false}}
          >  
        </Stack.Screen>
        <Stack.Screen
name="UserDashboard"
component={UserDashboardScreen}
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
