import { FC, useContext, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, Animated, Alert} from "react-native";
import MovieClipper from "../../assets/MovieClipper.png";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { useNavigation} from '@react-navigation/native';
import UserContext from '../../Context/UserContext';
import { GetMWGById } from '../../Service/DataService'
import girl1 from '../../assets/avatars/girl1.png'
import girl2 from '../../assets/avatars/girl2.png'
import girl3 from '../../assets/avatars/girl3.png'
import girl4 from '../../assets/avatars/girl4.png'
import girl5 from '../../assets/avatars/girl5.png'
import girl6 from '../../assets/avatars/girl6.png'
import boy1 from '../../assets/avatars/boy1.png'
import boy2 from '../../assets/avatars/boy2.png'
import boy3 from '../../assets/avatars/boy3.png'
import boy4 from '../../assets/avatars/boy4.png'
import boy5 from '../../assets/avatars/boy5.png'
import boy6 from '../../assets/avatars/boy6.png'
import {  Button, Avatar } from "react-native-paper";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GetMWGStatusByMWGId, GetMWGStatusByUserId, ResetMWGStatusbyMWGId, DeleteInvitation, AddInvitations, DeleteMemberFromMWG, GetUserByUsername, AddMemberToMWG, DeleteByMWGId} from '../../Service/DataService'
import Magnifying from '../../assets/Magnifying.png';
import ExclamationIcon from '../../assets/ExclamationIcon.png';
import LottieView from 'lottie-react-native';




