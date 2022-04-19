import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, Text, View, Image, TextInput, Pressable } from "react-native";
import headerLogo from "../../assets/headerLogo.png";
import MovieClipper from "../../assets/MovieClipper.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import {NavigationContainer, useNavigation} from '@react-navigation/native';


interface IButtonComponent {
  username: string,
  userId: number
}

  type RootStackParamList = {
      Home: undefined; //means route doesnt have params
      Profile: { name: string };
      Login: { username: string, userId: number },
      CreateAccount: undefined;
      Loading: undefined;
      Introduction: undefined;
      UserDashboard: { username: string, userId: number };
      InvitationSent: undefined;
      MemberSearch: { username: string, userId: number },
      NewMWGName: { username: string, userId: number },
    };
  
  type Props = NativeStackScreenProps<RootStackParamList, "UserDashboard">;

const ButtonComponent: FC<Props> = ({username, userId}) => {
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const navigation = useNavigation();

  // const navigation = useNavigation();


  return (
    <View style={{flex:1, marginTop:'5%', marginBottom: '3%', alignItems:'center'}}>
      <Pressable style={{width:'90%', marginBottom:'3%'}} onPress={() => navigation.navigate('NewMWGName',{ username: username, userId: userId})}>
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
    backgroundColor:'#E2DFDFDE',
    borderRadius: 25,
    alignItems:'center',
    justifyContent:'center',
    height:'120%',
  },
  container: {
    flex: 0,
    alignItems: "center",

    //position: 'absolute', top: 175, left: 23, right: 20, bottom: 0,
    backgroundColor:'pink'
  },
});
