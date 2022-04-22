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
import { Provider as PaperProvider } from 'react-native-paper';




type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    UserDashboard: undefined;
    Login: { name: string }
    CreateAccountScreen: undefined,
    Loading: undefined,
    AvatarScreen: undefined
    Introduction: undefined,
    SelectStreamingService: undefined
    NewMWGName: undefined,
    MemberSearch: { newMWGname: string },
    InvitationSent: undefined;
    ChooseGenres : undefined,
    GenreRanking: undefined,
    MovieCard : undefined,

  }

type Props = NativeStackScreenProps<RootStackParamList, 'Introduction'>;

const UserProfileScreen: FC<Props> = ({navigation}) => {


    return (
        <View style={styles.container}>
            <HeaderComponent/>
            <YourProfileComponent/>
            <FooterNavComponent/>
        </View>
    )
}

export default UserProfileScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  