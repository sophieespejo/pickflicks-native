import { FC } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import Popcorn from '../../assets/Popcorn.gif'



const LoadingPopcornGifComponent: FC = () => {

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{
        flex: 1, backgroundColor: '#FFFFFF', borderRadius: 30, width: '92%', marginTop: '8%', marginBottom: '8%', justifyContent: 'center',
        borderWidth: 3
      }}>
        <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: '100%', height: '100%', borderRadius: 30 }} source={Popcorn}></Image>
        </View>
        <View style={{ flex: 1.5, alignItems: 'center', marginTop: '4%' }}>
          <Text style={styles.Txt}>Please wait for someone to set {'\n'} up the movie..</Text>
          <Text style={[styles.Txt2, { paddingTop: '10%' }]}>Get the popcorn {'\n'} ready!</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleTxt: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 22,
    textAlign: 'center',
    marginTop: '4%',
    color: '#EBE1E1',
  },
  titleTxtBold: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 40,
    textAlign: 'center',
    marginTop: '4%',
    color: '#EBE1E1',
    fontWeight: '600'
  },
  nextBtn: {
    fontFamily: "Raleway_400Regular",
    fontSize: 25
  },
  Txt: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 40,
    textAlign: 'center',
    color: '#524C4C',
  },
  Txt2: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 35,
    textAlign: 'center',
    color: '#524C4C',
  }
});

export default LoadingPopcornGifComponent;
