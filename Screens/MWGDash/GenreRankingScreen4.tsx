import { NavigationRouteContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import RedLogo from '../assets/RedLogo.png';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import StreamingServiceComponent from '../../Components/MWGDashboard/StreamingServiceComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import SelectedGenreComponent4 from '../../Components/MWGDashboard/SelectedGenreComponent4';
import { Provider as PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from "native-base";




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

type Props = NativeStackScreenProps<RootStackParamList, 'Introduction'>;

const GenreRankingScreen2: FC<Props> = ({navigation}) => {


    return (
        <NativeBaseProvider>
          <View style={styles.container}>
              <HeaderComponent/>
              <SelectedGenreComponent4/>
              <FooterNavComponent/>
          </View>
        </NativeBaseProvider>
    )
}

export default GenreRankingScreen2;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  