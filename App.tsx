import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "./Screens/LoadingScreen";
import CreateAccountScreen from "./Screens/CreateAccount/CreateAccountScreen";
import LoginScreen from "./Screens/Login/LoginScreen";
import IntroductionScreen from "./Screens/IntroductionScreen";
import UserDashboardScreen from "./Screens/UserDashboard/UserDashboardScreen";
import NewMWGNameScreen from "./Screens/UserDashboard/NewMWGNameScreen";
import MemberSearchScreen from "./Screens/UserDashboard/MemberSearchScreen";
import InvitationSentScreen from "./Screens/UserDashboard/InvitationSentScreen";
import AvatarScreen from "./Screens/CreateAccount/AvatarScreen";
import SelectStreamServiceScreen from "./Screens/MWGDash/SelectStreamServiceScreen";
import ChooseGenresScreen from "./Screens/MWGDash/ChooseGenresScreen";
import GenreRankingScreen from "./Screens/MWGDash/GenreRankingScreen";
import GenreRankingScreen2 from "./Screens/MWGDash/GenreRankingScreen2";
import GenreRankingScreen3 from "./Screens/MWGDash/GenreRankingScreen3";
import FinalGenreScreen from "./Screens/MWGDash/FinalGenreScreen";
import MovieCardScreen from "./Screens/MWGDash/MovieCardScreen";
import TutorialMovieCardScreen from "./Screens/MWGDash/TutorialMovieCardScreen";
import FinalMovieScreen from "./Screens/MWGDash/FinalMovieScreen";
import MWGDashboardScreen from "./Screens/MWGDash/MWGDashboardScreen";
import LoadingPopcornScreen from "./Screens/MWGDash/LoadingPopcornScreen";
import UserProfileScreen from "./Screens/UserProfile/UserProfileScreen";
import ChangeUsernameScreen from "./Screens/UserProfile/ChangeUsernameScreen";
import { NativeBaseProvider } from "native-base";
import UserContext from "./Context/UserContext";
import UseUser from "./Hooks/use-user";
import ChangePasswordScreen1 from "./Screens/UserProfile/ChangePasswordScreen1";
import ChangePasswordScreen2 from "./Screens/UserProfile/ChangePasswordScreen2";
import ChangeNotificationsScreen from "./Screens/UserProfile/ChangeNotificationsScreen";
import InvitationsScreen from "./Screens/UserProfile/InvitationsScreen";
import { RootStackParamList } from "./interfaces/RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: FC = () => {
  return (
    <UserContext.Provider value={UseUser()}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Loading"
              component={LoadingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserDashboard"
              component={UserDashboardScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewMWGName"
              component={NewMWGNameScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MemberSearch"
              component={MemberSearchScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="InvitationSent"
              component={InvitationSentScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Introduction"
              component={IntroductionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateAccountScreen"
              component={CreateAccountScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MWGDashboard"
              component={MWGDashboardScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AvatarScreen"
              component={AvatarScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelectStreamingService"
              component={SelectStreamServiceScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChooseGenres"
              component={ChooseGenresScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GenreRanking"
              component={GenreRankingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GenreRanking2"
              component={GenreRankingScreen2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GenreRanking3"
              component={GenreRankingScreen3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FinalGenre"
              component={FinalGenreScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MovieCard"
              component={MovieCardScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FinalMovie"
              component={FinalMovieScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoadingPopcorn"
              component={LoadingPopcornScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserProfile"
              component={UserProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Invitations"
              component={InvitationsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChangeNotifications"
              component={ChangeNotificationsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChangePassword2"
              component={ChangePasswordScreen2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChangePassword1"
              component={ChangePasswordScreen1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChangeUsername"
              component={ChangeUsernameScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TutorialMovieCard"
              component={TutorialMovieCardScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </UserContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
