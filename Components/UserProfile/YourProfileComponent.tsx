import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView} from "react-native";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold} from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Avatar } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
import JJKMovie from '../../assets/JJKMovie.jpg'
import Popcorn from '../../assets/Popcorn.gif'
import girl1 from '../../assets/avatars/girl1.png'
import girl2 from '../../assets/avatars/girl2.png'
import girl3 from '../../assets/avatars/girl3.png'
import girl4 from '../../assets/avatars/girl4.png'
import girl5 from '../../assets/avatars/girl5.png'
import girl6 from '../../assets/avatars/girl6.png'
import boy1 from '../../assets/avatars/boy1.png'
import boy2 from '../../assets/avatars/boy2.png'
import boy3 from '../../assets/avatars/boy3.png'
import boy4 from '../../assets/avatars/boy4.png'
import boy5 from '../../assets/avatars/boy5.png'
import boy6 from '../../assets/avatars/boy6.png'
import UserContext from '../../Context/UserContext';

  


const YourProfileComponent: FC = () => {
  let { userIcon, setUserIcon, username, setUsername, userId, setUserId, allMWG, setAllMWG, setMWGname, MWGname, setMWGId, MWGId } = useContext(UserContext)

  const icons = new Map([
    ['boy1', boy1],
    ['boy2', boy2],
    ['boy3', boy3],
    ['boy4', boy4],
    ['boy5',boy5],
    ['boy6',boy6],
    ['girl1', girl1],
    ['girl2', girl2],
    ['girl3', girl3],
    ['girl4', girl4],
    ['girl5',girl5],
    ['girl6',girl6],
  ])

  const navigation = useNavigation<any>();

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const handleIconChange = () => {
   navigation.navigate("AvatarScreen");
  }

  const handleUsernameNavigation = () => {
    navigation.navigate("ChangeUsername")
  }
  const handlePasswordNavigation = () => {
    navigation.navigate("ChangePassword1")
  }
  const handleNotificationsNavigation = () => {
    navigation.navigate("ChangeNotifications")
  }
  
  return (
      <View style={{flex: 1, alignItems:'center'}}>
        <View style={{ flex: 1, width:'100%'}}>
           


            <View style={{flex:0.38, justifyContent:'center', alignItems:'center', marginTop:'5%'}}>
                <Avatar.Image size={125} source={icons.get(userIcon)}/>
                <Pressable onPress={() => handleIconChange()}>
                    <Text style={styles.IconTxt}>Change your icon</Text>    
                </Pressable>
            </View>


            <View style={{flex:1, marginTop:'10%'}}>

            <Pressable onPress={() => handleUsernameNavigation()} style={{flex:0.15, width:'80%', justifyContent:'space-between', flexDirection:'row', alignSelf:'center'}}>
                <Text style={styles.Txt}>Username</Text>
                <Text style={styles.Txt}>{'\>'}</Text>
            </Pressable>

            <Pressable onPress={() => handlePasswordNavigation()} style={{flex:0.15, width:'80%', justifyContent:'space-between', flexDirection:'row', alignSelf:'center'}}>
                <Text style={styles.Txt}>Password</Text>
                <Text style={styles.Txt}>{'\>'}</Text>
            </Pressable>

            <Pressable onPress={() => handleNotificationsNavigation()} style={{flex:0.15, width:'80%', justifyContent:'space-between', flexDirection:'row', alignSelf:'center'}}>
                <Text style={styles.Txt}>Notifications</Text>
                <Text style={styles.Txt}>{'\>'}</Text>
            </Pressable>
            </View>



        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  titleTxt:{
      fontFamily:'Raleway_400Regular',
      fontSize: 22,
      textAlign:'center',
      marginTop:'4%',
      color: '#EBE1E1',
  },
  titleTxtBold:{
      fontFamily:'Raleway_600SemiBold',
      fontSize: 40,
      textAlign:'center',
      marginTop:'4%',
      color: '#EBE1E1',
      fontWeight:'600'
  },
  IconTxt:{
    fontFamily: "Raleway_400Regular",
    fontSize: 20,
    color:'#09A7F9',
    paddingTop:'4%'
  },
  Txt:{
    fontFamily:'Raleway_400Regular',
    fontSize: 26,
    textAlign:'center',
    color: '#FFFFFF',
  },
  Txt2:{
    fontFamily:'Raleway_400Regular',
    fontSize: 25,
    textAlign:'center',
    color: '#FFFFFF',
  }
});

export default YourProfileComponent;
