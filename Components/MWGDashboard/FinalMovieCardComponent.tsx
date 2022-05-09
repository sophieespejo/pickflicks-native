import { FC, useEffect, useContext, useState} from 'react';
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold} from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../Context/UserContext';
import { GetMoviesByMWGId, GetMWGById} from '../../Service/DataService'
  


const FinalMovieCardComponent: FC = () => {
    const navigation = useNavigation();
    let {  MWGname, MWGId, setMWGId, userId, setUserId , listOfMovieNamesUsedToCompare1, setListOfMovieNamesUsedToCompare1 } = useContext(UserContext);
    const [displayMovie, setDisplayMovie] = useState<string>("");
    const [displayObject, setDisplayObject] = useState<any>({});

    useEffect( () => {
      async function getTopMovie(){
        // setListOfMovieNamesUsedToCompare1(listOfMovieNamesUsedToCompare1);
        // let result = await GetTopMovieByMWGId(MWGId);
        // console.log('Top Movie Index:', result)
        // let finalMovieIndexBackEnd = await AddFinalMovieIndex(MWGId, result);
        // console.log(finalMovieIndexBackEnd);
        // console.log('Added FinalMovieIndex to BackEnd success')
        let result = await GetMWGById(MWGId);


        // let finalMovie = listOfMovieNamesUsedToCompare1[result];
        // setDisplayMovie(finalMovie);
        // console.log(finalMovie);

        //need to fetch movie summary and ratings
        let movieResults = await GetMoviesByMWGId(MWGId);
        setDisplayObject(movieResults[result.finalMovieIndex]);
        console.log(movieResults[result.finalMovieIndex])
      }
      getTopMovie()
    }, []);



  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
      <View style={{flex: 1, alignItems:'center'}}>
        <View style={{ flex: 1, backgroundColor:'#BEB85B', borderRadius:30, width:'92%', marginTop:'8%', marginBottom:'8%', justifyContent:'center', 
                    borderWidth: 3, borderColor:'#E6D260'}}>
           <View>
               <Text style={styles.titleTxtBold}> {MWGname}'s {'\n'} Movie is</Text>
               <View style={{marginTop:'3%'}}>
                <Text style={styles.titleTxtBold}> {displayObject.movieName} </Text>
               </View>
           </View>


            <View style={{flex:1, alignItems:'center'}}>
                <View style={{flex:2, alignItems:'center'}}>
                    <Image style={{width:340, height:250, borderRadius:21, marginTop:'5%'}} source={{
          uri: displayObject.movieImage,
        }}></Image>
                </View>
                <View style={{flex:1.2, alignItems:'center'}}>
                    <Text numberOfLines={3} ellipsizeMode='tail' style={styles.titleTxt}>{displayObject.movieOverview}</Text>
                    <Text style={styles.titleTxt}>Critics Ratings: {displayObject.movieIMDBRating}</Text>
                </View>
            </View>


        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  titleTxt:{
      fontFamily:'Raleway_400Regular',
      fontSize: 22,
      textAlign:'center',
      marginTop:'4%',
      color: '#524C4C',
  },
  titleTxtBold:{
      fontFamily:'Raleway_600SemiBold',
      fontSize: 35,
      textAlign:'center',
      marginTop:'4%',
      color: '#524C4C',
      fontWeight:'600'
  },
  nextBtn:{
    fontFamily: "Raleway_400Regular",
    fontSize: 25
  },
  GenreTxt:{
    fontFamily:'Raleway_400Regular',
    fontSize: 45,
    textAlign:'center',
    color: '#FFFFFF',
  }
});

export default FinalMovieCardComponent;
