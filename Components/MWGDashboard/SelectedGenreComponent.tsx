import { FC, useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View} from "react-native";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
import { Slider } from "native-base";
import UserContext from '../../Context/UserContext';
import { GetMWGById } from '../../Service/DataService'




const SelectedGenreComponent: FC = () => {
    const navigation = useNavigation<any>();
    let { username, setUsername, userId, setUserId,  MWGname, setMWGname, MWGId, setMWGId, MWGgenres, setMWGgenres,  MWGmembersId, setMWGmembersId, genre1, setGenre1 } = useContext(UserContext)
    const [onChangeValue, setOnChangeValue] = useState(0);
    useEffect( () => {
      async function getUserInfo(){
        setUsername(username);
        setUserId(userId);
        setMWGname(MWGname);
        setMWGId(MWGId);
        let movieObj = await GetMWGById(MWGId);
        if(movieObj != null)
        {
          let genreString = movieObj.chosenGenres.split(",");
          setMWGgenres(genreString);
          let mwgIds = movieObj.membersId;
          setMWGmembersId(mwgIds);
        }
        
  }
      getUserInfo()
    }, []);

    const onNextPress = async () => {
      setGenre1(onChangeValue);
      navigation.navigate("GenreRanking2");
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
           
            <View style={{flex:0.2}}>
                <Text style={styles.titleTxt}>Top 5 Genres</Text>
            </View>


            <View style={{flex:1, alignItems:'center', marginBottom:'10%'}}>
              <View  style={{paddingBottom:'20%', justifyContent:'flex-start'}}>
                <Text style={styles.scoreTxt}>{Math.floor(onChangeValue/10)}</Text>
              </View>
                <View>
                    <Text style={styles.GenreTxt}>{MWGgenres[0]}</Text>
                </View>
                
                  <Slider 
                  style={{marginTop:'8%'}}
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

              <View style={[{ flex:0.5, alignItems:'flex-start'}]}>
          <Button uppercase={false} color='#FFFFFF' mode="text" onPress={() => {navigation.navigate()}}>
              <Text style={styles.nextBtn}> {'\<'} Back </Text>
          </Button>
              </View>
              <View style={[{ flex:0.5, alignItems:'flex-end'}]}>
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
  scoreTxt:{
      fontFamily:'Raleway_400Regular',
      fontSize: 100,
      textAlign:'center',
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

export default SelectedGenreComponent;
