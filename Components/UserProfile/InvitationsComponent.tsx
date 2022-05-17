import { FC, useEffect, useContext, useState} from "react";
import { StyleSheet, View, Image, Text, TextInput, Pressable} from "react-native";
import headerLogo from "../../assets/headerLogo.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Avatar } from "react-native-paper";
import {GetAllUnacceptedInvitationsByUserId, GetMWGById} from '../../Service/DataService';
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



const InvitationsComponent: FC = () => {
  let {userId} = useContext(UserContext)
  const [invitations, setInvitations] = useState<any[]>([]);
  const [tempMWGId, setTempMWGId] = useState<any[]>([]);
  const [tempMWG, setTempMWG] = useState<any[]>([]);

  useEffect( () => {
    const Invitations = async () => 
    {
      setTempMWGId([]);
      setTempMWG([]);
      
      let AllUnacceptedInvites = await GetAllUnacceptedInvitationsByUserId(userId);
      console.log("This is first Fetch:", AllUnacceptedInvites);
      setInvitations(AllUnacceptedInvites);
      
      if(AllUnacceptedInvites != null)
      {
        for (const item of invitations) {
          // if(!tempMWGId.includes(item))
          // {
            // tempMWGId.push(item.mwgId);
            console.log('This is MWGId', item.mwgId)

            // for (const item of tempMWGId) {
              let result = await GetMWGById(item.mwgId);
              if(result)
              {
                console.log("this is result", result)
                tempMWG.push(result);

              }
            // }
            setTempMWG(tempMWG)
      
            console.log('This is MWG', tempMWG);
              
        }

      }

      

    }
    
    Invitations();

  }, []);

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <View style={{flex:1}}>
        {/* Start Map Here */}
        {
          tempMWG.map((item : any, idx: number) => 
          {
            return (
          <View key={idx} style={{marginTop:'8%',borderBottomColor: '#E2DFDFDE'}}>
              <View style={{flexDirection:'row', alignSelf:'center', alignItems:'center', width:'85%', justifyContent:'space-around'}}>
                  <Avatar.Image size={50} source={boy1}/>
                  <Text style={[styles.waitingTxt]}>An wants you to join {'\n'} {item.mwgName}?</Text>
              </View>
              <View style={{alignSelf:'center', marginTop:'4%'}}>
                  <Text style={[styles.currentMembers]}>Current Members: {item.membersNames}</Text>
              </View>
              <View style={{flexDirection:'row', marginTop:'4%', alignSelf:'center', width:'90%', justifyContent:'space-around',borderBottomColor: '#4D4A4A',borderBottomWidth: 1}}>
                  <Pressable style={{marginBottom:'3%'}}><Text style={[styles.AcceptTxt]}>Yes</Text></Pressable>
                  <Pressable><Text style={[styles.DeclineTxt]}>No</Text></Pressable>
              </View>
          </View>
            )
          })
        }
        {/* End Map Here */}





        




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
      }
  
});

export default InvitationsComponent;
