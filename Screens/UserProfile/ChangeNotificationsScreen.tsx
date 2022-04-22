import { NavigationRouteContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import RedLogo from '../assets/RedLogo.png';
import HeaderComponent from '../../Components/UserProfile/HeaderComponent';
import StreamingServiceComponent from '../../Components/MWGDashboard/StreamingServiceComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import GenreSelectionComponent from '../../Components/MWGDashboard/GenreSelectionComponent';
import MovieCardComponent from '../../Components/MWGDashboard/MovieCardComponent';
import LoadingPopcornGifComponent from '../../Components/MWGDashboard/LoadingPopcornGifComponent';
import YourProfileComponent from '../../Components/UserProfile/YourProfileComponent';
import ChangeUsernameComponent from '../../Components/UserProfile/ChangeUsernameComponent';
import ChangeNotificationsComponent from '../../Components/UserProfile/ChangeNotificationsComponent';
import { Provider as PaperProvider } from 'react-native-paper';




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

  }

type Props = NativeStackScreenProps<RootStackParamList, 'Introduction'>;

const ChangeNotificationsScreen: FC<Props> = ({navigation}) => {


    return (
        <View style={styles.container}>
            <HeaderComponent/>
            <ChangeNotificationsComponent/>
            <FooterNavComponent/>
        </View>
    )
}

export default ChangeNotificationsScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  