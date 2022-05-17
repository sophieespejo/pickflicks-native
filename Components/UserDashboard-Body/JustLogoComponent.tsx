import { FC } from "react";
import { StyleSheet, View, Image} from "react-native";
import headerLogo from "../../assets/headerLogo.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';


const JustLogoComponent: FC = () => {
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
    </View>
  );
};

const styles = StyleSheet.create({


});

export default JustLogoComponent;
