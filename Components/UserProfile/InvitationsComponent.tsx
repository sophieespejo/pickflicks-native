import { FC, useEffect, useContext, useState} from "react";
import { StyleSheet, View, Text, Pressable, Modal, Alert} from "react-native";
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



const InvitationsComponent: FC = () => {
  let {userId, invitationMWG, setInvitationMWG} = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState<any>(false);
  const [currentMWGName, setCurrentMWGName] = useState<String>("");
  const [pressedYes, setPressedYes] = useState<Boolean>(false);
  const [pressedNo, setPressedNo] = useState<Boolean>(false);

  const pandaAnimation = require('../../assets/49799-the-panda-eats-popcorn.json');
  const pandInUFO = require('../../assets/pandaInUFO.json');


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

  const handleYes = async (MWGId:number, MWGName:string) => 
  {
    setPressedYes(true);
    let result = await AcceptInvitation(MWGId, userId);
    console.log(result);
    setInvitationMWG([...tempArr]);
    setModalVisible(true);
    setCurrentMWGName(MWGName);
  }

  const handleNo = async (MWGId:number) => 
  {
    setPressedNo(true);
    let result = await DeleteInvitation(MWGId, userId);
    console.log(result);
    setInvitationMWG([...tempArr]);
    setModalVisible(true);
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
                  <Pressable style={{marginBottom:'3%'}} onPress={() => handleYes(item.id, item.mwgName)}>
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
                style={styles.lottieView2}
                source={pandInUFO}
              />
            {/* <Image source={ExclamationIcon} style={{width:50, height:50, marginBottom:'5%'}}/> */}
            {
              pressedYes ? <Text style={styles.modalText}>You are added to {currentMWGName}!</Text> : 
              pressedNo ? <Text style={styles.modalText}>You declined the invitation!</Text> : null
            }
            <View style={{flexDirection:'row', width:'90%', justifyContent:'space-evenly'}}>

            <Pressable
              style={[styles.button, styles.buttonClose1]}
              onPress={()=>setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>

            </View>
          </View>
        </View>
      </Modal>
      
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
      lottieView2: {
        height:150,
        bottom:'3%',
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

export default InvitationsComponent;
