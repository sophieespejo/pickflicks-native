import { FC, useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Pressable } from "react-native";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
import X from '../../assets/X.png';
import {AddChosenGenres, UpdateIsStartedByMWGId} from '../../Service/DataService'
import UserContext from "../../Context/UserContext";


  
type RootStackParamList = {
  Home: undefined; //means route doesnt have params
    //UserDashboard: { username: string, userId: number };
    UserDashboard: undefined;
  Login: undefined
  CreateAccountScreen: undefined,
  Loading: undefined,
  AvatarScreen: undefined
  Introduction: undefined,
  SelectStreamingService: undefined
  NewMWGName: undefined,
  MemberSearch: { username: string, userId: number, newMWGname: string },
  InvitationSent: { username: string, userId: number},
  ChooseGenres : undefined,
  GenreRanking: undefined,
  FinalGenre : undefined,
  MovieCard : undefined,
  FinalMovie : undefined,
  MWGDashboard : undefined,
  LoadingPopcorn : undefined,
  UserProfile : undefined,
  ChangeUsername :undefined,
  ChangePassword1 : undefined,
  ChangePassword2 : undefined,
  ChangeNotifications : undefined,
  TutorialMovieCard : undefined,
}

const GenreSelectionComponent2: FC = () => {
  let { userId, setUserId, setMWGname, MWGname, setMWGId, MWGId, setGenreId } = useContext(UserContext);

  useEffect( () => {
    async function getUserInfo(){
          setUserId(userId)
          setMWGname(MWGname);
          setMWGId(MWGId);
    }
    getUserInfo()
  }, []);



    const navigation = useNavigation<any>();
    const [selectedGenres, setSelectedGenres] = useState<any>([])
    const [selectedId, setSelectedId] = useState(null);

    const DATA = [
      {
        title: 'Drama',
        id: 'Drama',
      },
      {
        title: 'Action',
        id: 'Action',
      },
      // {
      //   title: 'Action & Adventure',
      //   id: 'Action & Adventure',
      // },
      // {
      //   title: 'Adult',
      //   id: 'Adult',
      // },
      {
        title: 'Animation',
        id: 'Animation',
      },
      // {
      //   title: 'Anime',
      //   id: 'Anime',
      // },
      // {
      //   title: 'Biography',
      //   id: 'Biography',
      // },
      {
        title: 'Comedy',
        id: 'Comedy',
      },
      {
        title: 'Crime',
        id: 'Crime',
      },
      {
        title: 'Documentary',
        id: 'Documentary',
      },
      {
        title: 'Family',
        id: 'Family',
      },
      {
        title: 'Fantasy',
        id: 'Fantasy',
      },
      {
        title: 'History',
        id: 'History',
      },
      {
        title: 'Horror',
        id: 'Horror',
      },
      // {
      //   title: 'Kids',
      //   id: 'Kids',
      // },
      {
        title: 'Mystery',
        id: 'Mystery',
      },
      {
        title: 'Music',
        id: 'Music',
      },
      {
        title: 'Romance',
        id: 'Romance',
      },
      // {
      //   title: 'Sci-Fi & Fantasy',
      //   id: 'Sci-Fi & Fantasy',
      // },
      {
      title: 'Science Fiction',
      id: 'Science Fiction',
      },
      // {
      //   title: 'Sports',
      //   id: 'Sports',
      // },
      // {
      //   title: 'Supernatural',
      //   id: 'Supernatural',
      // },
      {
        title: 'Thriller',
        id: 'Thriller',
      },
      {
        title: 'War',
        id: 'War',
      },
      {
        title: 'Western',
        id: 'Western',
      },
    ]


    const addGenre = (id:any) => {
        if(selectedGenres.length < 3 && !selectedGenres.includes(id))
        {
            selectedGenres.push(id);
            setSelectedGenres([...selectedGenres]);
        }else{
            alert("no thanks")
        }
    }

    const removeGenre = (id:any) => {
        selectedGenres.splice(selectedGenres.indexOf(id), 1)
        setSelectedGenres([...selectedGenres])
    }

    const Item = ({ item, onPress }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item]}>
          <Text style={[styles.titleTxt]}>{item.title}</Text>
        </TouchableOpacity>
      );
      

    const renderItem = ({item} : any)=> {
        return (
                <Item
                  item={item}
                  onPress={() => addGenre(item.id)}
                />
        )

    }

    //have admin create new instance of GR model here to get ID number incremented and then on next screen set ID as sessionID number?
    const onNext = async (MWGId:number, chosenGenres:string) => {
      let result = await AddChosenGenres(MWGId, chosenGenres);
        let result1 = await UpdateIsStartedByMWGId(MWGId)
        if(result1)
        {
          navigation.navigate("GenreRanking");
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
            <View style={{flex:0, paddingBottom:0}}>
                <Text style={styles.titleTxt}>Choose 5 Genres to rank</Text>
            </View>
            <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around'}}>
              {
                  selectedGenres.map((genre:object, i:number) => {
                      return (
                          <View key={i} style={{flexDirection:'row'}}>
                              <Text style={styles.selectedTxt}>{genre}</Text>
                              <Pressable onPress={() => removeGenre(genre)} style={{justifyContent:'center'}}>
                                <Image source={X} style={{height:20, width:20}}/>
                              </Pressable>
                          </View>
                      )
                  })
              }
            </View>
                            

              <View style={{flex:1, alignItems: 'center', marginTop:'10%'}}>
                <View>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId} />
                </View>
              </View>
             <View style={{flexDirection:'row'}}>
               <View style={[{ flex:0.5, alignItems:'flex-start'}]}>
           <Button uppercase={false}  color='#FFFFFF' mode="text" onPress={() => console.log(selectedGenres)}>
               <Text style={styles.nextBtn}>{'\<'} Back </Text>
           </Button>
               </View>
               <View style={[{ flex:0.5, alignItems:'flex-end'}]}>
           <Button uppercase={false}  color='#FFFFFF' mode="text" onPress={() => {onNext(MWGId, selectedGenres.join(','))}}>
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
      marginBottom:7,
      color: '#FFFFFF',
  },
  selectedTxt:{
      fontFamily:'Raleway_400Regular',
      fontSize: 30,
      textAlign:'center',
      color: 'gray',
      paddingRight:'3%'
  },
  Dropdown:{
      borderRadius:25,
      width:'90%',
      fontFamily:'Raleway_400Regular'
  },
  nextBtn:{
    fontFamily: "Raleway_400Regular",
    fontSize: 25
  },
  kMultiOptionContainerStyle : {
    flexDirection: 'row',
    //flexWrap:'wrap',
    borderRadius: 20,
    paddingVertical: 5,
    paddingRight: 5,
    paddingLeft: 10,
    marginRight: 4,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkslategray',
    //...multiOptionContainerStyle,
  },
  kMultiOptionsLabelStyle:  {
    fontSize: 10,
    color: '#fff',
  },
  kContainerStyle : {
    flexDirection: 'row',
    //flexWrap: 'wrap', 
    borderColor: '#ddd',
    borderBottomWidth: 1,
    paddingTop: 6,
    paddingRight: 20,
    paddingBottom: 8, 
    }
})

export default GenreSelectionComponent2;
