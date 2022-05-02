import { NavigationRouteContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useEffect, useContext,} from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import RedLogo from '../assets/RedLogo.png';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import StreamingServiceComponent from '../../Components/MWGDashboard/StreamingServiceComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import GenreSelectionComponent from '../../Components/MWGDashboard/GenreSelectionComponent';
import FinalMovieCardComponent from '../../Components/MWGDashboard/FinalMovieCardComponent';
import { Provider as PaperProvider } from 'react-native-paper';
import UserContext from '../../Context/UserContext';





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

type Props = NativeStackScreenProps<RootStackParamList, 'FinalMovie'>;

const FinalMovieScreen: FC<Props> = ({navigation}) => {
  let {  MWGId, setMWGId, userId, setUserId , listOfMovieNamesUsedToCompare, setListOfMovieNamesUsedToCompare } = useContext(UserContext)



    return (
        <View style={styles.container}>
            <HeaderComponent/>
            <FinalMovieCardComponent/>
            <FooterNavComponent/>
        </View>
    )
}

export default FinalMovieScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  