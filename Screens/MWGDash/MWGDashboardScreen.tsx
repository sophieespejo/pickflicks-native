import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect } from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import StartWatchingBtnsComponent from '../../Components/MWGDashboard/StartWatchingBtnsComponent';
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
    MWGDashboard: undefined,

  }

type Props = NativeStackScreenProps<RootStackParamList, 'MWGDashboard'>;

const MWGDashboardScreen: FC<Props> = ({navigation}) => {
  let { username, setUsername, userId, setUserId, userIcon, setUserIcon, MWGname, setMWGname, MWGId, setMWGId } = useContext(UserContext)

  useEffect( () => {
    async function getUserInfo(){
          setMWGname(MWGname);
          setMWGId(MWGId);
    }
    getUserInfo()
  }, []);
    return (
        <View style={styles.container}>
            <HeaderComponent />
            <ScrollView style={{flex:1}}>
            <StartWatchingBtnsComponent/>
            </ScrollView>
            <FooterNavComponent/>
        </View>
    )
}

export default MWGDashboardScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A',
    },
  });
  