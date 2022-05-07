import { NavigationRouteContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useEffect, useContext } from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import RedLogo from '../assets/RedLogo.png';
import HeaderComponent1 from '../../Components/MWGDashboard/MovieCardHeaderComponent';
import StreamingServiceComponent from '../../Components/MWGDashboard/StreamingServiceComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import SelectedGenreComponent from '../../Components/MWGDashboard/SelectedGenreComponent';
import FinalGenreComponent from '../../Components/MWGDashboard/FinalGenreComponent';
import { Provider as PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from "native-base";
import UserContext from '../../Context/UserContext';
import { GetMWGStatusByMWGId, AddAll15Movies } from '../../Service/DataService'
import {useNavigation} from '@react-navigation/native';






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
    FinalGenre : undefined
  }

type Props = NativeStackScreenProps<RootStackParamList, 'FinalGenre'>;

const GenreRankingScreen: FC<Props> = () => {
  let { username, setUsername, userId, setUserId, userIcon, setUserIcon, MWGname, setMWGname, MWGId, setMWGId, MWGgenres, setMWGgenres, genreId, streamingServiceId, MWGmembersId, setMWGmembersId,genre1,genre2, genre3, setGenre3, setAllMWG } = useContext(UserContext)
  const navigation = useNavigation<any>();



  useEffect( () => {
    async function getUserInfo(){
      console.log("bpoooo")
      setMWGname(MWGname);
      setMWGId(MWGId);
      console.log(MWGId)
      let movieObj = await GetMWGStatusByMWGId(MWGId);
      console.log(movieObj)
      // if(movieObj != null)
      // {
      //   console.log(movieObj[0].areAllMembersDoneWithGenre);
      //   let isMWGDoneWithRanking = movieObj[0].areAllMembersDoneWithGenre;
      //   if(isMWGDoneWithRanking)
      //   {
      //       let finalMovie = await AddAll15Movies(MWGId, genreId, streamingServiceId);
      //       if(finalMovie)
      //       {
      //         navigation.navigate('MovieCard') 
      //       }else{
      //         navigation.navigate('LoadingPopcorn') 
      //       }
         
      //   }
      //   else{
      //     setTimeout(() => {
      //       navigation.navigate('UserDashboard') 
      //     }, 3000);
      //   }
      // }
      
    }
    getUserInfo()
  }, []);



    return (
        <NativeBaseProvider>
          <View style={styles.container}>
              <HeaderComponent1/>
              <FinalGenreComponent/>
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
  