import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Dimensions } from "react-native";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
import BubbleSelect, { Bubble } from 'react-native-bubble-select';


  


const GenreSelectionComponent: FC = () => {
    const navigation = useNavigation();
    const { width, height } = Dimensions.get('window');


  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
      <View style={{flex: 1, alignItems:'center'}}>
        <View style={{ flex: 1, backgroundColor:'#DC1B21C4', borderRadius:30, width:'92%', marginTop:'8%',marginBottom:'8%', justifyContent:'center'}}>
           
            <View style={{flex:0.8}}>
                <Text style={styles.titleTxt}>Choose 5 Genres to rank</Text>
            </View>


            <View style={{flex:1, alignItems:'center'}}>
            <BubbleSelect
            onSelect={bubble => console.log('Selected: ', bubble.id)}
            onDeselect={bubble => console.log('Deselected: ', bubble.id)}
            width={width}
            height={height}
          >
            <Bubble id="bubble-1" text="Bubble One" />
            <Bubble id="bubble-2" text="Bubble Two" />
            <Bubble id="bubble-3" text="Bubble Three" />
            <Bubble id="bubble-4" text="Bubble Four" />
          </BubbleSelect>
            </View>


            <View style={{flexDirection:'row'}}>

              <View style={[{ flex:0.5, alignItems: "center", alignItems:'flex-start'}]}>
          <Button uppercase={false} title="button" color='#FFFFFF' mode="text" onPress={() => {navigation.navigate()}}>
              <Text style={styles.nextBtn}>{'\<'} Back </Text>
          </Button>
              </View>
              <View style={[{ flex:0.5, alignItems: "center", alignItems:'flex-end'}]}>
          <Button uppercase={false} title="button" color='#FFFFFF' mode="text" onPress={() => {navigation.navigate()}}>
              <Text style={styles.nextBtn}>Next ></Text>
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
  Dropdown:{
      borderRadius:25,
      width:'90%',
      fontFamily:'Raleway_400Regular'
  },
  nextBtn:{
    fontFamily: "Raleway_400Regular",
    fontSize: 25
  }
});

export default GenreSelectionComponent;
