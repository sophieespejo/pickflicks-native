import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, Text, View, Image, TextInput,ScrollView } from "react-native";
import emptyHeart from "../../assets/emptyHeart.png";
import filledHeart from "../../assets/filledHeart.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';


//map through MWG created according to userID/logged in user
const MWGCardComponent: FC = () => {
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (

    <View style={{ flex:1, alignItems:'center'}}>

      <View style={[styles.wgButton, {marginTop:'5%', height: '60%'}]}>
          <View style={{paddingBottom:0, marginBottom: 0, flexDirection:'row', height: '30%', marginTop:'1%'}}>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 28,
                fontWeight: 'bold',
                justifyContent: "center",
                textAlign: "center",
                fontFamily:'Raleway_400Regular', 
                marginBottom: 0,

              }}
              >
              MovieGroup1
            </Text>
        <Image style={styles.heart} source={filledHeart}></Image>
          </View>
          <View>
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            justifyContent: "center",
            textAlign: "center",
            fontFamily:'Raleway_400Regular', 
          }}
        >
          Members: Sophie, Dylan, An
        </Text>
          </View>
      </View>
      <View style={[styles.wgButton, {marginTop:'5%', height: '60%'}]}>
          <View style={{paddingBottom:0, marginBottom: 0, flexDirection:'row', height: '30%', marginTop:'1%'}}>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 28,
                fontWeight: 'bold',
                justifyContent: "center",
                textAlign: "center",
                fontFamily:'Raleway_400Regular', 
                marginBottom: 0,

              }}
              >
              MovieGroup1
            </Text>
        <Image style={styles.heart} source={filledHeart}></Image>
          </View>
          <View>
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            justifyContent: "center",
            textAlign: "center",
            fontFamily:'Raleway_400Regular', 
          }}
        >
          Members: Sophie, Dylan, An
        </Text>
          </View>
      </View>
      <View style={[styles.wgButton, {marginTop:'5%', height: '60%'}]}>
          <View style={{paddingBottom:0, marginBottom: 0, flexDirection:'row', height: '30%', marginTop:'1%'}}>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 28,
                fontWeight: 'bold',
                justifyContent: "center",
                textAlign: "center",
                fontFamily:'Raleway_400Regular', 
                marginBottom: 0,

              }}
              >
              MovieGroup1
            </Text>
        <Image style={styles.heart} source={filledHeart}></Image>
          </View>
          <View>
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            justifyContent: "center",
            textAlign: "center",
            fontFamily:'Raleway_400Regular', 
          }}
        >
          Members: Sophie, Dylan, An
        </Text>
          </View>
      </View>
      
 
    </View>
  );
};

export default MWGCardComponent;

const styles = StyleSheet.create({
  wgButton: {
    // flexDirection: "row",
    borderWidth: 2,
    borderColor: "#4D4A4AD1",
    backgroundColor: "#4D4A4AD1",
    borderRadius: 25,
    alignItems: "center",
    width: '90%',
    justifyContent: "center",
    height: '20%',
    
  },
  container: {
    flex:1,
    alignItems: "center",
    // paddingTop: 20,
    paddingBottom:20,
    position: 'absolute', top: 260, left: 20, right: 20, bottom: 0,
  },
  heart:{
    position: 'absolute',
    left: '65%',
    bottom: '150%'
  }
});
