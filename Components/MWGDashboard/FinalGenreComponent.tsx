import { FC, useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View} from "react-native";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
import { AddAll15Movies, GetMWGStatusByMWGId, GetTopRankedGenre} from '../../Service/DataService'
import UserContext from '../../Context/UserContext';
import loadingGif from '../../assets/36292-loader-movie.json'
import LottieView from 'lottie-react-native';


  


const FinalGenreComponent: FC = () => {
    const navigation = useNavigation<any>();
    let { genreId, streamingServiceId, username, genreName, setGenreName, setUsername, userId, setUserId, userIcon, setUserIcon, setGenreId, MWGname, setMWGname, MWGId, setMWGId, MWGgenres, setMWGgenres, MWGmembersId, setMWGmembersId,genre1,genre2, genre3, setGenre3, setAllMWG } = useContext(UserContext)
    const [result, setResult] = useState("");
    const [isFetching15, setIsFetching15] = useState(false);


    useEffect( () => {
      async function getUserInfo(){
        setMWGname(MWGname);
        setMWGId(MWGId);
        let finalGenre = await GetTopRankedGenre(MWGId);
        
        if(finalGenre != null)
        {
          
          setGenreId(finalGenre);
          switch(finalGenre)
          {
            case 10:
              setResult('Horror');
              break;
            case 7:
              setResult('Drama');
              break;
            case 1:
              setResult('Action');
              break;
            case 3:
              setResult('Animation');
              break;
            case 4:
              setResult('Comedy');
              break;
            case 5:
              setResult('Crime');
              break;
            case 6:
              setResult('Documentary');
              break;
            case 8:
              setResult('Family');
              break;
            case 9:
              setResult('Fantasy');
              break;
            case 10:
              setResult('History');
              break;
            case 12:
              setResult('Music');
              break;
            case 13:
              setResult('Mystery');
              break;
            case 14:
              setResult('Romance');
              break;
            case 15:
              setResult('Science Fiction');
              break;
            case 17:
              setResult('Thriller');
              break;
            case 18:
              setResult('War');
              break;
            case 19:
              setResult('Western');
              break;
            default:
              setResult("");
              break;
          }
        }
        setGenreName(result)


        
      }
      getUserInfo()
    }, []);

  const handleNext = async () => 
  {

    let movieObj = await GetMWGStatusByMWGId(MWGId);
      console.log('handleNextMovieObj')
      console.log(movieObj);
      if(movieObj != null)
      {
        console.log('got obj -> check if true or not')
        console.log(movieObj[0].areAllMembersDoneWithGenre);
        let isMWGDoneWithRanking = movieObj[0].areAllMembersDoneWithGenre;
        if(isMWGDoneWithRanking == true)
        {
          setIsFetching15(true);
          console.log('---addall15 should be fetched')
            let finalMovie = await AddAll15Movies(MWGId, genreId, streamingServiceId);
            console.log(MWGId, genreId, streamingServiceId);
            console.log(finalMovie)
            if(finalMovie)
            {
              navigation.navigate('MovieCard') 
            }else{
              navigation.navigate('LoadingPopcorn') 
            }
         
        }
        else{
          navigation.navigate("UserDashboard")
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
        <View style={{ flex: 1, backgroundColor:'#F5595E', borderRadius:30, width:'92%', marginTop:'8%',marginBottom:'8%', justifyContent:'center',}}>
           
           <View style={{flex:1, justifyContent:'center'}}>
               <Text style={styles.GenreTxt}>{result}</Text>
               <Text style={styles.titleTxt}>was chosen as {'\n'}the genre</Text>
           </View>
            {
              isFetching15 ?  (
                <LottieView
                autoPlay
                style={styles.lottieView}
                source={loadingGif}
              />
              ) : null
            }

 


            
            
            <View style={{flexDirection:'row', flex:0.1}}>

              <View style={[{ flex:0.5, alignItems:'flex-start'}]}>
          {/* <Button uppercase={false} title="button" color='#FFFFFF' mode="text" onPress={() => {navigation.navigate()}}>
              <Text style={styles.nextBtn}> {'\<'} Back </Text>
          </Button> */}
              </View>
              <View style={[{ flex:0.5, alignItems:'flex-end'}]}>
          <Button uppercase={false}  color='#FFFFFF' mode="text" onPress={() => handleNext()}>
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
    fontSize: 72,
    textAlign:'center',
    color: '#FFFFFF',
  },
  lottieView: {
    height: '50%',
    position: 'absolute',
    top: '5.65%',
    left: 0,
    right: 0,
    overflow: 'hidden'
  },
});

export default FinalGenreComponent;
