import { NavigationRouteContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useState, useEffect, useContext, useCallback, useRef } from 'react';
import { StyleSheet, Text, View , Image, Animated, PanResponder} from 'react-native';
import RedLogo from '../assets/RedLogo.png';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import StreamingServiceComponent from '../../Components/MWGDashboard/StreamingServiceComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
//import GenreSelectionComponent from '../../Components/MWGDashboard/GenreSelectionComponent';
import MovieCardComponent from '../../Components/MWGDashboard/MovieCardComponent';
//import { Provider as PaperProvider } from 'react-native-paper';
import UserContext from '../../Context/UserContext';
import { GetMoviesByMWGId, AddLikeOrDislike, GetTopMovieByMWGId} from '../../Service/DataService'
import {ACTION_OFFSET, CARD} from "../../Components/Utilities/Utility"
import {useNavigation} from '@react-navigation/native';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';






type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    UserDashboard: { username: string, userId: number }
    Login: { name: string }
    CreateAccountScreen: undefined,
    Loading: undefined,
    AvatarScreen: undefined
    Introduction: undefined,
    SelectStreamingService: undefined
    NewMWGName: { username: string, userId: number },
    MemberSearch: { username: string, userId: number, newMWGname: string },
    InvitationSent: { username: string, userId: number};
    ChooseGenres : undefined,
    GenreRanking: undefined,
    MovieCard : undefined,

  }

type Props = NativeStackScreenProps<RootStackParamList, 'MovieCard'>;

const MovieCardScreen: FC<Props> = () => {
  const navigation = useNavigation<any>();
  let {  MWGId, setMWGId, userId, setUserId, listOfMovieNamesUsedToCompare1, setListOfMovieNamesUsedToCompare1 } = useContext(UserContext)
  const [allMovies, setAllMovies] = useState<any>([])
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  const [currentMovieName, setCurrentMovieName] = useState("");
  const [allVotes, setAllVotes] = useState<Array<string>>([]);
  const [listOfMovieNamesUsedToCompare, setListOfMovieNamesUsedToCompare] = useState<any>([]);


  useEffect( () => {
    async function getUserInfo(){
      setMWGId(MWGId);
      setUserId(userId);
      let allFetchedMovies = await GetMoviesByMWGId(MWGId);
      if(allFetchedMovies != null)
      {
        setAllMovies(allFetchedMovies)
      }
      
    }
    getUserInfo()
  }, []);

  const swipeLeft = async (currentMovie:any) => {
    console.log("swipe left",typeof(currentMovie), "0",  allMovies.length);
    listOfMovieNamesUsedToCompare.push(currentMovie);
    allVotes.push("0");
    setAllVotes([...allVotes]);
    setListOfMovieNamesUsedToCompare([...listOfMovieNamesUsedToCompare]);
    setListOfMovieNamesUsedToCompare1(listOfMovieNamesUsedToCompare);
    if(allMovies.length == 1)
    {
      let newVotes = {
        Id: 0, 
        SessionId: 0,
        MWGId: MWGId,
        UserId: userId,
        LikesDislikesIndexValues: allVotes.join(",")

      }
      //i think we need to have a check if everyone has done it before we navigate to the FinalMovie Screen
      let result = await AddLikeOrDislike(newVotes);
      if(result)
      {
        console.log(allVotes.join(","));
        console.log(result);
        console.log(newVotes);
        console.log(listOfMovieNamesUsedToCompare)
        navigation.navigate("FinalMovie");
      }
    }
  }
  const swipeRight = async (currentMovie:any) => {
    console.log("swipe right",currentMovie, "1", allMovies.length);
    listOfMovieNamesUsedToCompare.push(currentMovie);
    setListOfMovieNamesUsedToCompare([...listOfMovieNamesUsedToCompare]);
    setListOfMovieNamesUsedToCompare1(listOfMovieNamesUsedToCompare);

    allVotes.push("1");
    setAllVotes([...allVotes]);
    if(allMovies.length == 1)
    {
      let newVotes = {
        Id: 0, 
        SessionId: 0,
        MWGId: MWGId,
        UserId: userId,
        LikesDislikesIndexValues: allVotes.join(",")

      }
      
      //i think we need to have a check if everyone has done it before we navigate to the FinalMovie Screen
      let result = await AddLikeOrDislike(newVotes);
      if(result)
      {
        console.log(allVotes.join(","));
        console.log(result);
        console.log(newVotes);
        console.log(listOfMovieNamesUsedToCompare)
        navigation.navigate("FinalMovie");
      }
    }
  }

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;

      if (isActionActive) {
        dx > 0 ? swipeRight(currentMovieName) : swipeLeft(currentMovieName);
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setAllMovies((prevState:any) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleChoice = useCallback(
    (direction) => {
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCREEN,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x]
  );


    return (
      <View style={styles.container1}>

        <HeaderComponent/>
    <View style={styles.container}>
        {
          allMovies.map((movie:any, i:number) => {
            const isFirst = i === 0;
            const panHandlers = isFirst ? panResponder.panHandlers : {};
            return (
              <MovieCardComponent 
                movie={movie}
                key={i}
                isFirst={isFirst}
                swipe={swipe}
                tiltSign={tiltSign}
                setCurrentMovieName={setCurrentMovieName}
                {...panHandlers}
                />
            )
          }).reverse()
        }
    </View>
        <FooterNavComponent/>
      </View>
    )
}

export default MovieCardScreen;

const styles = StyleSheet.create({
    container:{

        flex: 1,
        backgroundColor: '#1E1A1A',
        alignItems: 'center',

    },
    container1:{

        flex: 1,
        backgroundColor: '#1E1A1A',
    },
  });
  