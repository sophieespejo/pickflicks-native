import { FC, useEffect, useContext} from "react";
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
import {GetAllUnacceptedInvitationsByUserId, GetMWGById} from '../../Service/DataService';
import UserContext from '../../Context/UserContext';


const FooterNavComponent: FC = () => {
  let {invitationMWG, setInvitationMWG, userId} = useContext(UserContext)
  const tempArr: Array<Object> = [];


  const navigation = useNavigation<any>();

  useEffect( () => {
    async function Footer(){
      let allUnacceptedInvitations = await GetAllUnacceptedInvitationsByUserId(userId);

        if(allUnacceptedInvitations != null)
        {
          for (const item of allUnacceptedInvitations) 
          {
            let result = await GetMWGById(item.mwgId);
            tempArr.push(result);
          }
          setInvitationMWG([...tempArr]);
        }
    }
    Footer()
  }, []);

  return (
    <View style={invitationMWG.length == 0 ? styles.container1 : styles.container2}>
      
      <Pressable style={invitationMWG.length != 0 ? null : {alignSelf:'center'}} onPress={() => {navigation.navigate("UserProfile")}}>
        <Image source={invitationMWG.length == 0 ? UserProfile : NotificationFooter} style={invitationMWG.length == 0 ? { width: 30, height: 30 }: { width: 38, height: 40 }}/>
      </Pressable>

      <Pressable style={{paddingTop:'2%'}} onPress={() => {navigation.navigate("UserDashboard")}}>
        <Image source={Home} style={{ width: 30, height: 30}}/>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 0.08,
    backgroundColor: "#38333343",
    // backgroundColor:'purple',
    flexDirection: "row",
    paddingTop: '5%',
    justifyContent: "space-evenly",
    alignContent:'center',
    
  },
  container1: {
    flex: 0.07,
    backgroundColor: "#38333343",
    // backgroundColor:'purple',
    flexDirection: "row",
    paddingTop: '5%',
    justifyContent: "space-evenly",
    alignContent:'center',
    
  },
});

export default FooterNavComponent;
