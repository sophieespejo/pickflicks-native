import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useEffect, useContext } from 'react';
import { StyleSheet, Text, View , Image, ScrollView} from 'react-native';
import JustLogoComponent from '../../Components/UserDashboard-Body/JustLogoComponent';
import ButtonComponent from '../../Components/UserDashboard-Body/ButtonComponent';
import MWGCardComponent from '../../Components/UserDashboard-Body/MWGCardComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import NewMWGNameComponent from '../../Components/UserDashboard-Body/NewMWGNameComponent';
import MemberSearchTextInputComponent from '../../Components/UserDashboard-Body/MemberSearchTextInputComponent';
import HeaderComponent from '../../Components/UserDashboard-Body/HeaderComponent';
import UserContext from '../../Context/UserContext';


type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    Login: undefined
    CreateAccount: undefined,
    Loading: undefined,
    Introduction: undefined
    UserDashboard: undefined
    NewMWGName: undefined
    MemberSearch: { username: string, userId: number, newMWGname: string  },
  }
  
  
type Props = NativeStackScreenProps<RootStackParamList, 'NewMWGName'>;

const NewMWGNameScreen: FC<Props> = ({navigation}) => {

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
            <JustLogoComponent/>
            <NewMWGNameComponent />
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

export default NewMWGNameScreen;