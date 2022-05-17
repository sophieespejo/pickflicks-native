import { FC } from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
} from "react-native";
import Home from "../../assets/Home2.png";
import NotificationFooter from '../../assets/NotificationFooter.png'
import UserProfile from "../../assets/UserProfile2.png";
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';


const FooterNavComponent: FC = () => {

  const navigation = useNavigation<any>();

  const handleUserdashboard = async() => {
    
  }

  return (
    <View style={styles.container}>
      {/* <Button
        style={{backgroundColor:'purple', marginBottom:'5%'}}
        // mode="text"
        onPress={() => {
          navigation.navigate("UserProfile");
        }}
        icon={() => (
          <Image
            source={NotificationFooter}
            style={{ width: 38, height: 40 }}
          />
        )}
      ></Button> */}
      <Pressable style={{}} onPress={() => {navigation.navigate("UserProfile")}}>
        <Image source={NotificationFooter} style={{ width: 38, height: 40 }}/>
      </Pressable>

      <Pressable style={{paddingTop:'2%'}} onPress={() => {navigation.navigate("UserDashboard")}}>
        <Image source={Home} style={{ width: 30, height: 30}}/>
      </Pressable>
      {/* <Button
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
      ></Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.08,
    backgroundColor: "#38333343",
    // backgroundColor:'purple',
    flexDirection: "row",
    paddingTop: '5%',
    justifyContent: "space-evenly",
    alignContent:'center',
    
  },
});

export default FooterNavComponent;
