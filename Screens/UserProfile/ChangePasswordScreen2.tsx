import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderComponent from '../../Components/UserProfile/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import ChangePasswordComponent2 from '../../Components/UserProfile/ChangePasswordComponent2';
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
    ChangePassword2 : undefined,

  }

type Props = NativeStackScreenProps<RootStackParamList, 'ChangePassword2'>;

const ChangePasswordScreen2: FC<Props> = ({navigation}) => {


    return (
        <View style={styles.container}>
            <HeaderComponent/>
            <ChangePasswordComponent2/>
            <FooterNavComponent/>
        </View>
    )
}

export default ChangePasswordScreen2;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  