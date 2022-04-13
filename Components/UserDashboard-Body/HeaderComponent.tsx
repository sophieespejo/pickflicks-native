import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, Text, View, Image, TextInput} from "react-native";
import headerLogo from "../../assets/headerLogo.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';


const HeaderComponent: FC = () => {
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <View style={styles.outsideContainer}>
      <View style={styles.headerContainer}>
        <Image style={styles.headerLogo} source={headerLogo}></Image>
      </View>
      <View style={{flex:1, alignItems:'center', bottom:20, right:13}}>
        <View style={styles.redLine}>
            <TextInput style={styles.yourGroupText} editable={false} value="Your Groups"/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outsideContainer: {
    flex: 0.000001,
    // position: 'relative', top: 0, left: 23, right: 0, bottom: 0,
  },
  headerLogo: {
    width: "100%",
    height: 150,
  },
  headerContainer: {
    alignItems: "center",
    marginLeft: 50,
  },
  textContainer: {
    flex: 0.15,
    alignItems: "center",
  },
  yourGroupText: {
    color: "#FFFFFF",
    fontSize: 32,
    paddingBottom:50,
    fontFamily:'Raleway_400Regular', 
  },
  redLine: {
    // flex: 0.8,
    width:'90%',
    borderBottomWidth: 2,
    borderColor: "red",
    alignItems:'center',
    position: 'absolute', top: 0, left: 23, right: 0, bottom: 670,
  },
});

export default HeaderComponent;
