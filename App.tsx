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
import AvatarScreen from './Screens/CreateAccount/AvatarScreen';
import SelectStreamServiceScreen from './Screens/MWGDash/SelectStreamServiceScreen';
import ChooseGenresScreen from './Screens/MWGDash/ChooseGenresScreen';
import GenreRankingScreen from './Screens/MWGDash/GenreRankingScreen';
import MovieCardScreen from './Screens/MWGDash/MovieCardScreen';
import {NativeBaseProvider } from 'native-base'
import UserContext from './Context/UserContext'
import UseUser from './Hooks/use-user'
import MWGDashboard from './Screens/MWGDash/MWGdashboardScreen'


type RootStackParamList = {
  Home: undefined; //means route doesnt have params
    //UserDashboard: { username: string, userId: number };
    UserDashboard: undefined;
  Login: { name: string }
  CreateAccountScreen: undefined,
  Loading: undefined,
  AvatarScreen: undefined
  Introduction: undefined,
  SelectStreamingService: undefined
  NewMWGName: { username: string, userId: number },
  MemberSearch: { username: string, userId: number, newMWGname: string },
  InvitationSent: { username: string, userId: number},
  ChooseGenres : undefined,
  GenreRanking: undefined,
  MovieCard : undefined,
  InvitationSent: { username: string, userId: number};
  MWGDashboard: undefined;
}


const Stack = createNativeStackNavigator<RootStackParamList>();

const App:FC = () => {
  return (
<UserContext.Provider value={UseUser()}>
<NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown:false}}>
          </Stack.Screen>
      <Stack.Screen
          name="MovieCard"
          component={MovieCardScreen}
          options={{headerShown:false}}>
        </Stack.Screen>
      {/* <Stack.Screen
          name="GenreRanking"
          component={GenreRankingScreen}
          options={{headerShown:false}}>
        </Stack.Screen> */}
      {/* <Stack.Screen
          name="ChooseGenres"
          component={ChooseGenresScreen}
          options={{headerShown:false}}>
        </Stack.Screen> */}
      {/* <Stack.Screen
          name="SelectStreamingService"
          component={SelectStreamServiceScreen}
          options={{headerShown:false}}>
        </Stack.Screen> */}
      {/* <Stack.Screen
      name="NewMWGName"
      component={NewMWGNameScreen}
      options={{headerShown:false}}>
    </Stack.Screen> */}
      {/* <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown:false}}>
        </Stack.Screen>
        <Stack.Screen
      name="NewMWGName"
      component={NewMWGNameScreen}
      options={{headerShown:false}}>
    </Stack.Screen> */}
      {/* <Stack.Screen
      name="MemberSearch"
      component={MemberSearchScreen}
      options={{headerShown:false}}>
    </Stack.Screen>
      <Stack.Screen
      name="InvitationSent"
      component={InvitationSentScreen}
      options={{headerShown:false}}>
    </Stack.Screen> */}
      {/* <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown:false}}>
        </Stack.Screen> */}
      <Stack.Screen
      name="Loading"
      component={LoadingScreen}
      options={{headerShown:false}}>
    </Stack.Screen>
          <Stack.Screen
            name="UserDashboard"
            component={UserDashboardScreen}
            options={{headerShown:false}}>
          </Stack.Screen>
          <Stack.Screen
        name="NewMWGName"
        component={NewMWGNameScreen}
        options={{headerShown:false}}>
      </Stack.Screen>
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
      name="Introduction"
      component={IntroductionScreen}
      options={{headerShown: false}}
      >
    </Stack.Screen>
          <Stack.Screen
            name="CreateAccountScreen"
            component={CreateAccountScreen}
            options={{headerShown:false}}>
          </Stack.Screen>
          <Stack.Screen
            name="MWGDashboard"
            component={MWGDashboard}
            options={{headerShown:false}}>
          </Stack.Screen>
          <Stack.Screen
            name="AvatarScreen"
            component={AvatarScreen}
            options={{headerShown:false}}>
          </Stack.Screen>
        </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </UserContext.Provider>

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
