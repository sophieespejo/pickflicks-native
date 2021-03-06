import { FC, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, Platform, Pressable } from "react-native";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { suggestedMovieGenres, suggestedMovieNames, GetMoviesByMWGId, GetMWGById } from '../../Service/DataService';



const FinalMovieCardComponent: FC = () => {
  const navigation = useNavigation<any>();
  let { displayObject, setDisplayObject, setDevice, device, MWGId } = useContext(UserContext);

  useEffect(() => {
    async function getTopMovie() {
      const UserDevice = await AsyncStorage.getItem('@storage_UserDevice')
      setDevice(UserDevice);
      let result = await GetMWGById(MWGId);

      let movieResults = await GetMoviesByMWGId(MWGId);
      setDisplayObject(movieResults[result.finalMovieIndex]);

      if (!result.suggestedMovieNames.split(',').includes(movieResults[result.finalMovieIndex].movieName)) {
        let addToPastMovies = await suggestedMovieNames(MWGId, movieResults[result.finalMovieIndex].movieName);
        let addToPastGenres = await suggestedMovieGenres(MWGId, result.finalGenre);
      }
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
    <Pressable onPress={() => navigation.navigate("UserDashboard")} style={{ flex: 1, alignItems: 'center' }}>
      <View style={{
        flex: 1, backgroundColor: '#1761B0', borderRadius: 30, width: '92%', marginTop: '8%', marginBottom: '8%', justifyContent: 'center',
        borderWidth: 3, borderColor: 'goldenrod'
      }}>
        <View style={{ flex: 0.7, alignSelf: 'center', width: '80%' }}>
          <Text style={styles.titleTxtBold}> {displayObject.movieName} </Text>
        </View>
        <View style={{ flex: 2, alignItems: 'center' }}>
          {
            Platform.OS == 'ios' ? <Image style={{ width: 340, height: 300, borderRadius: 21 }} source={{
              uri: displayObject.movieImage,
            }}></Image> :
              Platform.OS == 'android' ? <Image style={{ width: 340, height: 260, borderRadius: 21, marginTop: '3%' }} source={{
                uri: displayObject.movieImage,
              }}></Image> : null
          }
        </View>
        <View style={{ flex: 1.2, alignItems: 'center' }}>
          <Text numberOfLines={device == 'ios' ? 4 : device == 'android' ? 3 : 4} ellipsizeMode='tail' style={styles.titleTxt}>{displayObject.movieOverview}</Text>
          <Text style={styles.titleTxt}>Critics Ratings: {displayObject.movieIMDBRating}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  titleTxt: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 22,
    textAlign: 'center',
    marginTop: '4%',
    color: '#FFFFFF',
  },
  titleTxtBold: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 35,
    textAlign: 'center',
    marginTop: '4%',
    color: '#FFFFFF',
    fontWeight: '600'
  },
  nextBtn: {
    fontFamily: "Raleway_400Regular",
    fontSize: 25
  },
  GenreTxt: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 45,
    textAlign: 'center',
    color: '#FFFFFF',
  }
});

export default FinalMovieCardComponent;
