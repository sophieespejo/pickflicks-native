import {
    createNativeStackNavigator,
    NativeStackScreenProps,
  } from "@react-navigation/native-stack";
  import { FC } from "react";
  import {
    StyleSheet,
    Text,
    TextInput,
    View,
  } from "react-native";
  import { Button } from "react-native-paper";
  import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";
  import AppLoading from "expo-app-loading";
  import {useNavigation} from '@react-navigation/native';
  
  type RootStackParamList = {
      Home: undefined; //means route doesnt have params
      Profile: { name: string };
      Login: { name: string };
      CreateAccount: undefined;
      Loading: undefined;
      Introduction: undefined;
      UserDashboard: undefined;
    };
  
  type Props = NativeStackScreenProps<RootStackParamList, "UserDashboard">;
  
  const MemberSearchTextInputComponent: FC<Props> = () => {
    let [fontsLoaded] = useFonts({
      Raleway_400Regular,
    });
  
    if (!fontsLoaded) {
      return <AppLoading />;
    }
  
    const navigation = useNavigation();
  
    return (
      <View style={{ flex: 1, backgroundColor:'#4D4A4AEA'}}>

      </View>
    );
  };
  
  const styles = StyleSheet.create({
    yourGroupText: {
      color: "#FFFFFF",
      fontSize: 25,
      textAlign: "center",
      fontFamily: "Raleway_400Regular",
      borderBottomWidth: 2,
      borderColor: "red",
      width: "100%",
    },
    nextBtn:{
      fontFamily: "Raleway_400Regular",
      fontSize: 25
    }
  });
  
  export default MemberSearchTextInputComponent;
  