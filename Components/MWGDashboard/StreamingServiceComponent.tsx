
import { FC, useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ImageBackground} from "react-native";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
import HuluLogo from '../../assets/hulu.png'
import NetflixLogo from '../../assets/netflix.jpg'
import PrimeLogo from '../../assets/primevideo.jpg'
import HBOMaxLogo from '../../assets/hbomax.png'
import image from '../../assets/black.jpg'
import { AddStreamingService } from '../../Service/DataService'
import UserContext from '../../Context/UserContext';

  


const StreamingServiceComponent: FC = () => {
    const navigation = useNavigation<any>();
    let {  MWGId, setMWGId, setStreamingServiceId } = useContext(UserContext);

    useEffect( () => {
      async function getUserInfo(){
        setMWGId(MWGId);
      }
      getUserInfo()
    }, []);


    const [streamingService, setStreamingService] = useState<Array<object>>([
      {
        label: "Netflix",
        value: '203',
        source: NetflixLogo
      },
      {
        label: "HBO Max",
        value: '387',
        source: HBOMaxLogo
      },
      {
        label: "Hulu",
        value: '157',
        source: HuluLogo
      },
      {
        label: "Amazon Prime",
        value: '26',
        source: PrimeLogo
      },
    ]);

    const [value, setValue] = useState("");
    const selectHandler = (value:any) => {
      setValue(value);
    };

    const onPress = async () => {
      console.log(value);
      let result = await AddStreamingService(MWGId, value)
      if(result)
      {
        console.log(result);
        setStreamingServiceId(value);
        console.log('//StreamingServiceComponent streaming service value:', value)
        navigation.navigate("ChooseGenres");
      }
    }

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
      <View style={{flex: 1, alignItems:'center'}}>
        <View style={{ flex: 1, backgroundColor:'#DC1B21C4', borderRadius:30, width:'92%', marginTop:'8%',marginBottom:'8%', justifyContent:'center'}}>
            <View style={{flex:0.6}}>
                <Text style={styles.titleTxt}>Select Your  {'\n'} Streaming Service</Text>
            </View>
            <View style={{flex:3, alignItems:'center', width:'100%', justifyContent:'center', borderRadius: 20}}>
            {
              streamingService.map((service:any, i:number) => {
                return (
                  <Pressable key={i} onPress={() => selectHandler(service.value)} style={ service.value === value ? styles.selected : styles.unselected}>
                    <ImageBackground 
                      source={service.value === value ? service.source : image}  
                      style={service.value === value ? styles.image1 : styles.image2}>
                        <Text style={styles.option} > {service.value === value ? "" : service.label}</Text>
                    </ImageBackground>
                </Pressable>
                )
              })
            }
            </View>
            <View style={{flexDirection:'row'}}>
              <View style={[{ flex:0.5, alignItems:'flex-start'}]}>
                <Button 
                  uppercase={false} 
                  color='#FFFFFF' 
                  mode="text" 
                  onPress={() => {navigation.navigate()}}>
                    <Text style={styles.nextBtn}> {'\<'} Cancel </Text>
                </Button>
              </View>
              <View style={[{ flex:0.5, alignItems:'flex-end'}]}>
                <Button 
                  uppercase={false} 
                  color='#FFFFFF' 
                  mode="text" 
                  onPress={() => onPress()}>
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
  // createImageBitmap: {
  //   flex: 1,
  //   width: '100%',
  //   justifyContent: "center",
  //   resizeMode:'cover',
  //   borderRadius: 15,
  //   overflow: 'hidden',
  //   borderColor: 'white',
  //   borderWidth: 3
  // },
  image1: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    resizeMode:'cover',
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: 'goldenrod',
    borderWidth: 3
  },
  image2: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    resizeMode:'cover',
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: 'white',
    borderWidth: 3
  },
});

export default StreamingServiceComponent;
