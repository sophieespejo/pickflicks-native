import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput} from "react-native";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold} from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
import JJKMovie from '../../assets/JJKMovie.jpg'
// import { Button } from "native-base";
  


const FinalMovieCardComponent: FC = () => {
    const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
      <View style={{flex: 1, alignItems:'center'}}>
        <View style={{ flex: 1, backgroundColor:'#BEB85B', borderRadius:30, width:'92%', marginTop:'8%', marginBottom:'8%', justifyContent:'center', 
                    borderWidth: 3, borderColor:'#E6D260'}}>
           <View>
               <Text style={styles.titleTxtBold}> MovieGroup1's {'\n'} Movie is </Text>
               <View style={{marginTop:'3%'}}>
                <Text style={styles.titleTxtBold}> Movie Name </Text>
               </View>
           </View>


            <View style={{flex:1, alignItems:'center'}}>
                <View style={{flex:2, alignItems:'center'}}>
                    <Image style={{width:340, height:250, borderRadius:21, marginTop:'5%'}} source={JJKMovie}></Image>
                </View>
                <View style={{flex:1.2, alignItems:'center'}}>
                    <Text style={styles.titleTxt}>Movie Summary</Text>
                    <Text style={styles.titleTxt}>Movie Rating</Text>
                </View>
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
      color: '#524C4C',
  },
  titleTxtBold:{
      fontFamily:'Raleway_600SemiBold',
      fontSize: 35,
      textAlign:'center',
      marginTop:'4%',
      color: '#524C4C',
      fontWeight:'600'
  },
  nextBtn:{
    fontFamily: "Raleway_400Regular",
    fontSize: 25
  },
  GenreTxt:{
    fontFamily:'Raleway_400Regular',
    fontSize: 45,
    textAlign:'center',
    color: '#FFFFFF',
  }
});

export default FinalMovieCardComponent;
