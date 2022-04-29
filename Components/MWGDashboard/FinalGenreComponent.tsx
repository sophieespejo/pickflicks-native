import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput} from "react-native";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
// import { Button } from "native-base";
import { Slider } from "native-base";
  


const FinalGenreComponent: FC = () => {
    const navigation = useNavigation<any>();

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
      <View style={{flex: 1, alignItems:'center'}}>
        <View style={{ flex: 1, backgroundColor:'#F5595E', borderRadius:30, width:'92%', marginTop:'8%',marginBottom:'8%', justifyContent:'center',}}>
           
           <View style={{flex:1, justifyContent:'center'}}>
               <Text style={styles.GenreTxt}>Selected Genre</Text>
               <Text style={styles.titleTxt}>was chosen as {'\n'}the genre</Text>
           </View>


 


            
            
            <View style={{flexDirection:'row', flex:0.1}}>

              <View style={[{ flex:0.5, alignItems:'flex-start'}]}>
          {/* <Button uppercase={false} title="button" color='#FFFFFF' mode="text" onPress={() => {navigation.navigate()}}>
              <Text style={styles.nextBtn}> {'\<'} Back </Text>
          </Button> */}
              </View>
              <View style={[{ flex:0.5, alignItems:'flex-end'}]}>
          <Button uppercase={false}  color='#FFFFFF' mode="text" onPress={() => {navigation.navigate()}}>
              <Text style={styles.nextBtn}>Next {'\>'}</Text>
          </Button>
              </View>
            </View>


        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  titleTxt:{
      fontFamily:'Raleway_400Regular',
      fontSize: 30,
      textAlign:'center',
      marginTop:'4%',
      color: '#FFFFFF',
  },
  nextBtn:{
    fontFamily: "Raleway_400Regular",
    fontSize: 25
  },
  numberScale:{
    fontFamily: "Raleway_400Regular",
    fontSize: 35,
    color: '#FFFFFF'
  },
  GenreTxt:{
    fontFamily:'Raleway_400Regular',
    fontSize: 72,
    textAlign:'center',
    color: '#FFFFFF',
  }
});

export default FinalGenreComponent;