const StartWatchingBtnsComponent: FC = () => {
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  let { setAllMWG, username, setMWGname, MWGname, setMWGId, MWGId, userIsAdmin, userId, userIsReadyForGenres, userIsReadyForSwipes, userIsReadyToSeeFinalMovie, userIsWaiting } = useContext(UserContext);
  const [membersNames, setMembersNames] = useState<Array<string>>([]);
  const [membersIcons, setMembersIcons] = useState<Array<string>>([]);
  const [mwgCreatorId, setmwgCreatorId] = useState<string>("");
  const [allSearchedNames, setAllSearchedNames] = useState<Array<string>>([]);
  const [searchedName, setSearchedName] = useState<string>('');
  const [searchedMemberIcon, setSearchedMemberIcon] = useState<Array<string>>([]);
  const [currentMWGPastMovies, setCurrentMWGPastMovies] = useState<Array<string>>([]);
  const [currentMWGPastGenres, setCurrentMWGPastGenres] = useState<Array<string>>([]);
  const [mwgStatus, setMWGStatus] = useState<any>([]);
  const [membersIds, setMembersIds] = useState<Array<number>>([]);

  const sleepingPanda = require('../../assets/sleepingPanda.json');
  const smartPanda = require('../../assets/smartPanda.json');



  let row: Array<any> = [];
  let prevOpenedRow: any;
  const icons = new Map([
    ['boy1', boy1],
    ['boy2', boy2],
    ['boy3', boy3],
    ['boy4', boy4],
    ['boy5',boy5],
    ['boy6',boy6],
    ['girl1', girl1],
    ['girl2', girl2],
    ['girl3', girl3],
    ['girl4', girl4],
    ['girl5',girl5],
    ['girl6',girl6],
  ])

  const closeRow = (index: number) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  }

  useEffect( () => {
    async function getUserInfo(){
      //console.log('is user admind',userIsAdmin)
      let movieObj = await GetMWGStatusByMWGId(MWGId);
      setMWGStatus(movieObj[0]);
      //console.log('this is MWGStatus', movieObj)
      //console.log(membersNames)
          setMWGname(MWGname);
          setMWGId(MWGId);
          let mwg = await GetMWGById(MWGId);
          //console.log(mwg)
          let pastMovies = mwg.suggestedMovieNames.split(',');
          let pastGenres = mwg.suggestedMovieGenres.split(',');
          setCurrentMWGPastMovies(pastMovies);
          setCurrentMWGPastGenres(pastGenres);
          setMembersIds(mwg.membersId);
          setMembersNames(mwg.membersNames.split(","));
          setMembersIcons(mwg.membersIcons.split(","));
          setmwgCreatorId(mwg.groupCreatorId);
    }
    getUserInfo()
  }, []);

  const handlePress = () => {
    if(userIsAdmin)
    {
      navigation.navigate('SelectStreamingService')
    }
    if(userIsReadyForGenres)
    {
      navigation.navigate('GenreRanking')
    }
    if(userIsReadyForSwipes && !mwgStatus.haveMoviesBeenFetched)
    {
      navigation.navigate('FinalGenre')
    }
    if(userIsReadyForSwipes && mwgStatus.haveMoviesBeenFetched)
    {
      navigation.navigate('MovieCard')
    }
    if(userIsReadyToSeeFinalMovie)
    {
      navigation.navigate('FinalMovie')
    }
  }

  const handleReset = async () => {
    setModalVisible3(!modalVisible3);
    let result = await ResetMWGStatusbyMWGId(MWGId);
      if(result)
      {
        let userMWG = await GetMWGStatusByUserId(userId);
        setAllMWG(userMWG);
        navigation.navigate('SelectStreamingService')
      }else{
        Alert.alert('Error', 'Cannot Reset');
      }
  }

  const handleDeleteMember = async (member:string, index:number ) => {
    closeRow(index-1);
    let deletedUser = await GetUserByUsername(member);
    if(deletedUser != null)
    {
      let result = await DeleteMemberFromMWG(MWGId, deletedUser.id, member);
      let deleteInvitation = await DeleteInvitation(MWGId, deletedUser.id);
      if(result && deleteInvitation)
      {
        let mwg = await GetMWGById(MWGId);
        if(mwg != null)
        {
          setMembersNames(mwg.membersNames.split(","));
          setMembersIcons(mwg.membersIcons.split(","));
          setMembersIds(mwg.membersId);
        }
      }
    }
  }

      //when user searched a name and presses enter
      const handleKeyPress= async () => {
        let foundUser = await GetUserByUsername(searchedName);

        if (foundUser != null && foundUser.id != 0) {
          if (foundUser.id == userId)
          {
            Alert.alert('You are already included in the group', 'Please search for someone else')
            console.log(membersNames);
          }
          else if(membersNames.includes(searchedName) || membersIds.includes(foundUser.id))
          {
            Alert.alert('The member is already part of this group', 'Please search for someone else')
          }
          else{
            allSearchedNames.push(searchedName);
            setAllSearchedNames([...allSearchedNames]);
           searchedMemberIcon.push(foundUser.icon);
           setSearchedMemberIcon([...searchedMemberIcon]);
          //  let result = await AddMemberToMWG(MWGId, foundUser.id, searchedName)
           let sentResults = await AddInvitations(MWGId, MWGname, allSearchedNames.join(","));
           setModalVisible(!modalVisible)
           setSearchedName('');    
          }
        }
        else
        {
          Alert.alert('User does not exist', 'Please try again')
        }
      }

      const handleDeleteGroup = async () => {
        let result = await DeleteByMWGId(MWGId);
        if(result)
        {
          //console.log(result, 'yes deleted')
          setModalVisible(!modalVisible)
          navigation.navigate('UserDashboard')
        }else{
          alert('nope')
        }
      }
  
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  return (
    <View>
            <View style={{flex:1, height:90, marginTop:'5%', alignItems:'center'}}>
            <Pressable disabled={userIsWaiting && !mwgStatus.haveMoviesBeenFetched ? true : false} style={{width:'90%', alignSelf:'center'}} onPress={() => handlePress()}>
                <View style={styles.wgButton}>
                  <Image source={MovieClipper}></Image>
                  <Text 
                    style={{color:'#E3DDDD', fontSize:24, paddingLeft:60, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>
                      {userIsReadyForGenres ? 'Start ranking genres' : userIsReadyForSwipes && mwgStatus.haveMoviesBeenFetched ? 'Start swiping movies' : userIsReadyForSwipes && !mwgStatus.haveMoviesBeenFetched ? 'Load Movies!' : userIsWaiting ? `Waiting for ${'\n'} others to finish` : userIsAdmin ? 'Start watching' : `Check out the ${'\n'} movie!`}</Text>
                </View>
            </Pressable> 
            </View>
            {
              userId == mwgCreatorId && mwgStatus.areAllMembersDoneWithSwipes ? 
              <View style={{flex:1, height:90, marginTop:'5%', alignItems:'center'}}>
              <Pressable disabled={userIsWaiting ? true : false} style={{width:'90%'}} onPress={() => setModalVisible3(true)}>
                  <View style={styles.ResetBtn}>
                    <Text 
                      style={{color:'#E3DDDD', fontSize:24, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>
                        Start Selecting {'\n'} another Movie</Text>
                  </View>
              </Pressable>
          </View>
            : null
            }
        <View style={{flex:1, height:200, alignItems:'center', marginTop:'4%'}}>
            <View style={[{flex:1, width:'90%'}, styles.LWAMT]}>
                <View style={{flex:0.6, marginTop:'3%'}}>
                  <Text style={{color:'#FFFFFF', fontSize:28, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_600SemiBold'}}>Movies Watched</Text>
                </View>
                      <View style={{flex:1.9,flexDirection:'row', justifyContent:'space-evenly', width:'90%'}}>
                          <View style={{flex:1}}>
                          <View style={{borderBottomWidth:1, borderBottomColor:'#FFFFFF'}}>
                              <Text style={{color:'#FFFFFF', fontSize:25, fontFamily:'Raleway_400Regular', textAlign:'left'}}>Movies</Text>
                            </View>
                              {
                              currentMWGPastMovies.map((item:any, i:number) => 
                              {
                                return (
                                  <Text key={i} style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular', textAlign:'left'}}
                                  ellipsizeMode='tail'
                                  numberOfLines={1}
                                  >{item}</Text>
                                )
                              })
                            } 
                          </View>
                          <View style={{flex:0.5, marginLeft:'5%'}}>
                            <View style={{borderBottomWidth:1, borderBottomColor:'#FFFFFF'}}>
                              <Text style={{color:'#FFFFFF', fontSize:25, fontFamily:'Raleway_400Regular', textAlign:'right'}}>Genres</Text>
                            </View>
                            <View>
                            {
                            currentMWGPastGenres.map((item:any, i:number) => 
                            {
                              return (
                                <Text 
                                  ellipsizeMode='tail'
                                  numberOfLines={1}
                                  key={i} style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular', textAlign:'right'}}>{item}</Text>
                              )
                            })
                          }
                            </View>     
                          </View>
                      </View>
            </View>
        </View>
        <View style={{flex:1,  alignItems:'center', marginTop:'4%', }}>
            <View style={[{flex:1, width:'90%', backgroundColor:'orange'}, styles.LWAMT]}>
                <View style={{flex:.2, marginTop:'3%', }}>
                  <Text style={{color:'#FFFFFF', fontSize:28, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>Group Members</Text>
                </View>
                <View style={{flex:1, height:300,  flexDirection:'row', marginBottom:'4%', width:'80%', justifyContent:'space-evenly', }}>
                    <ScrollView style={{flex:1}}>
                      {/* map thru members here */}
                      {
                        userId == mwgCreatorId ?                             
                        <View style={{alignItems:'center', width:'100%'}}>
                        <View style={[{flexDirection:'row',marginTop:'7%'}]}>
                          <Image source={Magnifying}/>
                              <TextInput
                                style={styles.text}
                                placeholder="Search for a username"
                                placeholderTextColor="#FFFFFF"
                                onChangeText={(e) => setSearchedName(e)}
                                onSubmitEditing={()=> setModalVisible1(true)}
                                value={searchedName}
                              />
                        </View>
                        </View> : null
                      }
                      { userId == mwgCreatorId ? 
                          membersNames.map((member, index) => {
                            const renderRightView = (progress:number, dragX:any) => {
                                const scale = dragX.interpolate({
                                  inputRange: [-100, 0],
                                  outputRange: [0.7, 0],
                                  extrapolate: 'clamp'
                                })
                                return (
                                  <Animated.View
                                    style={{flex:0.6, margin: 0, transform: [{ scale }], alignContent: 'flex-end', justifyContent: 'flex-end', width:100}}
                                    key={member}>
                                    <Button 
                                      uppercase={false} 
                                      mode='contained' 
                                      color='red' 
                                      disabled = {username == member ? true : false}
                                      onPress={() => handleDeleteMember(member, index)} 
                                      style={{height: '50%'}}>
                                        <Text style={{fontSize:24, fontFamily: "Raleway_400Regular",}}>Remove</Text>
                                    </Button>
                                  </Animated.View>
                                )
                              }
                                return (
                                  <Swipeable 
                                    renderRightActions={(progress:any, dragx:any) => renderRightView(progress, dragx)}
                                    ref={(ref) => (row[index] = ref)}
                                    onSwipeableOpen={() => closeRow(index)}
                                    //rightOpenValue={-100}
                                    key={index}>
                                      <View style={[{width:'99%', flexDirection: 'row', alignItems: 'flex-end', paddingBottom: '2%'}, styles.nameLine]}>
                                        <Avatar.Image source={icons.get(membersIcons[index])} style={{alignItems: 'flex-start'}}/>
                                          <Text style={[{color:'white', marginLeft: '10%'}, styles.btnText]}>{member}</Text>
                                      </View>
                                  </Swipeable> 
                                )                                       
                            }) : membersNames.map((member, i) => {
                              return (
                                <View key={i}style={[{width:'99%', flexDirection: 'row', alignItems: 'flex-end', paddingBottom: '2%'}, styles.nameLine]}>
                                    <Avatar.Image source={icons.get(membersIcons[i])} style={{alignItems: 'flex-start'}}/>
                                    <Text style={[{color:'white', marginLeft: '10%'}, styles.btnText]}>{member}</Text>
                                </View>
                              )
                            })
                      }
                      </ScrollView>
                </View>
            </View>
        </View>
        {
          userId == mwgCreatorId ?  
          <View style={{flex:1, height:50, marginTop:'5%', alignItems:'center', marginBottom: '5%'}}>
            <Pressable disabled={userIsWaiting ? true : false} style={{width:'70%'}} onPress={() => setModalVisible(true)}>
                <View style={styles.wgButton}>
                  <Text style={{color:'#E3DDDD', fontSize:24,justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>Delete Watch Group</Text>
                </View>
            </Pressable>
          </View>
           : null
        }
        {/* Modal for Deleting Groups*/}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <LottieView
                autoPlay
                style={styles.lottieView}
                source={sleepingPanda}
              />
            <Text style={styles.modalText}>Are you sure you want to {'\n'} delete {MWGname}?</Text>
            <View style={{flexDirection:'row', width:'90%', justifyContent:'space-evenly'}}>

            <Pressable
              style={[styles.button, styles.buttonClose1]}
              onPress={() => handleDeleteGroup()}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>No</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
        {/* Modal for Reset MWG*/}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible3(!modalVisible3);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <LottieView
                autoPlay
                style={styles.lottieView}
                source={smartPanda}
              />
            <Text style={styles.modalText}>Are you sure you want to {'\n'} reset {MWGname}?</Text>
            <View style={{flexDirection:'row', width:'90%', justifyContent:'space-evenly'}}>
            <Pressable
              style={[styles.button, styles.buttonClose1]}
              onPress={() => handleReset()}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible3(!modalVisible3)}
            >
              <Text style={styles.textStyle}>No</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
        {/* Modal for Adding Members*/}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible1(!modalVisible1);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={ExclamationIcon} style={{width:50, height:50, marginBottom:'5%'}}/>
            <Text style={styles.modalText}>Are you sure you want to invite {'\n'} {searchedName}?</Text>
            <View style={{flexDirection:'row', width:'90%', justifyContent:'space-evenly'}}>
            <Pressable
              style={[styles.button, styles.buttonClose1]}
              onPress={() => handleKeyPress()}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible1(!modalVisible1)}
            >
              <Text style={styles.textStyle}>No</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
       </View>
  );
};

export default StartWatchingBtnsComponent;

const styles = StyleSheet.create({
    lottieView:{
      height:150,
      bottom:'3%',
    },
    nameLine:{
      flex:1,
      borderBottomColor: '#707070',
      borderBottomWidth: 1,
      marginTop:'10%',
    },
  wgButton: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor:'#FF2E35BA',
    backgroundColor:'#FF2E35BA',
    borderRadius: 25,
    alignItems:'center',
    justifyContent:'center',
    height:'100%',
  },
  wgButton2: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor:'#FF2E35BA',
    backgroundColor:'#FF2E35BA',
    borderRadius: 25,
    alignItems:'center',
    justifyContent:'center',
    height:'100%',
  },
  ResetBtn: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor:'#FF2E35BA',
    backgroundColor:'#FF2E35BA',
    borderRadius: 25,
    alignItems:'center',
    justifyContent:'space-evenly',
    height:'100%',
  },
  LWAMT: {
    borderWidth: 2,
    borderColor:'#4D4A4AD1',
    backgroundColor:'#4D4A4AD1',
    borderRadius: 25,
    alignItems:'center',
    justifyContent:'center',
    height:'100%',
  },
  InviteMWG: {
    borderWidth: 2,
    borderColor:'#DC1B21C6',
    backgroundColor:'#DC1B21C6',
    borderRadius: 15,
    alignItems:'center',
    justifyContent:'center',
    height:'50%',
    width:'55%'
  },
  btnText:{
    fontFamily: "Raleway_400Regular",
    fontSize: 25,
  },
  container1: {
    flex: 0,
    alignItems: "center",
    backgroundColor:'pink'
  },
  text: {
    fontFamily: "Raleway_400Regular",
    fontSize: 20,
    width:'80%',
    marginLeft:"5%",
    color:'#FFFFFF'
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    margin: 20,
    backgroundColor: "#C4C4C4",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width:'30%',
    elevation: 2,
    marginTop:'5%'
  },

  buttonClose: {
    backgroundColor: "red",
  },
  buttonClose1: {
    backgroundColor: "green",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Raleway_400Regular",
    fontSize: 17,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Raleway_400Regular",
    fontSize: 21,
    lineHeight:37,
    color:'#383333'
  }
});
