import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TextInput} from "react-native";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
// import { Button } from "native-base";
import { Slider } from "native-base";
import UserContext from '../../Context/UserContext';
import { GetMWGById, AddGenreRankingModel, AddMWGStatus, GetMWGStatusByMWGId, UpdateGenreRanking, GetMWGStatusByUserId} from '../../Service/DataService'
import GenreRankingScreen2 from "../../Screens/MWGDash/GenreRankingScreen2";


const SelectedGenreComponent3: FC = () => {
    const navigation = useNavigation<any>();
    let { username, setUsername, userId, setUserId, userIcon, setUserIcon, MWGname, setMWGname, MWGId, setMWGId, MWGgenres, setMWGgenres, MWGmembersId, setMWGmembersId,genre1,genre2, genre3, setGenre3, setAllMWG} = useContext(UserContext)
    const [onChangeValue, setOnChangeValue] = useState(0);

    
    useEffect( () => {
      async function getUserInfo(){
        setMWGname(MWGname);
        setMWGId(MWGId);
        let movieObj = await GetMWGById(MWGId);
        if(movieObj != null)
        {
          let genreString = movieObj.chosenGenres.split(",");
          setMWGgenres(genreString);
        }
        
      }
      getUserInfo()
    }, []);

    const onNextPress = async () => {
      setGenre3(onChangeValue);
      let newGRModel = {
        Id: 0,
        MWGId: MWGId,
        UserId: userId,
        MembersId: MWGmembersId,
        Genre1: genre1,
        Genre2: genre2,
        Genre3: onChangeValue,
      }
      let result = await AddGenreRankingModel(newGRModel);

      if(result)
      {
        console.log(result);
        console.log(newGRModel);
        let result1 = await UpdateGenreRanking(MWGId, userId)
        if(result1)
        {
          let movieObj = await GetMWGStatusByMWGId(MWGId);
          if(movieObj != null)
          {
            let isMWGDoneWithRanking = movieObj[0].areAllMembersDoneWithGenre;
            if(isMWGDoneWithRanking)
            {
              setTimeout(() => {
                navigation.navigate('FinalGenre') 
              }, 3000);
            }
            else{
                let result = await GetMWGStatusByUserId(userId);
                setAllMWG(result);
                navigation.navigate('UserDashboard') 
            }
          }
        }
      }
      
    }

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
      <View style={{flex: 1, alignItems:'center'}}>
        <View style={{ flex: 1, backgroundColor:'#DC1B21C4', borderRadius:30, width:'92%', marginTop:'8%',marginBottom:'8%', justifyContent:'center'}}>
           
            <View style={{flex:0.8}}>
                <Text style={styles.titleTxt}>Top 5 Genres</Text>
            </View>


            <View style={{flex:1, alignItems:'center', marginBottom:'10%'}}>
                <View style={{marginBottom:'10%'}}>
                    <Text style={styles.GenreTxt}>{MWGgenres[2]}</Text>
                </View>
                
                  <Slider  style={{marginTop:'5%'}} 
                    colorScheme="gray" w="3/4" 
                    maxW="300" 
                    defaultValue={10} 
                    minValue={10} 
                    maxValue={50} 
                    accessibilityLabel="Rank the Genre from 1 to 5" 
                    step={1} 
                    onChange={v => {
                      setOnChangeValue(Math.floor(v))}}>
                    <Slider.Track>
                      <Slider.FilledTrack />
                    </Slider.Track>
                    <Slider.Thumb />
                  </Slider>

                  <View style={{flexDirection:'row', justifyContent:'space-between', width:'80%'}}>
                    <Text style={styles.numberScale}>1</Text>
                    <Text style={styles.numberScale}>5</Text>
                  </View>
            </View>


            <View style={{flexDirection:'row'}}>

              <View style={[{ flex:0.5,  alignItems:'flex-start'}]}>
          <Button uppercase={false} color='#FFFFFF' mode="text" onPress={() => {navigation.navigate("GenreRanking")}}>
              <Text style={styles.nextBtn}> {'\<'} Back </Text>
          </Button>
              </View>
              <View style={[{ flex:0.5,  alignItems:'flex-end'}]}>
          <Button uppercase={false} color='#FFFFFF' mode="text" onPress={() => onNextPress()}>
              <Text style={styles.nextBtn}>Next {'\>'}</Text>
          </Button>
              </View>
            </View>


        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  titleTxt:{
      fontFamily:'Raleway_400Regular',
      fontSize: 30,
      textAlign:'center',
      marginTop:'4%',
      color: '#FFFFFF',
  },
  nextBtn:{
    fontFamily: "Raleway_400Regular",
    fontSize: 25
  },
  numberScale:{
    fontFamily: "Raleway_400Regular",
    fontSize: 35,
    color: '#FFFFFF'
  },
  GenreTxt:{
    fontFamily:'Raleway_400Regular',
    fontSize: 45,
    textAlign:'center',
    color: '#FFFFFF',
  }
});

export default SelectedGenreComponent3;
