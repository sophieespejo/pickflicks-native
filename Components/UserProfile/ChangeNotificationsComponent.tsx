import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView} from "react-native";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold} from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
import JJKMovie from '../../assets/JJKMovie.jpg'
import Popcorn from '../../assets/Popcorn.gif'
import { Checkbox } from "native-base";
  


const ChangeNotificationsComponent: FC = () => {
    const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
      <View style={{flex: 1, alignSelf:'center', width:'90%'}}>
        <View style={{flex:1, marginTop:'10%'}}>
          <Text style={styles.titleTxtBold}>Manage Notifications</Text>
        </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={styles.Txt}>Allow Notifications</Text>
          <Checkbox value="test" accessibilityLabel="Check to enable notifications" size="lg" defaultIsChecked/>
        </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={styles.Txt}>Don't allow notifications</Text>
          <Checkbox value="test" accessibilityLabel="Check to disable notifications" size="lg" />
        </View>
        <Pressable style={{flex:1, alignItems:'center', paddingTop:'5%'}}>
                          <Text style={styles.SaveTxt}>Save</Text>
          </Pressable>
        {/* <View style={{ flex: 1, width:'100%'}}> */}
           


            {/* <View style={{flex:0.38, justifyContent:'center', alignItems:'center', marginTop:'5%'}}>
                <Image style={{width:'30%', height:'70%', borderRadius:'70%'}} source={Popcorn}></Image>
                <Pressable>
                    <Text style={styles.IconTxt}>Change your icon</Text>    
                </Pressable>
            </View>


            <View style={{flex:1, marginTop:'10%'}}>

            <Pressable onPress={() => console.log('pressed1')} style={{flex:0.15, width:'80%', justifyContent:'space-between', flexDirection:'row', alignSelf:'center'}}>
                <Text style={styles.Txt}>Username</Text>
                <Text style={styles.Txt}>></Text>
            </Pressable>

            <Pressable onPress={() => console.log('pressed2')} style={{flex:0.15, width:'80%', justifyContent:'space-between', flexDirection:'row', alignSelf:'center'}}>
                <Text style={styles.Txt}>Password</Text>
                <Text style={styles.Txt}>></Text>
            </Pressable>

            <Pressable onPress={() => console.log('pressed3')} style={{flex:0.15, width:'80%', justifyContent:'space-between', flexDirection:'row', alignSelf:'center'}}>
                <Text style={styles.Txt}>Notifications</Text>
                <Text style={styles.Txt}>></Text>
            </Pressable>
            </View> */}



        {/* </View> */}
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
      fontFamily:'Raleway_400Regular',
      fontSize: 30,
      textAlign:'center',
      marginTop:'4%',
      color: '#EBE1E1',
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
    color: '#EBE1E1',
    textAlign:'left'
  },
  Txt2:{
    fontFamily:'Raleway_400Regular',
    fontSize: 25,
    textAlign:'center',
    color: '#FFFFFF',
  },
  SaveTxt:{
    fontFamily: "Raleway_400Regular",
    fontSize: 26,
    color:'#09A7F9',
  }
});

export default ChangeNotificationsComponent;
