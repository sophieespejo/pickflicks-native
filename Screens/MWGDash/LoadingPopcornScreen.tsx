import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import LoadingPopcornGifComponent from '../../Components/MWGDashboard/LoadingPopcornGifComponent';




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
    LoadingPopcorn: undefined

  }

type Props = NativeStackScreenProps<RootStackParamList, 'LoadingPopcorn'>;

const LoadingPopcornScreen: FC<Props> = ({navigation}) => {


    return (
        <View style={styles.container}>
            <HeaderComponent/>
            <LoadingPopcornGifComponent/>
            <FooterNavComponent/>
        </View>
    )
}

export default LoadingPopcornScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  