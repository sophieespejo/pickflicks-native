import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, Text, View, Image, Pressable} from "react-native";
import headerLogo from "../../assets/headerLogo.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import CheckMark from '../../assets/CheckMark.png'
import {useNavigation} from '@react-navigation/native';



const SentInvitationsComponent: FC = () => {
  const navigation = useNavigation<any>();
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <Pressable style={styles.container} onPress={()=> navigation.navigate("UserDashboard")}>
    <View style={{flexDirection: 'row', alignItems:'center',
        justifyContent:'flex-end', }}>
      {/* <ImageBackground blurRadius={1} source={CheckMark} resizeMode="cover" style={styles.image}> */}
        <Image source={CheckMark}/>
        <Text style={styles.text}>Invitation Sent</Text>

    {/* </ImageBackground> */}
    </View>
    </Pressable>
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
        fontSize: 30
    },
    image: {
      flex: 1,
      height: '80%',
      width: '80%',
      
    },
});

export default SentInvitationsComponent;
