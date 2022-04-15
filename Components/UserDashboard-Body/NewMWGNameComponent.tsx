import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { FC, useState } from "react";
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
    UserDashboard: { username: string, userId: number}
    Login: { username: string}
    CreateAccountScreen: undefined,
    Loading: undefined,
    Introduction: undefined,
    NewMWGName: { username: string, userId: number}
    MemberSearch: { username: string, userId: number, newMWGname: string  },
  }
  
  
  const Stack = createNativeStackNavigator<RootStackParamList>();

interface INewMWGNameComponent {
  username: string,
  userId: number,
}

const NewMWGNameComponent: FC = ({username, userId}) => {

  const [MWGname, setMWGname] = useState("");
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
          onChangeText={(e) => setMWGname(e)}
        />
      </View>
      <View style={[{ flex:0.5, alignItems: "center", justifyContent:'flex-end', alignItems:'flex-end'}]}>
        <Button uppercase={false} color='#FFFFFF' mode="text" onPress={() => {
          navigation.navigate("MemberSearch", {username: username, userId: userId, newMWGname: MWGname});
        }}>
          <Text>{username}</Text>
          <Text>{userId}</Text>
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
