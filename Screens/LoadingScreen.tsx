import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import RedLogo from '../assets/RedLogo.png';

type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    Profile: { name : string };
    Login: { name: string }
    CreateAccount: undefined,
    Loading: undefined,
    Introduction: undefined
  }
  
  
const Stack = createNativeStackNavigator<RootStackParamList>();

const LoadingScreen: FC = () => {
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
  