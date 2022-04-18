import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput} from "react-native";
import headerLogo from "../../assets/headerLogo.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import DropDown from "react-native-paper-dropdown";
import { Button } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';

  


const HeaderComponent: FC = () => {
    const navigation = useNavigation();

    const [streamingService, setStreamingSerivce] = useState("");
    const [showDropDown, setShowDropDown] = useState(false);
        const streamingList = [
        {
          label: "Netflix",
          value: "Netflix",
        },
        {
          label: "Hulu",
          value: "Hulu",
        },
        {
          label: "HBO Max",
          value: "HBO Max",
        },
      ];

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

            <View style={{flex:1, alignItems:'center'}}>       
                <View style={styles.Dropdown}>
                    <DropDown
                    style={{fontFamily:'Raleway_400Regular'}}
                        label={"Streaming Services"}
                        mode={"outlined"}
                        visible={showDropDown}
                        showDropDown={() => setShowDropDown(true)}
                        onDismiss={() => setShowDropDown(false)}
                        value={streamingService}
                        setValue={setStreamingSerivce}
                        list={streamingList}
                        />
                </View>
            </View>

            <View style={{flexDirection:'row'}}>

              <View style={[{ flex:0.5, alignItems: "center", alignItems:'flex-start'}]}>
          <Button uppercase={false} title="button" color='#FFFFFF' mode="text" onPress={() => {navigation.navigate()}}>
              <Text style={styles.nextBtn}> Cancel </Text>
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

export default HeaderComponent;
