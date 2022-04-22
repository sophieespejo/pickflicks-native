import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import Home from "../../assets/Home2.png";
import UserProfile from "../../assets/UserProfile2.png";
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined; //means route doesnt have params
  Login: undefined,
  CreateAccount: undefined;
  Loading: undefined;
  Introduction: undefined;
  UserDashboard: undefined;
  InvitationSent: undefined;
  MemberSearch: { newMWGname: string },
  NewMWGName: undefined,
};

type Props = NativeStackScreenProps<RootStackParamList, "UserDashboard">;

const FooterNavComponent: FC = () => {

  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Button
        mode="text"
        onPress={() => {
          navigation.navigate("Introduction");
        }}
        icon={() => (
          <Image
            source={UserProfile}
            style={{ width: 30, height: 30, tintColor: "white" }}
          />
        )}
      ></Button>
      <Button
        mode="text"
        onPress={() => {
          navigation.navigate("CreateAccountScreen");
        }}
        icon={() => (
          <Image
            source={Home}
            style={{ width: 30, height: 30, tintColor: "white" }}
          />
        )}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.07,
    backgroundColor: "#38333343",
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-evenly",
  },
});

export default FooterNavComponent;
