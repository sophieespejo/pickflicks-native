import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import CardTutorialComponent from '../../Components/MWGDashboard/CardTutorialComponent';




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

const TutorialMovieCardScreen: FC<Props> = ({navigation}) => {


    return (
        <View style={styles.container}>
            <HeaderComponent/>
            <CardTutorialComponent/>
            <FooterNavComponent/>
        </View>
    )
}

export default TutorialMovieCardScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  