import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView} from "react-native";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold} from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
import JJKMovie from '../../assets/JJKMovie.jpg'
import Popcorn from '../../assets/Popcorn.gif'
// import { Button } from "native-base";
  


const YourProfileComponent: FC = () => {
    const navigation = useNavigation<any>();

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
      <View style={{flex: 1, alignItems:'center'}}>
        <View style={{ flex: 1, width:'100%'}}>
           


            <View style={{flex:0.38, justifyContent:'center', alignItems:'center', marginTop:'5%'}}>
                <Image style={{width:'30%', height:'70%', borderRadius:'70%'}} source={Popcorn}></Image>
                <Pressable>
                    <Text style={styles.IconTxt}>Change your icon</Text>    
                </Pressable>
            </View>


            <View style={{flex:1, marginTop:'10%'}}>

            <Pressable onPress={() => console.log('pressed1')} style={{flex:0.15, width:'80%', justifyContent:'space-between', flexDirection:'row', alignSelf:'center'}}>
                <Text style={styles.Txt}>Username</Text>
                <Text style={styles.Txt}>{'\>'}</Text>
            </Pressable>

            <Pressable onPress={() => console.log('pressed2')} style={{flex:0.15, width:'80%', justifyContent:'space-between', flexDirection:'row', alignSelf:'center'}}>
                <Text style={styles.Txt}>Password</Text>
                <Text style={styles.Txt}>{'\>'}</Text>
            </Pressable>

            <Pressable onPress={() => console.log('pressed3')} style={{flex:0.15, width:'80%', justifyContent:'space-between', flexDirection:'row', alignSelf:'center'}}>
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
