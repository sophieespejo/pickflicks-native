import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TextInput,Pressable, Button} from "react-native";
import emptyHeart from "../../assets/emptyHeart.png";
import filledHeart from "../../assets/filledHeart.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { GetUserByUsername, GetAllMWGAUserIsMemberOfuserId, AddFavoriteMWG, RemoveFavoriteMWG } from '../../Service/DataService'
import {useNavigation} from '@react-navigation/native';
//import { Avatar } from "react-native-paper";
import { Avatar } from "native-base";
import UserContext from '../../Context/UserContext';



interface IMWGCardComponent {
  username: string,
  userId: number
}

//map through MWG created according to userID/logged in user
const MWGCardComponent: FC = () => {
  let { username, setUsername, userId, setUserId, userIcon, setUserIcon } = useContext(UserContext)

  const [allMWG, setAllMWG] = useState<any>([]);
  const [allFaveMWG, setAllFaveMWG] = useState<any>([]);
  const [favorite, setFavorite] = useState(0);

  const navigation = useNavigation<any>();

  
  useEffect(  () => {

      async function fetchUserData() {
            setUsername(username);
            setUserId(userId)
            console.log(username);
            console.log(userId)
          
      let response = await GetUserByUsername(username);
      let favoritedMWGArray = response.favoritedMWGId.split(',');
      // console.log(favoritedMWGArray);
      for (var i of favoritedMWGArray) {
        allFaveMWG.push(parseInt(i));
      }
      // allFaveMWG.push(parseInt(favoritedMWGArray));
      setAllFaveMWG([...allFaveMWG]);
      console.log(allFaveMWG);
      if(response != null)
        {
          let userMWG = await GetAllMWGAUserIsMemberOfuserId(response.id);
          // console.log(userMWG)
          setAllMWG(userMWG);
        }
      }
      fetchUserData();
    },
   []);

    const handleAddFavoriteMWG = async (groupId:number) =>{
      let result = await AddFavoriteMWG(userId,groupId);
      let userData = await GetUserByUsername(username);
      console.log(result);
      console.log(userData);
      allFaveMWG.push(groupId);
      setAllFaveMWG([...allFaveMWG]);
      console.log(allFaveMWG);
      if(userData != null)
        {
          let userMWG = await GetAllMWGAUserIsMemberOfuserId(userData.id);
          setAllMWG(userMWG);
        }
    }

    const handleRemoveFavoriteMWG = async (groupId:number) =>{
      let result = await RemoveFavoriteMWG(userId,groupId);
      let userData = await GetUserByUsername(username);
      console.log(result);
      console.log(userData);
      let indexGroupId = allFaveMWG.indexOf(groupId);
      allFaveMWG.splice(indexGroupId,1);
      setAllFaveMWG([...allFaveMWG]);
      console.log(allFaveMWG);
      if(userData != null)
        {
          let userMWG = await GetAllMWGAUserIsMemberOfuserId(userData.id);
          setAllMWG(userMWG);
        }
    }

    const handleViewMWG = () => {
        navigation.navigate
    }


  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  
  return (

    <View style={{ flex:1, alignItems:'center'}}>
      {

      allMWG.map((group:any, i:number) => {if(allFaveMWG.includes(parseInt(group.id)))
      {
        return (
          
               <Pressable key={group.id} style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=>navigation.navigate('MWGDashboard')}>
                 <View >
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
                  {/* <View>
                    <Avatar.Group _avatar={{
                        size: "lg"
                      }} max={3}>
                        <Avatar bg="green.500" source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      }}>
                        AJ
                      </Avatar>
                      <Avatar bg="cyan.500" source={{
                      uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }}>
                        TE
                        </Avatar>
                    </Avatar.Group>
                  </View> */}
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
              <Pressable style={styles.heart} onPress={()=>handleRemoveFavoriteMWG(group.id)}>
                <Image  source={filledHeart} ></Image>
              </Pressable>
            </Pressable>
            /* <Button title="test" onPress={() => console.log(allFaveMWG.includes(group.id))}></Button> */

        )
      }})
      }

      {
        allMWG.map((group:any, i:number) => {if(!allFaveMWG.includes(parseInt(group.id)))
          {
            return (
                   <Pressable key={group.id} style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=>navigation.navigate('MWGDashboard')}>
                     <View >
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
                  <Pressable style={styles.heart} onPress={()=>handleAddFavoriteMWG(group.id)}>
                    <Image  source={emptyHeart} ></Image>
                  </Pressable>
                </Pressable>
                /* <Button title="test" onPress={() => console.log(allFaveMWG.includes(group.id))}></Button> */
    
              
            )
          }})
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
