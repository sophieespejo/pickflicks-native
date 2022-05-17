import { FC} from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import MovieClipper from "../../assets/MovieClipper.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import {useNavigation} from '@react-navigation/native';


interface IButtonComponent {
  username: string,
  userId: number,
  children: React.ReactNode;
}
  
  const ButtonComponent: FC = () => {
  const navigation = useNavigation<any>();

  

  // let [fontsLoaded] = useFonts({
  //   Raleway_400Regular,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }




  return (
    <View style={{flex:1, paddingTop:'3%', marginBottom: '3%', alignItems:'center'}}>
      <Pressable style={{width:'90%', marginBottom:'3%'}} onPress={() => navigation.navigate('NewMWGName')}>
        <View style={styles.wgButton}>
          <Image source={MovieClipper}></Image>
          <Text style={{color:'#383333', fontSize:20, paddingLeft:60, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>Create new {"\n"}Watch Group</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  wgButton: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor:'#E2DFDFDE',
    backgroundColor:'rgba(226, 223, 223, 1)',
    borderRadius: 25,
    alignItems:'center',
    justifyContent:'center',
    height:'120%',
  },
  container: {
    flex: 0,
    alignItems: "center",
    backgroundColor:'pink'
  },
});
