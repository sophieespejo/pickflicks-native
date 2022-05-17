import { FC } from "react";
import { StyleSheet, View, Image, TextInput} from "react-native";
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
    <View style={{flex:0.15, paddingTop: 20}}>
      <View style={{flex:0.7, paddingTop:10, marginRight: '10%'}}>
        <Image style={{height: 70, width: '100%', marginLeft: '13%'}} source={headerLogo}></Image>
      </View>
      <View style={{flex:0.4, alignItems:'center'}}>
            <TextInput style={styles.yourGroupText} editable={false} value="Your Groups"/>
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
