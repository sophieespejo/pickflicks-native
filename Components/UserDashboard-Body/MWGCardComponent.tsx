import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput,Pressable, Button} from "react-native";
import emptyHeart from "../../assets/emptyHeart.png";
import filledHeart from "../../assets/filledHeart.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { GetUserByUsername, GetAllMWGAUserIsMemberOfuserId, AddFavoriteMWG, RemoveFavoriteMWG } from '../../Service/DataService'
import {useNavigation} from '@react-navigation/native';


interface IMWGCardComponent {
  username: string,
  userId: number
}

//map through MWG created according to userID/logged in user
const MWGCardComponent: FC = ({username, userId}) => {
  const [allMWG, setAllMWG] = useState([]);
  const [allFaveMWG, setAllFaveMWG] = useState([]);
  const [favorite, setFavorite] = useState(0);

  const navigation = useNavigation();

  
  useEffect(  () => {

      async function fetchUserData() {
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

    const handleAddFavoriteMWG = async (groupId) =>{
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

    const handleRemoveFavoriteMWG = async (groupId) =>{
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

      allMWG.map((group, i) => {if(allFaveMWG.includes(parseInt(group.id)))
      {
        return (
          <>
               <Pressable key={i} style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=>console.log(group)}>
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
              <Pressable style={styles.heart} onPress={()=>handleRemoveFavoriteMWG(group.id)}>
                <Image  source={filledHeart} ></Image>
              </Pressable>
            </Pressable>
            <Button title="test" onPress={() => console.log(allFaveMWG.includes(group.id))}></Button>

          </>
        )
      }})
      }

      {
        allMWG.map((group, i) => {if(!allFaveMWG.includes(parseInt(group.id)))
          {
            return (
              <>
                   <Pressable key={i} style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=>console.log(group)}>
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
                <Button title="test" onPress={() => console.log(allFaveMWG.includes(group.id))}></Button>
    
              </>
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
