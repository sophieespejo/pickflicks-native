import { FC, useContext, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, Animated, Alert} from "react-native";
import MovieClipper from "../../assets/MovieClipper.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
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
import { DeleteInvitation, AddInvitations, DeleteMemberFromMWG, GetUserByUsername, AddMemberToMWG, DeleteByMWGId} from '../../Service/DataService'
import Magnifying from '../../assets/Magnifying.png';
import ExclamationIcon from '../../assets/ExclamationIcon.png';
import LottieView from 'lottie-react-native';




const StartWatchingBtnsComponent: FC = () => {
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  let { username, setMWGname, MWGname, setMWGId, MWGId, userIsAdmin, userId, userIsReadyForGenres, userIsReadyForSwipes, userIsReadyToSeeFinalMovie, userIsWaiting } = useContext(UserContext);
  const [membersNames, setMembersNames] = useState<Array<string>>([]);
  const [membersIcons, setMembersIcons] = useState<Array<string>>([]);
  const [mwgCreatorId, setmwgCreatorId] = useState<string>("");
  const [allSearchedNames, setAllSearchedNames] = useState<Array<string>>([]);
  const [searchedName, setSearchedName] = useState<string>('');
  const [memberIcon, setMemberIcon] = useState<Array<string>>([]);
  const [searchedMemberIcon, setSearchedMemberIcon] = useState<Array<string>>([]);
  const [currentMWGPastMovies, setCurrentMWGPastMovies] = useState<Array<string>>([]);
  const [currentMWGPastGenres, setCurrentMWGPastGenres] = useState<Array<string>>([]);

  const sleepingPanda = require('../../assets/sleepingPanda.json');



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
    console.log('closerow');
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  }

  useEffect( () => {
    async function getUserInfo(){
      console.log(membersNames)
          setMWGname(MWGname);
          setMWGId(MWGId);
          let mwg = await GetMWGById(MWGId);
          console.log(mwg)
          let pastMovies = mwg.suggestedMovieNames.split(',');
          let pastGenres = mwg.suggestedMovieGenres.split(',');
          setCurrentMWGPastMovies(pastMovies);
          setCurrentMWGPastGenres(pastGenres);
          
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
    if(userIsReadyForSwipes)
    {
      navigation.navigate('MovieCard')
    }
    if(userIsReadyToSeeFinalMovie)
    {
      navigation.navigate('FinalMovie')
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
        //need to reset members array
        let mwg = await GetMWGById(MWGId);
        if(mwg != null)
        {
          setMembersNames(mwg.membersNames.split(","));
          setMembersIcons(mwg.membersIcons.split(","));
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
          else if(membersNames.includes(searchedName))
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

           if(sentResults)
           {
             console.log('yes added', MWGId, foundUser.id, searchedName)
           }
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
          console.log(result, 'yes deleted')
          setModalVisible(!modalVisible)
          navigation.navigate('UserDashboard')
        }else{
          alert('nope')
        }
      }
  
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  return (
    <View>
        <View style={{flex:1, height:90, marginTop:'5%', alignItems:'center'}}>
            <Pressable disabled={userIsWaiting ? true : false} style={{width:'90%'}} onPress={() => handlePress()}>
                <View style={styles.wgButton}>
                  <Image source={MovieClipper}></Image>
                  <Text 
                    style={{color:'#E3DDDD', fontSize:24, paddingLeft:60, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>
                      { userIsReadyForGenres ? 'Start ranking genres' : userIsReadyForSwipes ? 'Start swiping movies' : userIsWaiting ? `Waiting for ${'\n'} others to finish` : userIsAdmin ? 'Start watching' : ''}</Text>
                </View>
            </Pressable>
        </View>
        <View style={{flex:1, height:120, alignItems:'center', marginTop:'4%',justifyContent:'center'}}>
            <View style={{width:'90%'}} >
                <View style={styles.LWAMT}>
                  <View style={{flex:1, marginTop:'3%'}}>
                    <Text style={{color:'#FFFFFF', fontSize:18, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>Let's watch a movie together later</Text>
                  </View>

                  <View style={{flex:2, flexDirection:'row', justifyContent:"space-evenly", alignItems:'center', width:'100%'}}>
                    <Pressable style={styles.InviteMWG}>
                      <Text style={{color:'#E3DDDD', fontSize:15, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>Invite MovieGroup1</Text>
                    </Pressable>
                    <Image source={MovieClipper}></Image>
                  </View>
                </View>
            </View>
        </View>
        <View style={{flex:1, height:200, alignItems:'center', marginTop:'4%'}}>
            <View style={[{flex:1, width:'90%'}, styles.LWAMT]}>
                <View style={{flex:1, marginTop:'3%', marginBottom:'3%'}}>
                  <Text style={{color:'#FFFFFF', fontSize:28, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>Movies Watched</Text>
                </View>
                <View style={{flex:3,flexDirection:'row', marginBottom:'4%', width:'100%', justifyContent:'space-evenly'}}>
                      <View>
                        <ScrollView>
                          <View style={{borderBottomColor:'#FFFFFF', borderBottomWidth:1}}>
                              <Text style={{color:'#FFFFFF', fontSize:25, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                          </View>
                          {
                            currentMWGPastMovies.map((item:any, i:number) => 
                            {
                              return (
                                <Text key={i} style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular'}}>{item}</Text>

                              )
                            })
                          }
                        </ScrollView>
                      </View>
                      <View>
                        <View style={{borderBottomColor:'#FFFFFF', borderBottomWidth:1}}>
                            <Text style={{color:'#FFFFFF', fontSize:25, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Genre</Text>
                        </View>
                        <ScrollView>
                        {
                            currentMWGPastGenres.map((item:any, i:number) => 
                            {
                              return (
                                <Text key={i} style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular'}}>{item}</Text>

                              )
                            })
                          }
                        </ScrollView>
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
                                placeholder="Add members"
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
            {/* <Image source={ExclamationIcon} style={{width:50, height:50, marginBottom:'5%'}}/> */}
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

    //position: 'absolute', top: 175, left: 23, right: 20, bottom: 0,
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
    // marginTop: 22
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
