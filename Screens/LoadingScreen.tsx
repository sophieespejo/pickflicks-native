
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect } from 'react';
import { StyleSheet, View , Image} from 'react-native';
import RedLogo from '../assets/RedLogo.png';
import UserContext from '../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../interfaces/RootStackParamList';


type Props = NativeStackScreenProps<RootStackParamList, 'Introduction'>;

const LoadingScreen: FC<Props> = ({navigation}) => {
  let {setUserIcon, setToken, setDevice, setUsername, setUserId } = useContext(UserContext);

  useEffect( () => {
    const userToken = async () => 
    {
        const userToken = await AsyncStorage.getItem('@storage_Token');
        const Id = await AsyncStorage.getItem('@storage_Id')
        const Username = await AsyncStorage.getItem('@storage_Username')
        const UserIcon = await AsyncStorage.getItem('@storage_Usericon')
        const UserDevice = await AsyncStorage.getItem('@storage_UserDevice')

        setToken(userToken);
        if(userToken != null)
        {
          setUsername(Username);
          setUserId(Id);
          setUserIcon(UserIcon);
          setDevice(UserDevice);

          setTimeout(() => {
            navigation.navigate('UserDashboard') 
          }, 2000);
        }
        else{
          setTimeout(() => {
            navigation.navigate('Introduction') 
          }, 2000);
        }
    }
    userToken();

  }, []);




    return (
        <View style={styles.container}>
            <Image style={styles.redLogo} source={RedLogo}/>
        </View>
    )
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#DC1B21'
    },
    redLogo: {
      width: 300,
      height: 300
    },
  });
  