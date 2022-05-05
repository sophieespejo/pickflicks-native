import { NavigationRouteContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect } from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import RedLogo from '../assets/RedLogo.png';
import UserContext from '../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';




type RootStackParamList = {
  Home: undefined; //means route doesnt have params
  UserDashboard: undefined;
  Login: undefined
  CreateAccountScreen: undefined,
  Loading: undefined,
  AvatarScreen: undefined
  Introduction: undefined,
  SelectStreamingService: undefined
  NewMWGName: undefined,
  MemberSearch: { username: string, userId: number, newMWGname: string },
  InvitationSent: { username: string, userId: number},
  ChooseGenres : undefined,
  GenreRanking: undefined,
  GenreRanking2: undefined,
  GenreRanking3: undefined,
  FinalGenre : undefined,
  MovieCard : undefined,
  FinalMovie : undefined,
  MWGDashboard : undefined,
  LoadingPopcorn : undefined,
  UserProfile : undefined,
  ChangeUsername :undefined,
  ChangePassword1 : undefined,
  ChangePassword2 : undefined,
  ChangeNotifications : undefined,
  TutorialMovieCard : undefined,
}


type Props = NativeStackScreenProps<RootStackParamList, 'Introduction'>;

const LoadingScreen: FC<Props> = ({navigation}) => {
  let { token, setUserIcon, setToken, username, setUsername, userId, setUserId } = useContext(UserContext);

  useEffect( () => {
    const userToken = async () => 
    {
        const userToken = await AsyncStorage.getItem('@storage_Token');
        const Id = await AsyncStorage.getItem('@storage_Id')
        const Username = await AsyncStorage.getItem('@storage_Username')
        const UserIcon = await AsyncStorage.getItem('@storage_Usericon')

        setToken(userToken);
        if(userToken != null)
        {
          setUsername(Username);
          setUserId(Id);
          setUserIcon(UserIcon);
          
          console.log(UserIcon);
          console.log(Id);
          console.log(userToken)
          setTimeout(() => {
            navigation.navigate('UserDashboard') 
          }, 2000);
        }
        else{
          setTimeout(() => {
            navigation.navigate('Introduction') 
          }, 2000);
        }
    }
    userToken();

  }, []);




    return (
        <View style={styles.container}>
            <Image style={styles.redLogo} source={RedLogo}/>
        </View>
    )
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#DC1B21'
    },
    redLogo: {
      width: 300,
      height: 300
    },
  });
  