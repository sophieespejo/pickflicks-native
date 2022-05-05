import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View , Image, ScrollView, Button, Pressable, RefreshControl} from 'react-native';
import HeaderComponent from '../../Components/UserDashboard-Body/HeaderComponent';
import ButtonComponent from '../../Components/UserDashboard-Body/ButtonComponent';
import MWGCardComponent from '../../Components/UserDashboard-Body/MWGCardComponent';
import WaitingForYouComponent from '../../Components/UserDashboard-Body/WaitingForYouComponent';
import WaitingForOthersComponent from '../../Components/UserDashboard-Body/WaitingForOthersComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import NewMWGNameComponent from '../../Components/UserDashboard-Body/NewMWGNameComponent';
import MemberSearchTextInputComponent from '../../Components/UserDashboard-Body/MemberSearchTextInputComponent';
import UserContext from '../../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import { GetMWGStatusByUserId } from '../../Service/DataService';



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

  let { token, setToken, username, setUsername, userId, setUserId, userIcon, setUserIcon, allMWG, setAllMWG} = useContext(UserContext)
  const [WFYBool, setWFYBool] = useState<boolean>(true);
  const [WFOBool, setWFOBool] = useState<boolean>(false);
  

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout:any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const Id = await AsyncStorage.getItem('@storage_Id')
    setUserId(Id);
    // console.log(Id);
    let result = await GetMWGStatusByUserId(userId);
    setAllMWG(result);
    // console.log(result);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleWFY = () => 
  {
    setWFYBool(true);
    setWFOBool(false);
  }

  const handleWFO = () => 
  {
    setWFOBool(true);
    setWFYBool(false);
  }

  useEffect( () => {
    async function getUserInfo(){
      if(token != null)
      {
        setUsername(username);
        setUserId(userId);
        setUserIcon(userIcon);
        console.log(userIcon);
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


  const handleSignout = async () => {
    const token = await AsyncStorage.removeItem('@storage_Token');
    const Id = await AsyncStorage.removeItem('@storage_Id')
    const Username = await AsyncStorage.removeItem('@storage_Username')
    const UserIcon = await AsyncStorage.removeItem('@storage_Usericon')

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
            <ScrollView style={{flex:1}} refreshControl={
            <RefreshControl
              tintColor={'white'}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
            }>
              <ButtonComponent />
              <View style={{flexDirection:'row', width:'100%',justifyContent:'space-around', paddingTop:'5%'}}>
                <Pressable onPress={() => handleWFY()} style={WFYBool ? {borderBottomWidth:2, borderBottomColor:'#DC1B21'} : null}>
                  <Text style={WFYBool ? styles.waitingTxt : styles.nonPressedTxt}>Waiting for you</Text>
                </Pressable>
                <Pressable onPress={() => handleWFO()} style={WFOBool ? {borderBottomWidth:2, borderBottomColor:'#DC1B21'} : null}>
                  <Text style={WFOBool ?styles.waitingTxt : styles.nonPressedTxt}>Waiting for others</Text>
                </Pressable>
              </View>
              {
                WFOBool == true ? <WaitingForOthersComponent /> : <WaitingForYouComponent />
              }
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
    waitingTxt:{
      fontFamily:'Raleway_400Regular',
      fontSize:24,
      color:'#FFFFFF'
    },
    nonPressedTxt:{
      fontFamily:'Raleway_400Regular',
      fontSize:24,
      color:'#FFFFFF',
      opacity:0.23,
    },
  });

export default UserDashboard;