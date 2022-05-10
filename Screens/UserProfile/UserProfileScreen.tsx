import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, View , Button} from 'react-native';
import HeaderComponent from '../../Components/UserProfile/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import YourProfileComponent from '../../Components/UserProfile/YourProfileComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';




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
    UserProfile : undefined,

  }

type Props = NativeStackScreenProps<RootStackParamList, 'UserProfile'>;

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
  