import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { StyleSheet, Text, View, Pressable, ImageBackground} from "react-native";
import headerLogo from "../../assets/headerLogo.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
import HuluLogo from '../../assets/hulu.png'
import NetflixLogo from '../../assets/netflix.jpg'
import PrimeLogo from '../../assets/primevideo.jpg'
import HBOMaxLogo from '../../assets/hbomax.png'
import image from '../../assets/black.jpg'


  


const StreamingServiceComponent: FC = () => {
    const navigation = useNavigation<any>();
    //const image = { uri: "https://reactjs.org/logo-og.png" };

    const [streamingService, setStreamingService] = useState<Array<object>>([
      {
        label: "Netflix",
        value: 203,
        source: NetflixLogo
      },
      {
        label: "HBO Max",
        value: 387,
        source: HBOMaxLogo
      },
      {
        label: "Hulu",
        value: 157,
        source: HuluLogo
      },
      {
        label: "Amazon Prime",
        value: 26,
        source: PrimeLogo
      },
    ]);

    const [value, setValue] = useState("");
    const selectHandler = (value) => {
      setValue(value);
      console.log(value);
    };

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
                <Text style={styles.titleTxt}>Select Your  {'\n'} Streaming Service</Text>
            </View>

            <View style={{flex:3, alignItems:'center', width:'100%', justifyContent:'center', borderRadius: 20}}>
            {
              streamingService.map((service, i) => {
                return (
                  <Pressable onPress={() => selectHandler(service.value)} style={ service.value === value ? styles.selected : styles.unselected}>
                    <ImageBackground 
                      source={service.value === value ? service.source : image}  
                      style={styles.image}>
                        <Text style={styles.option} > {service.value === value ? "" : service.label}</Text>
                    </ImageBackground>
                </Pressable>
                )
              })
            }
            </View>

            <View style={{flexDirection:'row'}}>

              <View style={[{ flex:0.5, alignItems: "center", alignItems:'flex-start'}]}>
          <Button uppercase={false} title="button" color='#FFFFFF' mode="text" onPress={() => {navigation.navigate()}}>
              <Text style={styles.nextBtn}> {'\<'} Cancel </Text>
          </Button>
              </View>
              <View style={[{ flex:0.5, alignItems: "center", alignItems:'flex-end'}]}>
          <Button uppercase={false} title="button" color='#FFFFFF' mode="text" onPress={() => {navigation.navigate()}}>
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
  Dropdown:{
      borderRadius:25,
      width:'90%',
      fontFamily:'Raleway_400Regular'
  },
  nextBtn:{
    fontFamily: "Raleway_400Regular",
    fontSize: 25
  },
  radioText:{
    fontFamily: "Raleway_400Regular",
    fontSize: 25,
    color: '#FFFFFF'
  },
  option: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    fontFamily: "Raleway_400Regular",
  },
  unselected: {
    flex:1,
    backgroundColor: 'darkslategray',
    height: '20%',
    width: '80%',
    borderRadius: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'

  },
  selected: {
    flex:1,
    backgroundColor: 'blue',
    height: '20%',
    width: '80%',
    borderRadius: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    resizeMode:'stretch',
    borderRadius: 10,
    overflow: 'hidden'
  },
});

export default StreamingServiceComponent;
