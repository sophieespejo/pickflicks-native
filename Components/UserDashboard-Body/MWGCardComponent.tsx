import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput,Pressable } from "react-native";
import emptyHeart from "../../assets/emptyHeart.png";
import filledHeart from "../../assets/filledHeart.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { GetUserByUsername } from '../../Service/DataService'

interface IMWGCardComponent {
  username: string
}

//map through MWG created according to userID/logged in user
const MWGCardComponent: FC = ({username}) => {

  
  useEffect( async () => {
    // let userData;
    // const fetchUserData = async () => {
    //   userData = await GetUserByUsername(username)
    // }
    // fetchUserData();
    // console.log(userData);
    let userData = await GetUserByUsername(username);
    console.log(userData);
  }, []);

  const [isFavorite, setIsFavorite] = useState(false);

  const [allMovies, setAllMovies] = useState([
    {
      movieGroupName: 'Group 1',
      movieGroupMembers: 'An, Dylan, Sophie',
      isFavorite: true
    },
    {
      movieGroupName: 'Group 2',
      movieGroupMembers: 'Annnn, Dylannnnn, Sophieeeee',
      isFavorite: true
    },
    {
      movieGroupName: 'Group 3',
      movieGroupMembers: 'Annnngel, Dylannnnngel, Sophieeeeegel',
      isFavorite: false
    },
    {
      movieGroupName: 'Group 4',
      movieGroupMembers: 'Annnngel, Dylannnnngel, Sophieeeeegel',
      isFavorite: false
    },
    {
      movieGroupName: 'Group 5',
      movieGroupMembers: 'Annnngel, Dylannnnngel, Sophieeeeegel',
      isFavorite: false
    },
  ])



  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }



  
  return (

    <View style={{ flex:1, alignItems:'center'}}>
      <Text>{username}</Text>
      {
        allMovies.map((movie,i) => {
          return (
            <View key={i} style={[styles.wgButton, {flex:1, marginTop:'5%'}]}>
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
                {movie.movieGroupName}
              </Text>
              <Pressable style={styles.heart} onPress={()=>!movie.isFavorite}>
                <Image  source={movie.isFavorite ? filledHeart : emptyHeart} ></Image>
              </Pressable>
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
            Members: {movie.movieGroupMembers}
          </Text>
            </View>
        </View>
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
    left: '55%',
    bottom: '150%'
  }
});
