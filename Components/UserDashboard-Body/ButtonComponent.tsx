import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import headerLogo from "../../assets/headerLogo.png";
import MovieClipper from "../../assets/MovieClipper.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';

const ButtonComponent: FC = () => {
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.wgButton}>
        <Image source={MovieClipper}></Image>
        <Text style={{color:'#383333', fontSize:20, paddingLeft:60, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular', }}>Create new {"\n"}Watch Group</Text>
      </View>
    </View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  wgButton: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor:'#E2DFDFDE',
    backgroundColor:'#E2DFDFDE',
    borderRadius: 25,
    alignItems:'center',
    width:'100%',
    justifyContent:'center',
    height:73

  },
  container: {
    flex: 0,
    alignItems: "center",

    position: 'absolute', top: 175, left: 23, right: 20, bottom: 0,
    backgroundColor:'blue'
  },
});
