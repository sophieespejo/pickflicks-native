import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState, useCallback } from "react";
import { StyleSheet, Text, View, Image, TextInput, Animated} from "react-native";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold} from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
import JJKMovie from '../../assets/JJKMovie.jpg'
import Choice  from '../Utilities/Choice'
import { ACTION_OFFSET, CARD } from '../Utilities/Utility'
// import { Button } from "native-base";
  

interface IMovieCardComponent {
  movie: object,
  children: React.ReactNode;
}

const MovieCardComponent: FC = ({movie, isFirst, swipe, tiltSign, ...rest}) => {
    const navigation = useNavigation<any>();


    const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
      inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
      outputRange: ['8deg', '0deg', '-8deg'],
    });
  
    const likeOpacity = swipe.x.interpolate({
      inputRange: [25, ACTION_OFFSET],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
  
    const nopeOpacity = swipe.x.interpolate({
      inputRange: [-ACTION_OFFSET, -25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
  
    const animatedCardStyle = {
      transform: [...swipe.getTranslateTransform(), { rotate }],
    };
  
    const renderChoice = useCallback(() => {
      return (
        <>
          <Animated.View
            style={[
              styles.choiceContainer,
              styles.likeContainer,
              { opacity: likeOpacity },
            ]}
          >
            <Choice type="like" />
          </Animated.View>
          <Animated.View
            style={[
              styles.choiceContainer,
              styles.nopeContainer,
              { opacity: nopeOpacity },
            ]}
          >
            <Choice type="nope" />
          </Animated.View>
        </>
      );
    }, [likeOpacity, nopeOpacity]);

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <Animated.View
        style={[styles.container, isFirst && animatedCardStyle]}
        {...rest}>
      <View style={{flex: 1, alignItems:'center'}}>
        <View style={{ flex: 1, backgroundColor:'#4D4A4A', borderRadius:30, width:'92%', marginTop:'8%', marginBottom:'8%', justifyContent:'center', 
                    borderWidth: 3, borderRightColor:'#1BDC62C4', borderLeftColor:'#DC1B21', borderTopColor:'#1BDC62C4', borderBottomColor:'#DC1B21'}}>
            <View style={{flex:1, alignItems:'center'}}>
                <View style={{flex:3, alignItems:'center'}}>
                    <Image style={{width:340, height:280, borderRadius:21, marginTop:'9%'}} source={{uri: movie.movieImage}}></Image>
                </View>
                <View style={{flex:3, alignItems:'center', justifyContent:'space-around'}}>
                    <Text style={styles.titleTxtBold}>{movie.movieName}</Text>
                    <Text style={styles.titleTxt}>{movie.movieOverview}</Text>
                    <Text style={styles.titleTxt}>{movie.movieIMDBRating}</Text>
                </View>
            </View>


        </View>
      </View>
      {isFirst && renderChoice()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  titleTxt:{
      fontFamily:'Raleway_400Regular',
      fontSize: 22,
      textAlign:'center',
      marginTop:'4%',
      color: '#EBE1E1',
  },
  titleTxtBold:{
      fontFamily:'Raleway_600SemiBold',
      fontSize: 40,
      textAlign:'center',
      marginTop:'4%',
      color: '#EBE1E1',
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
  },
  container: {
    position: 'absolute',
    top: 45,
  },
  image: {
    width: CARD.WIDTH,
    height: CARD.HEIGHT,
    borderRadius: CARD.BORDER_RADIUS,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    borderRadius: CARD.BORDER_RADIUS,
  },
  name: {
    position: 'absolute',
    bottom: 22,
    left: 22,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  choiceContainer: {
    position: 'absolute',
    top: 100,
  },
  likeContainer: {
    left: 45,
    transform: [{ rotate: '-30deg' }],
  },
  nopeContainer: {
    right: 45,
    transform: [{ rotate: '30deg' }],
  },
});

export default MovieCardComponent;
