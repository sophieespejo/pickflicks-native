import { FC, useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { Slider } from "native-base";
import UserContext from '../../Context/UserContext';
import { GetMWGById } from '../../Service/DataService'



const SelectedGenreComponent2: FC = () => {
  const navigation = useNavigation<any>();
  let { MWGname, setMWGname, MWGId, setMWGId, MWGgenres, setMWGgenres, setGenre2 } = useContext(UserContext)
  const [onChangeValue, setOnChangeValue] = useState(10);



  useEffect(() => {
    async function getUserInfo() {
      setMWGname(MWGname);
      setMWGId(MWGId);
      let movieObj = await GetMWGById(MWGId);
      if (movieObj != null) {
        let genreString = movieObj.chosenGenres.split(",");
        setMWGgenres(genreString);
      }

    }
    getUserInfo()
  }, []);

  const onNextPress = async () => {
    setGenre2(onChangeValue);
    navigation.navigate("GenreRanking3");
  }



  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ flex: 1, backgroundColor: '#DC1B21C4', borderRadius: 30, width: '92%', marginTop: '8%', marginBottom: '8%', justifyContent: 'center' }}>
        <View style={{ flex: 0.2 }}>
          <Text style={styles.titleTxt}>Top 3 Genres</Text>
          <Text style={styles.GenreTxt1}>Use the slider to rank the genre displayed below</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', marginBottom: '15%' }}>
          <View style={{ marginTop: '10%', flex: 1 }}>
            <Text style={styles.GenreTxt}>{MWGgenres[1]}</Text>
          </View>
          <View style={{ justifyContent: 'flex-start' }}>
            <Text style={[styles.scoreTxt]}>{Math.floor(onChangeValue / 10)}</Text>
          </View>
          <Slider
            style={{ marginTop: '8%', flex: 1 }}
            colorScheme="gray" w="3/4"
            maxW="300"
            defaultValue={10}
            minValue={10}
            maxValue={50}
            accessibilityLabel="Rank the Genre from 1 to 5"
            step={1}
            onChange={v => {
              setOnChangeValue(Math.floor(v))
            }}>
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
            <Text style={styles.numberScale}>1</Text>
            <Text style={styles.numberScale}>5</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
            <Text style={styles.LowHighTxt}>Lowest</Text>
            <Text style={styles.LowHighTxt}>Highest</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[{ flex: 0.5, alignItems: 'flex-start' }]}>
            <Button uppercase={false} color='#FFFFFF' mode="text" onPress={() => { navigation.navigate("ChooseGenres") }}>
              <Text style={styles.nextBtn}> {'\<'} Back </Text>
            </Button>
          </View>
          <View style={[{ flex: 0.5, alignItems: 'flex-end' }]}>
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
  titleTxt: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 30,
    textAlign: 'center',
    marginTop: '4%',
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  scoreTxt: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 100,
    textAlign: 'center',
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
  LowHighTxt: {
    fontFamily: "Raleway_400Regular",
    fontSize: 20,
    color: '#FFFFFF'
  },
  GenreTxt: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 45,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  GenreTxt1: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    marginTop: '1%',
    marginLeft: '5%',
    marginRight: '5%'
  }
});

export default SelectedGenreComponent2;
