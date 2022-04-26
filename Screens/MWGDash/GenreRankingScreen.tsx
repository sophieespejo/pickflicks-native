import { NavigationRouteContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import RedLogo from '../assets/RedLogo.png';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import StreamingServiceComponent from '../../Components/MWGDashboard/StreamingServiceComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import SelectedGenreComponent from '../../Components/MWGDashboard/SelectedGenreComponent';
import { Provider as PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from "native-base";
import UserContext from '../../Context/UserContext';
import { GetMWGById } from '../../Service/DataService'



type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    UserDashboard: { username: string, userId: number }
    Login: { name: string }
    CreateAccountScreen: undefined,
    Loading: undefined,
    AvatarScreen: undefined
    Introduction: undefined,
    SelectStreamingService: undefined
    NewMWGName: { username: string, userId: number },
    MemberSearch: { username: string, userId: number, newMWGname: string },
    InvitationSent: { username: string, userId: number};
    ChooseGenres : undefined,
    GenreRanking: undefined,
    MovieCard : undefined,
    FinalMovie : undefined,

  }

type Props = NativeStackScreenProps<RootStackParamList, 'GenreRanking'>;

const GenreRankingScreen: FC<Props> = ({navigation, route}) => {
  // let { username, setUsername, userId, setUserId, userIcon, setUserIcon, MWGname, setMWGname, MWGId, setMWGId, MWGgenres, setMWGgenres } = useContext(UserContext)

  // useEffect( () => {
  //   async function getUserInfo(){
  //         setMWGname(MWGname);
  //         setMWGId(MWGId);
  //         let movieObj = await GetMWGById(MWGId);
  //         if(movieObj != null)
  //         {
  //           setMWGgenres(movieObj.chosenGenres);
  //         }
          
  //   }
  //   getUserInfo()
  // }, []);

    return (
        <NativeBaseProvider>
          <View style={styles.container}>
              <HeaderComponent/>
              <SelectedGenreComponent/>
              <FooterNavComponent/>
          </View>
        </NativeBaseProvider>
    )
}

export default GenreRankingScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  