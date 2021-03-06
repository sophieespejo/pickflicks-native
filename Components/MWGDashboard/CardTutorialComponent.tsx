import { FC } from "react";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold} from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import {useNavigation} from '@react-navigation/native';
import JJKMovie from '../../assets/JJKMovie.jpg'
import SwipeHand from '../../assets/SwipeHand.png'
import * as Animatable from 'react-native-animatable';
  


const CardTutorialComponent: FC = () => {
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
        <View style={{ flex: 1, backgroundColor:'#4D4A4A', borderRadius:30, width:'92%', marginTop:'8%', marginBottom:'8%', justifyContent:'center', 
                    borderWidth: 3, borderRightColor:'#1BDC62C4', borderLeftColor:'#DC1B21', borderTopColor:'#1BDC62C4', borderBottomColor:'#DC1B21'}}>
           

            <View style={{flex:0.15, flexDirection:'row', justifyContent:'space-around', marginTop:'7%'}}>
                <Text style={styles.tutortialTxt}>Swipe left to {'\n'} dislike</Text>
                <Text style={styles.tutortialTxt}>Swipe right to {'\n'} like</Text>
            </View>
            <View style={{flex:0.15, flexDirection:'row', justifyContent:'space-around'}}>
                <Animatable.Text 
                    animation="pulse" 
                    easing="ease-out" 
                    iterationCount="infinite" 
                    >
                    <Image source={SwipeHand}/>
                </Animatable.Text>
            </View>
            <View style={{flex:1.3, alignItems:'center'}}>
                <View style={{flex:3.7, alignItems:'center', marginTop:'5%'}}>
                    <Image style={{width:340, height:240, borderRadius:21, marginTop:'9%'}} source={JJKMovie}></Image>
                </View>
                <View style={{flex:3, alignItems:'center', justifyContent:'space-around'}}>
                    <Text style={styles.titleTxtBold}>Movie Title</Text>
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
  nextBtn:{
    fontFamily: "Raleway_400Regular",
    fontSize: 25
  },
  tutortialTxt:{
    fontFamily: "Raleway_400Regular",
    fontSize: 22,
    color: '#EBE1E1',
    textAlign:'center'
  },
  GenreTxt:{
    fontFamily:'Raleway_400Regular',
    fontSize: 45,
    textAlign:'center',
    color: '#FFFFFF',
  }
});

export default CardTutorialComponent;
