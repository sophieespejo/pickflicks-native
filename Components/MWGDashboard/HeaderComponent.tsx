import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput} from "react-native";
import headerLogo from "../../assets/headerLogo.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import UserContext from '../../Context/UserContext';



const HeaderComponent: FC = () => {
  let { setMWGname, MWGname, setMWGId, MWGId } = useContext(UserContext);

  // useEffect( () => {
  //   async function getUserInfo(){
  //         setMWGname(MWGname);
  //   }
  //   getUserInfo()
  // }, []);

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <View style={{flex:0.15, paddingTop: 20}}>
      <View style={{flex:0.7, paddingTop:10, marginRight: '10%'}}>
        <Image style={{height: 70, width: '100%', marginLeft: '13%'}} source={headerLogo}></Image>
      </View>
      <View style={{flex:0.4, alignItems:'center'}}>
            <TextInput style={styles.yourGroupText} editable={false} value={MWGname}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outsideContainer: {
    flex: 0.2,
    // position: 'relative', top: 0, left: 23, right: 0, bottom: 0,
    backgroundColor: 'green'
  },
  headerLogo: {
    height: 70, 
    width: '100%', 
    marginLeft: '13%'
  },
  headerContainer: {
    flex:8,
    alignItems: "center",
    backgroundColor:'blue'
  },
  textContainer: {
    flex: 0.15,
    alignItems: "center",
  },
  yourGroupText: {
    color: "#FFFFFF",
    fontSize: 28,
    //paddingBottom:50,
    textAlign: 'center',
    fontFamily:'Raleway_400Regular', 
    borderBottomWidth: 2,
    borderColor: "red",
    width:'90%',
  },
  redLine: {
    width:'90%',
    borderBottomWidth: 2,
    borderColor: "red",
    alignItems:'center',
    justifyContent: 'center',
    position: 'absolute', top: 0, left: 23, right: 0, bottom: 670,
  },
});

export default HeaderComponent;
