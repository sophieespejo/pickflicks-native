import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView} from "react-native";
import headerLogo from "../../assets/headerLogo.png";
import MovieClipper from "../../assets/MovieClipper.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import MemberSearchTextInputComponent from '../UserDashboard-Body/MemberSearchTextInputComponent'
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


interface IStartWatchingBtnsComponent {
  username: string,
  userId: number
}

  type RootStackParamList = {
      Home: undefined; //means route doesnt have params
      Profile: { name: string };
      Login: { username: string, userId: number },
      CreateAccount: undefined;
      Loading: undefined;
      Introduction: undefined;
      UserDashboard: { username: string, userId: number };
      InvitationSent: undefined;
      MemberSearch: { username: string, userId: number },
      NewMWGName: { username: string, userId: number },
      MWGDashboard: { mwgName: string, mwgId: number }

    };
  
  type Props = NativeStackScreenProps<RootStackParamList, "MWGDashboard">;

const StartWatchingBtnsComponent: FC = () => {
  const navigation = useNavigation<any>();
  let { setMWGname, MWGname, setMWGId, MWGId, userIsAdmin, userId, setUserIsAdmin, userIsReadyForGenres, setUserIsReadyForGenres, userIsReadyForSwipes, setUserIsReadyForSwipes, userIsReadyToSeeFinalMovie, setUserIsReadyToSeeFinalMovie, userIsWaiting, setUserIsWaiting } = useContext(UserContext);
  const [membersNames, setMembersNames] = useState<Array<string>>([]);
  const [membersIcons, setMembersIcons] = useState<Array<string>>([]);
  const [mwgCreatorId, setmwgCreatorId] = useState<string>("");
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

  useEffect( () => {
    async function getUserInfo(){
          setMWGname(MWGname);
          setMWGId(MWGId);
          let mwg = await GetMWGById(MWGId);
          
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
                <Text style={{color:'#E3DDDD', fontSize:24, paddingLeft:60, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>{
                   userIsReadyForGenres ? 'Start ranking genres' : userIsReadyForSwipes ? 'Start swiping movies' : userIsWaiting ? `Waiting for ${'\n'} others to finish` : userIsAdmin ? 'Start watching' : ''
                }</Text>
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
                            <Text style={{color:'#FFFFFF', fontSize:18, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                        </View>
                            <Text style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular'}}>Movies</Text>
                            <Text style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular'}}>Movies</Text>
                            <Text style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular'}}>Movies</Text>
                        </ScrollView>
                        </View>


                        <View>
                        <View style={{borderBottomColor:'#FFFFFF', borderBottomWidth:1}}>
                            <Text style={{color:'#FFFFFF', fontSize:18, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Genre</Text>
                        </View>
                        <ScrollView>
                            <Text style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                            <Text style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                            <Text style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                        </ScrollView>
                        </View>
                </View>

            </View>
        </View>

        <View style={{flex:1, height:300, alignItems:'center', marginTop:'4%', }}>
            <View style={[{flex:1, width:'90%', backgroundColor:'orange'}, styles.LWAMT]}>
                <View style={{flex:.2, marginTop:'3%', }}>
                <Text style={{color:'#FFFFFF', fontSize:28, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>Group Members</Text>
                </View>
        
                <View style={{flex:1, height:100,  flexDirection:'row', marginBottom:'4%', width:'80%', justifyContent:'space-evenly', }}>
                        <ScrollView style={{flex:1}}>
                          {/* map thru members here */}
                          {
                            membersNames.map((member, i) => {
                              return (
                                <View style={[{width:'99%', flexDirection: 'row', alignItems: 'flex-end', paddingBottom: '2%'}, styles.nameLine]}>

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
            <Pressable disabled={userIsWaiting ? true : false} style={{width:'70%'}} onPress={() => handlePress()}>
                <View style={styles.wgButton}>
                <Text style={{color:'#E3DDDD', fontSize:24,justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>Delete Watch Group</Text>
                </View>
            </Pressable>
        </View>
           : null
        }


        

            {/* <MemberSearchTextInputComponent/> */}

        </View>
  );
};

export default StartWatchingBtnsComponent;

const styles = StyleSheet.create({
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
});
