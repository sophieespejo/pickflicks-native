import { FC, useContext} from "react";
import { StyleSheet, View, Image, TextInput} from "react-native";
import UserContext from '../../Context/UserContext';
import headerLogo from "../../assets/headerLogo.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';


const HeaderComponent: FC = () => {
  let { device} = useContext(UserContext);
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <View style={{flex:0.15, paddingTop: 20}}>
      <View style={device == 'ios' ? {flex:0.7, paddingTop:10, marginRight: '10%'} : device = 'android' ? {flex:0.7, paddingTop:2, marginRight: '10%'} : null}>
        <Image style={{height: 70, width: '100%', marginLeft: '13%'}} source={headerLogo}></Image>
      </View>
      <View style={{flex:0.4, alignItems:'center'}}>
            <TextInput style={styles.yourGroupText} editable={false} value="Your Profile"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outsideContainer: {
    flex: 0.2,
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
