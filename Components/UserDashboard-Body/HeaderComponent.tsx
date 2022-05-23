import { FC, useContext} from "react";
import UserContext from '../../Context/UserContext';
import { StyleSheet, View, Image, TextInput} from "react-native";
import headerLogo from "../../assets/headerLogo.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';


const HeaderComponent: FC = () => {

  let {  setDevice, device} = useContext(UserContext);

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
            <TextInput style={styles.yourGroupText} editable={false} value={"Your Groups"}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  yourGroupText: {
    color: "#FFFFFF",
    fontSize: 28,
    textAlign: 'center',
    fontFamily:'Raleway_400Regular', 
    borderBottomWidth: 2,
    borderColor: "red",
    width:'90%',
  },
});

export default HeaderComponent;
