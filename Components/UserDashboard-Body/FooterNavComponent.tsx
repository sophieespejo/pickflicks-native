import { FC } from "react";
import {
  StyleSheet,
  View,
  Image,
} from "react-native";
import Home from "../../assets/Home2.png";
import UserProfile from "../../assets/UserProfile2.png";
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';


const FooterNavComponent: FC = () => {

  const navigation = useNavigation<any>();

  const handleUserdashboard = async() => {
    
  }

  return (
    <View style={styles.container}>
      <Button
        // mode="text"
        onPress={() => {
          navigation.navigate("UserProfile");
        }}
        icon={() => (
          <Image
            source={UserProfile}
            style={{ width: 30, height: 30, tintColor: "white" }}
          />
        )}
      ></Button>
      <Button
        // mode="text"
        onPress={() => {
          navigation.navigate("UserDashboard");
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
