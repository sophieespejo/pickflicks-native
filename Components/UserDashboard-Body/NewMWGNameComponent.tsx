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
    UserDashboard: { name : string };
    Login: { name: string }
    CreateAccountScreen: undefined,
    Loading: undefined,
    Introduction: undefined,
    NewMWGName: undefined,
    MemberSearch: undefined
  }
  
  
  const Stack = createNativeStackNavigator<RootStackParamList>();

const NewMWGNameComponent: FC<Props> = () => {
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1}}>
      <View style={{ flex:0.5, alignItems:'center', justifyContent: "flex-end"}}>
        <TextInput
          style={[styles.yourGroupText, {width:'90%'}]}
          placeholder="Enter a name for the group"
          placeholderTextColor="#FFFFFF"
        />
      </View>
      <View style={[{ flex:0.5, alignItems: "center", justifyContent:'flex-end', alignItems:'flex-end'}]}>
        <Button uppercase={false} color='#FFFFFF' mode="text" onPress={() => {
          navigation.navigate("MemberSearch");
        }}>
            <Text style={styles.nextBtn}>Next ></Text>
        </Button>
      </View>
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

export default NewMWGNameComponent;
