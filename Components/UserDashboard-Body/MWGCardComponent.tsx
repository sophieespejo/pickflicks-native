import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput,Pressable } from "react-native";
import emptyHeart from "../../assets/emptyHeart.png";
import filledHeart from "../../assets/filledHeart.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { GetUserByUsername, GetAllMWGAUserIsMemberOfuserId } from '../../Service/DataService'

interface IMWGCardComponent {
  username: string
}

//map through MWG created according to userID/logged in user
const MWGCardComponent: FC = ({username}) => {
  const [allMWG, setAllMWG] = useState([]);
  const [allFaveMWG, setAllFaveMWG] = useState("")

  
  useEffect(  () => {
 
      async function fetchUserData() {
      let response = await GetUserByUsername(username);
      setAllFaveMWG(response.favoritedMWGId);
      console.log(response);
      if(response != null)
        {
          let userMWG = await GetAllMWGAUserIsMemberOfuserId(response.id);
          console.log(userMWG)
          setAllMWG(userMWG);
        }
      }
      fetchUserData();
    },
   []);



  
    // let userData = await GetUserByUsername(username);
    // console.log(userData);

  const [isFavorite, setIsFavorite] = useState(false);





  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }



  
  return (

    <View style={{ flex:1, alignItems:'center'}}>
      {
        allMWG.map((group,i) => {
          return (
            <>
              <Pressable style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=>console.log("pressed MWG")}>
                <View key={i} >
                  <View  style={{marginTop: '10%', flexDirection:'row'}}>
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 28,
                        fontWeight: 'bold',
                        justifyContent: "center",
                        textAlign: "center",
                        fontFamily:'Raleway_400Regular', 
                        marginBottom: 0,
                      }}
                      >
                      {group.mwgName}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 20,
                        justifyContent: "center",
                        textAlign: "center",
                        fontFamily:'Raleway_400Regular', 
                        marginBottom: '10%'
                      }}
                    >
                      Members: {group.membersNames}
                    </Text>
                  </View>
              </View>
              <Pressable style={styles.heart} onPress={()=>console.log("pressed heart")}>
                <Image  source={allFaveMWG.includes(group.id) ? filledHeart : emptyHeart} ></Image>
              </Pressable>
            </Pressable>
          </>
          )
        })
      }



      
 
    </View>
  );
};

export default MWGCardComponent;

const styles = StyleSheet.create({
  wgButton: {
    // flexDirection: "row",
    borderWidth: 2,
    borderColor: "#4D4A4AD1",
    backgroundColor: "#4D4A4AD1",
    borderRadius: 25,
    alignItems: "center",
    width: '90%',
    justifyContent: "center",
    //height: '20%',
    
  },
  container: {
    flex:1,
    alignItems: "center",
    // paddingTop: 20,
    paddingBottom:20,
    position: 'absolute', top: 260, left: 20, right: 20, bottom: 0,
  },
  heart:{
    position: 'absolute',
    left: '93%',
    bottom: '83%'
  }
});
