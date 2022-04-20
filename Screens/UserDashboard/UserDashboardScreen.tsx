import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect } from 'react';
import { StyleSheet, Text, View , Image, ScrollView, Button} from 'react-native';
import HeaderComponent from '../../Components/UserDashboard-Body/HeaderComponent';
import ButtonComponent from '../../Components/UserDashboard-Body/ButtonComponent';
import MWGCardComponent from '../../Components/UserDashboard-Body/MWGCardComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import NewMWGNameComponent from '../../Components/UserDashboard-Body/NewMWGNameComponent';
import MemberSearchTextInputComponent from '../../Components/UserDashboard-Body/MemberSearchTextInputComponent';
import UserContext from '../../Context/UserContext';


type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    Login: { username: string }
    CreateAccount: undefined,
    Loading: undefined,
    Introduction: undefined
    //UserDashboard: { username: string, userId: number };
    UserDashboard: undefined;
    MemberSearch: { username: string, userId: number, newMWGname: string  },
    InvitationSent: { username: string, userId: number};
  }
  
  
type Props = NativeStackScreenProps<RootStackParamList, 'UserDashboard'>;

  

const UserDashboard: FC<Props> = ({navigation}) => {

  let { username, setUsername, userId, setUserId, userIcon, setUserIcon } = useContext(UserContext)

  useEffect( () => {
    async function getUserInfo(){
          // let username = await AsyncStorage.getItem(JSON.parse('Username'));
          // let userId = await AsyncStorage.getItem(JSON.parse('UserId'));
          // let userIcon = await AsyncStorage.getItem(JSON.parse('UserIcon'));
          setUsername(username);
          setUserId(userId)
          setUserIcon(userIcon)
    }
    getUserInfo()
  }, []);


  return (
        <View style={styles.container}>
            <HeaderComponent/>
            <ScrollView style={{flex:1}}>
              <ButtonComponent username={username} userId={userId} />
              <MWGCardComponent username={username} userId={userId} />
            </ScrollView>
            {/* <NewMWGNameComponent/> */}
            {/* <MemberSearchTextInputComponent/> */}
            <FooterNavComponent/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1E1A1A',
      fontFamily:'Raleway_400Regular', 
    },
  });

export default UserDashboard;