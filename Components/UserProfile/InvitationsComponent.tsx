import { FC, useEffect, useContext, useState} from "react";
import { StyleSheet, View, Image, Text, TextInput, Pressable} from "react-native";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Avatar } from "react-native-paper";
import {GetAllUnacceptedInvitationsByUserId, GetMWGById, AcceptInvitation,DeleteInvitation} from '../../Service/DataService';
import UserContext from '../../Context/UserContext';
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
import LottieView from 'lottie-react-native';
import loadingGif from '../../assets/36292-loader-movie.json';




const InvitationsComponent: FC = () => {
  let {userId, invitationMWG, setInvitationMWG} = useContext(UserContext)
  const pandaAnimation = require('../../assets/49799-the-panda-eats-popcorn.json');


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

  const tempArr: Array<Object> = [];

  useEffect( () => {
      async function Invitations(){
        let allUnacceptedInvitations = await GetAllUnacceptedInvitationsByUserId(userId);

        if(allUnacceptedInvitations != null)
        {
          for (const item of allUnacceptedInvitations) 
          {
            let result = await GetMWGById(item.mwgId);
            tempArr.push(result);
          }
          setInvitationMWG([...tempArr]);
        }
      }
      Invitations()
    }, []);

  const handleYes = async (MWGId:number) => 
  {
    let result = await AcceptInvitation(MWGId, userId);
    console.log(result);
    setInvitationMWG([...tempArr]);
  }
  const handleNo = async (MWGId:number) => 
  {
    let result = await DeleteInvitation(MWGId, userId);
    console.log(result);
    setInvitationMWG([...tempArr]);
  }

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <View style={{flex:1}}>
      {
        invitationMWG.length == 0 ? 
        <>
        <View style={{flex:1, marginTop:'42%'}}>

        <LottieView
                autoPlay
                style={styles.lottieView}
                source={pandaAnimation}
              />
        </View>
              <View style={{flex:1}}>
        <Text style={[styles.waitingTxt]}>You have no invitations, {'\n'} come back later!</Text>
              </View>
        </>
        :
          invitationMWG.map((item : any, idx: number) => 
          {
            return (
          <View key={idx} style={{marginTop:'8%',borderBottomColor: '#E2DFDFDE'}}>
              <View style={{flexDirection:'row', alignSelf:'center', alignItems:'center', width:'85%', justifyContent:'space-around'}}>
                  <Avatar.Image size={50} source={icons.get(item.membersIcons.split(',')[0])}/>
                  <Text style={[styles.waitingTxt]}>
                    {item.membersNames.split(',')[0]} wants you to join {'\n'} {item.mwgName}?</Text>
              </View>
              <View style={{alignSelf:'center', marginTop:'4%'}}>
                  <Text style={[styles.currentMembers]}>Current Members: {item.membersNames}</Text>
              </View>
              <View style={{flexDirection:'row', marginTop:'4%', alignSelf:'center', width:'90%', justifyContent:'space-around',borderBottomColor: '#4D4A4A',borderBottomWidth: 1}}>
                  <Pressable style={{marginBottom:'3%'}} onPress={() => handleYes(item.id)}>
                    <Text style={[styles.AcceptTxt]}>Yes</Text>
                    </Pressable>
                  <Pressable onPress={() => handleNo(item.id)}>
                    <Text style={[styles.DeclineTxt]}>No</Text>
                    </Pressable>
              </View>
          </View>
            )
          })
        
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
    waitingTxt:{
        fontFamily:'Raleway_400Regular',
        fontSize:22,
        color:'#FFFFFF',
        textAlign:'center',
    },
    currentMembers:{
        fontFamily:'Raleway_400Regular',
        fontSize:18,
        color:'#FFFFFF',
        textAlign:'center'
    },
    AcceptTxt:{
        fontFamily:'Raleway_400Regular',
        fontSize:24,
        color:'#3EB75E',
        textAlign:'center'
      },
    DeclineTxt:{
        fontFamily:'Raleway_400Regular',
        fontSize:24,
        color:'#E51545',
        textAlign:'center'
      },
      seperationLine:{
        borderBottomColor: '#4D4A4A',
        borderBottomWidth: 1,
      },
      lottieView: {
        flex:1,
        // backgroundColor:'green',
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        // top:'40%',
        height:'100%'
        // position:'relative'
      },
  
});

export default InvitationsComponent;
