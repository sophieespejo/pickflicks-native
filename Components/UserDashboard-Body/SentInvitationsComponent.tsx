import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, Text, View, Image, TextInput, ImageBackground} from "react-native";
import headerLogo from "../../assets/headerLogo.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import CheckMark from '../../assets/CheckMark.png'


const SentInvitationsComponent: FC = () => {
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    
    <View style={styles.container}>
      {/* <ImageBackground blurRadius={1} source={CheckMark} resizeMode="cover" style={styles.image}> */}
        <Image source={CheckMark}/>
        <Text style={styles.text}>Invitation Sent</Text>

    {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    text : {
        color:'#FFFFFF',
        fontFamily: 'Raleway_400Regular',
        fontSize: 35
    },
    image: {
      flex: 1,
    },
});

export default SentInvitationsComponent;
