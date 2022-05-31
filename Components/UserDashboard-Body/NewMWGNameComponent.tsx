import { FC, useState, useEffect, useContext} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from "react-native";
import { Button } from "react-native-paper";
import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";
import AppLoading from "expo-app-loading";
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../Context/UserContext';

  

interface INewMWGNameComponent {
  username: string,
  userId: number,
  children: React.ReactNode;
}

const NewMWGNameComponent: FC = () => {
  let { username, setUsername, userId, setUserId, setnewMWGname, userIcon, setUserIcon } = useContext(UserContext)

  const [MWGname, setMWGname] = useState<string>("");
  const navigation = useNavigation<any>();

  
  useEffect( () => {
    async function getUserInfo(){
          setUsername(username);
          setUserId(userId)
          setUserIcon(userIcon)
    }
    getUserInfo()
  }, []);

  const handlePress= () => {
    if(MWGname != '')
    {
      setnewMWGname(MWGname);
      navigation.navigate('MemberSearch');
    }
    else
    {
      Alert.alert('Error', 'Group name cannot be blank.');
    }
  }
  
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


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
      <View style={[{ flex:0.5, justifyContent:'flex-end', alignItems:'flex-end'}]}>
        <Button uppercase={false} color='#FFFFFF' mode="text" onPress={() => {
          handlePress()
        }}>
            <Text style={styles.nextBtn}>Next {'\>'}</Text>
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
