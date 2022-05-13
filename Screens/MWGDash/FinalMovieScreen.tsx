import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC} from 'react';
import { StyleSheet, View} from 'react-native';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import FinalMovieCardComponent from '../../Components/MWGDashboard/FinalMovieCardComponent';






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
  