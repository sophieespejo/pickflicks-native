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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';



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

  let { token, setToken, username, setUsername, userId, setUserId, userIcon, setUserIcon } = useContext(UserContext)

  useEffect( () => {
    async function getUserInfo(){
      if(token != null)
      {
        setUsername(username);
        setUserId(userId);
        setUserIcon(userIcon);
      }
      else
      {
        navigation.navigate('Login');
      }
    }
    getUserInfo()
  }, []);

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // useEffect( () => {
  //   const userToken = async () => 
  //   {
  //       const token = await AsyncStorage.getItem('@storage_Token')
  //       const Id = await AsyncStorage.getItem('@storage_Id')
  //       const Username = await AsyncStorage.getItem('@storage_Username')
  //       if(token != null)
  //       {
  //           console.log(token);
  //           console.log(Id);
  //           console.log(Username);

  //           setUsername(Username);
  //           setUserId(Id);
  //           navigation.navigate('UserDashboard')
  //       }
  //   }
  //   userToken();

  // }, []);

  const handleSignout = async () => {
    const token = await AsyncStorage.removeItem('@storage_Token');
    const Id = await AsyncStorage.removeItem('@storage_Id')
    const Username = await AsyncStorage.removeItem('@storage_Username')
    if(token == null)
    {
      console.log(token);
      navigation.navigate('Login');
    }else{
      alert("didn't work")
    }
  }


  return (
        <View style={styles.container}>
            <HeaderComponent/>
            <ScrollView style={{flex:1}}>
              <ButtonComponent />
              <MWGCardComponent />
            </ScrollView>
            <View>
              <Button title="Sign Out" onPress={()=> handleSignout()}></Button>
            </View>
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