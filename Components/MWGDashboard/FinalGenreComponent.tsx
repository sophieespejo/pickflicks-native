import { FC, useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { AddAll15Movies, GetMWGStatusByMWGId, GetTopRankedGenre, AddFinalGenre, UpdateHaveMoviesBeenFetched } from '../../Service/DataService'
import UserContext from '../../Context/UserContext';
import loadingGif from '../../assets/36292-loader-movie.json'
import LottieView from 'lottie-react-native';





const FinalGenreComponent: FC = () => {
  const navigation = useNavigation<any>();
  let { genreId, streamingServiceId, setStreamingServiceId, setGenreName, setGenreId, MWGname, setMWGname, MWGId, setMWGId } = useContext(UserContext)
  const [result, setResult] = useState("");
  const [isFetching15, setIsFetching15] = useState(false);


  useEffect(() => {
    async function getUserInfo() {
      setStreamingServiceId(streamingServiceId);
      setMWGname(MWGname);
      setMWGId(MWGId);
      let finalGenre = await GetTopRankedGenre(MWGId);
      let genreString = "";

      if (finalGenre != null) {
        setGenreId(finalGenre);
        switch (finalGenre) {
          case 10:
            genreString = 'Horror';
            break;
          case 7:
            genreString = 'Drama';
            break;
          case 1:
            genreString = 'Action';
            break;
          case 3:
            genreString = 'Animation';
            break;
          case 4:
            genreString = 'Comedy';
            break;
          case 5:
            genreString = 'Crime';
            break;
          case 6:
            genreString = 'Documentary';
            break;
          case 8:
            genreString = 'Family';
            break;
          case 9:
            genreString = 'Fantasy';
            break;
          case 10:
            genreString = 'History';
            break;
          case 12:
            genreString = 'Music';
            break;
          case 13:
            genreString = 'Mystery';
            break;
          case 14:
            genreString = 'Romance';
            break;
          case 15:
            genreString = 'Science Fiction';
            break;
          case 17:
            genreString = 'Thriller';
            break;
          case 18:
            genreString = 'War';
            break;
          case 19:
            genreString = 'Western';
            break;
          default:
            setResult("");
            break;
        }
        setResult(genreString);
        setGenreName(genreString);
      }
      let finalGenreBackEnd = await AddFinalGenre(MWGId, genreString);

    }
    getUserInfo()
  }, []);

  const handleNext = async () => {
    let movieObj = await GetMWGStatusByMWGId(MWGId);
    if (movieObj != null) {
      let isMWGDoneWithRanking = movieObj[0].areAllMembersDoneWithGenre;
      if (isMWGDoneWithRanking == true) {
        setIsFetching15(true);
        let finalMovie = await AddAll15Movies(MWGId, genreId, streamingServiceId);
        await UpdateHaveMoviesBeenFetched(MWGId);

        if (finalMovie) {
          navigation.navigate('MovieCard')
        }
        else {
          alert("Movies are loading, please wait.")
        }
      }
      else {
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
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ flex: 1, backgroundColor: '#F5595E', borderRadius: 30, width: '92%', marginTop: '8%', marginBottom: '8%', justifyContent: 'center', }}>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.GenreTxt}>{result}</Text>
          <Text style={styles.titleTxt}>was chosen as {'\n'}the genre</Text>
        </View>
        {
          isFetching15 ? (
            <LottieView
              autoPlay
              style={styles.lottieView}
              source={loadingGif}
            />
          ) : null
        }
        <View style={{ flexDirection: 'row', flex: 0.1 }}>
          <View style={[{ flex: 0.5, alignItems: 'flex-start' }]}>
          </View>
          <View style={[{ flex: 0.5, alignItems: 'flex-end' }]}>
            <Button uppercase={false} color='#FFFFFF' mode="text" onPress={() => handleNext()}>
              <Text style={styles.nextBtn}>Next {'\>'}</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleTxt: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 30,
    textAlign: 'center',
    marginTop: '4%',
    color: '#FFFFFF',
  },
  nextBtn: {
    fontFamily: "Raleway_400Regular",
    fontSize: 25
  },
  numberScale: {
    fontFamily: "Raleway_400Regular",
    fontSize: 35,
    color: '#FFFFFF'
  },
  GenreTxt: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 72,
    textAlign: 'center',
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
