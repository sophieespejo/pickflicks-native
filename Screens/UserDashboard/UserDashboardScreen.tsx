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
    Login: undefined
    CreateAccount: undefined,
    Loading: undefined,
    Introduction: undefined
    //UserDashboard: { username: string, userId: number };
    UserDashboard: undefined;
    MemberSearch: { newMWGname: string  },
    InvitationSent: undefined;
    NewMWGName: undefined,
    MWGDashboard: undefined
  }
  
  
type Props = NativeStackScreenProps<RootStackParamList, 'UserDashboard'>;

interface IUserDashboardScreen {
  username: string,
  userId: number,
  childen: React.ReactNode
}

const UserDashboard: FC<Props> = ({navigation}) => {

  let { username, setUsername, userId, setUserId, userIcon, setUserIcon } = useContext(UserContext)

  useEffect( () => {
    async function getUserInfo(){
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
              <ButtonComponent />
              <MWGCardComponent />
            </ScrollView>
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