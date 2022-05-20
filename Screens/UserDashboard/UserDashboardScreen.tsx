import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View , ScrollView, Button, Pressable, RefreshControl, Image} from 'react-native';
import HeaderComponent from '../../Components/UserDashboard-Body/HeaderComponent';
import ButtonComponent from '../../Components/UserDashboard-Body/ButtonComponent';
import WaitingForYouComponent from '../../Components/UserDashboard-Body/WaitingForYouComponent';
import WaitingForOthersComponent from '../../Components/UserDashboard-Body/WaitingForOthersComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import UserContext from '../../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Raleway_400Regular, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import { GetMWGStatusByUserId } from '../../Service/DataService';
import LottieView from 'lottie-react-native';
import { RootStackParamList } from '../../interfaces/RootStackParamList';


type Props = NativeStackScreenProps<RootStackParamList, 'UserDashboard'>;

interface IUserDashboardScreen {
  username: string,
  userId: number,
  childen: React.ReactNode
}

const UserDashboard: FC<Props> = ({navigation}) => {

  let { token, setToken, username, setUsername, userId, setUserId, userIcon, setUserIcon, allMWG, setAllMWG, setUserIsAdmin, setUserIsReadyForGenres, setUserIsReadyForSwipes, setUserIsReadyToSeeFinalMovie, setUserIsWaiting} = useContext(UserContext)
  const [WFYBool, setWFYBool] = useState<boolean>(true);
  const [WFOBool, setWFOBool] = useState<boolean>(false);
  const pandaAnimation = require('../../assets/49799-the-panda-eats-popcorn.json');

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout:any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const Id = await AsyncStorage.getItem('@storage_Id')
    const UserToken = await AsyncStorage.getItem('@storage_Token')
    const UserIcon = await AsyncStorage.getItem('@storage_Username')
    const StoredUsername = await AsyncStorage.getItem('@storage_Usericon')

    setUserId(Id);
    setUsername(StoredUsername);
    setUserIcon(UserIcon);
    setToken(UserToken);
    let result = await GetMWGStatusByUserId(userId);
    setAllMWG(result);
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
      const something = navigation.addListener('focus', async () => {
        const personId = await AsyncStorage.getItem('@storage_Id');
        console.log('This is token Id', personId);
        console.log('//UserDashboardScreen Page is Refreshed');

        setUserIsAdmin(false);
        setUserIsReadyForGenres(false);
        setUserIsReadyForSwipes(false);
        setUserIsReadyToSeeFinalMovie(false);
        setUserIsWaiting(false);

        const token1 = await AsyncStorage.getItem('@storage_Token')
        console.log('//UserDashboardScreen Page This is userToken:',token1)
        
        if(token1 != null)
        {
          const personUsername = await AsyncStorage.getItem('@storage_Username');
          const personIcon = await AsyncStorage.getItem('@storage_Usericon');

          setUsername(personUsername);
          setUserId(Number(personId));
          setUserIcon(personIcon);
          console.log('RIGHT HERE', personId)
          
          let result = await GetMWGStatusByUserId(Number(personId));
          // console.log('//UserDashboardScreen This is the userDatabyId', result);
          setAllMWG(result);
        }
        else
        {
          navigation.navigate('Login');
        }
      });
    }
    getUserInfo()
  }, []);

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  return (
        <View style={styles.container}>
            <HeaderComponent/>
            <LottieView
              autoPlay
              style={styles.lottieView}
              source={pandaAnimation}
            />
            <ScrollView style={{flex:1}} refreshControl={
            <RefreshControl
              tintColor={'rgba(0, 0, 0, 0)'}
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressViewOffset={100}
            />
            }>
              
              <ButtonComponent />
              <View style={{flexDirection:'row', width:'100%',justifyContent:'space-around', paddingTop:'5%', backgroundColor: '#1E1A1A'}}>
                <Pressable onPress={() => handleWFY()} style={WFYBool ? {borderBottomWidth:2, borderBottomColor:'#DC1B21', backgroundColor: '#1E1A1A'} : null}>
                  <Text style={WFYBool ? styles.waitingTxt : styles.nonPressedTxt}>Waiting for you</Text>
                </Pressable>
                <Pressable onPress={() => handleWFO()} style={WFOBool ? {borderBottomWidth:2, borderBottomColor:'#DC1B21', backgroundColor: '#1E1A1A'} : null}>
                  <Text style={WFOBool ?styles.waitingTxt : styles.nonPressedTxt}>Waiting for others</Text>
                </Pressable>
              </View>
              {
                WFOBool == true ? <WaitingForOthersComponent /> : <WaitingForYouComponent />
              }
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
    waitingTxt:{
      fontFamily:'Raleway_400Regular',
      fontSize:24,
      color:'#FFFFFF'
    },
    AcceptTxt:{
      fontFamily:'Raleway_400Regular',
      fontSize:24,
      color:'green',
      textAlign:'center'
    },
    DeclineTxt:{
      fontFamily:'Raleway_400Regular',
      fontSize:24,
      color:'red',
      textAlign:'center'
    },
    InvitationTxt:{
      fontFamily:'Raleway_600SemiBold',
      fontSize:24,
      color:'black',
      textAlign:'center'
    },
    InvitationButton: {
      backgroundColor:'#F5F5DC',
      width:'90%',
      borderWidth: 2,
      borderColor:'#F5F5DC',
      borderRadius: 25,
      alignItems:'center',
      alignSelf:'center',
      justifyContent:'center',
      height:90,
      marginTop:'3%'
    },
    nonPressedTxt:{
      fontFamily:'Raleway_400Regular',
      fontSize:24,
      color:'#FFFFFF',
      opacity:0.23,
    },
    lottieView: {
      height: '39%',
      position: 'absolute',
      top: '6.1%',
      left: 0,
      right: 0,
      overflow: 'hidden'
    },
  });

export default UserDashboard;