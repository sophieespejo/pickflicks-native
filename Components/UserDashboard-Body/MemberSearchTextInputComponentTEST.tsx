  import { FC, useState, useContext, useEffect } from "react";
  import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image, Alert,
    Pressable, ScrollView, Animated
  } from "react-native";
  import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";
  import AppLoading from "expo-app-loading";
  import {useNavigation} from '@react-navigation/native';
  import Magnifying from '../../assets/Magnifying.png';
  import Swipeable from 'react-native-gesture-handler/Swipeable';
  import { Button, Avatar } from "react-native-paper";
  import { AddInvitations, GetUserByUsername, AddMWG, GetMWGStatusByUserId, AddMWGStatus, GetMWGByMWGName} from '../../Service/DataService'
  import UserContext from '../../Context/UserContext';
  import RightActions from './RightActions';
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
  
  const MemberSearchTextInputComponent: FC = () => {
    let { username, setUsername, userId, setUserId, newMWGname, setnewMWGname, setAllMWG, userIcon, setUserIcon } = useContext(UserContext)
    
    const [searchedName, setSearchedName] = useState<string>('');
    const [allSearchedNames, setAllSearchedNames] = useState<Array<string>>([]);
    const [memberIcon, setMemberIcon] = useState<Array<string>>([]);
    const [mwgMembersId, setmwgMembersId] = useState<Array<string>>([]);
    const [mwgMembersNames, setmwgMembersNames] = useState<Array<string>>([]);
    const [mwgMembersIcons, setmwgMembersIcons] = useState<Array<string>>([]);
    const navigation = useNavigation<any>();

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

    useEffect( () => {
      async function getUserInfo(){
            setUsername(username);
            setUserId(userId);
            setUserIcon(userIcon);
            setnewMWGname(newMWGname);
      }
      getUserInfo()
    }, []);

    const closeRow = (index: number) => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    }

    const handleInvitations = async () => {
        let newMWG = {
          Id: 0,  
          MWGName: newMWGname,
          GroupCreatorId: userId,
          MembersId: userId.toString(),
          MembersNames: username,
          MembersIcons: userIcon,
          suggestedMovieNames: '',
          suggestedMovieGenres: '',
          ChosenGenres: '',
          StreamingService: '',
          FinalGenre: '',
          FinalMovieIndex: 0,
          IsDeleted: false
        }
        
        let result = await AddMWG(newMWG);
      if (result) {
        let newMWGId = await GetMWGByMWGName(newMWGname);
        if(newMWGId != null)
        {
          let sentResults = await AddInvitations(newMWGId.id, newMWGname, mwgMembersNames.join(","));
          if(sentResults)
          {
            let userMWG = await GetMWGStatusByUserId(userId);
            setAllMWG(userMWG);
            navigation.navigate("InvitationSent");
          }
        }
      }else{
        alert("Unable to create a new movie watch group. Please try again.")
      }
    }

    const handleKeyPress= async () => {
      let foundUser = await GetUserByUsername(searchedName);
      
      if (foundUser != null && foundUser.id != 0) {
        if (foundUser.id == userId || mwgMembersNames.includes(searchedName.toLowerCase()))
        {
          Alert.alert('They are already included in the group', 'Please search for someone else')
        }
        else
        {
          allSearchedNames.push(searchedName);
          setAllSearchedNames([...allSearchedNames]);
          memberIcon.push(foundUser.icon);
          mwgMembersId.push(foundUser.id);
          mwgMembersNames.push(searchedName.toLowerCase());
          mwgMembersIcons.push(foundUser.icon);
          setmwgMembersNames([...mwgMembersNames]);
          setSearchedName('');    
        }
      }
      else
      {
        Alert.alert('User does not exist', 'Please try again')
      }
    }

    const handleDeleteMember = async (searchedName:string, index:number ) => {
      let removedMemberNameIndex = mwgMembersNames.indexOf(searchedName);
      mwgMembersNames.splice(removedMemberNameIndex, 1);
      setmwgMembersNames([...mwgMembersNames]);
      setAllSearchedNames([...mwgMembersNames]);
      closeRow(index-1)

      let foundUser = await GetUserByUsername(searchedName);
      if (foundUser != null && foundUser.id != 0) {
        let removedIdIndex = mwgMembersId.indexOf(foundUser.id);
        let removedIconIndex = mwgMembersIcons.indexOf(foundUser.icon);
        let removedMemberIconIndex = memberIcon.indexOf(foundUser.icon);
        mwgMembersId.splice(removedIdIndex, 1);
        mwgMembersIcons.splice(removedIconIndex, 1);
        memberIcon.splice(removedMemberIconIndex, 1);
        setmwgMembersIcons([...mwgMembersIcons]);
        setmwgMembersId([...mwgMembersId]);
      }
    }

    let [fontsLoaded] = useFonts({
      Raleway_400Regular,
    });
  
    if (!fontsLoaded) {
      return <AppLoading />;
    }
  
    return (
        <View style={{flex:1, alignItems:'center'}}>
            <View style={{ flex: 1, backgroundColor:'#4D4A4AEA', borderRadius:30, width:'92%'}}>
              <View style={{alignItems:'flex-end', width:'95%', marginTop:'5%'}}>
              </View>
            <View style={{alignItems:'center', width:'100%'}}>
              <View style={[{flexDirection:'row',marginTop:'7%'}]}>
                <Image source={Magnifying}/>
                    <TextInput
                      style={styles.text}
                      placeholder="Add members to the group"
                      placeholderTextColor="#FFFFFF"
                      onChangeText={(e) => setSearchedName(e)}
                      onSubmitEditing={()=> handleKeyPress()}
                      value={searchedName}
                    />
              </View>
              <View style={[{width:'92%', alignItems:'flex-start'}, styles.redInputLine]}>
              </View>
          </View>

          <ScrollView style={{flex:1}}>
            <View style={{flex:1}}>
            <View style={[{alignItems:'center', marginTop:'5%'}]}>
                              <View style={[{width:'80%', flexDirection: 'row', alignItems: 'flex-end', paddingBottom: '2%'}, styles.nameLine]}>
                              <Avatar.Image source={icons.get(userIcon)} style={{alignItems: 'flex-start'}}/>
                              <Text style={[{color:'white', marginLeft: '5%'}, styles.btnText]}>{username}</Text>
                              </View>
            </View>
            {
              allSearchedNames.map((searchedName, index)=> {
                const renderRightView = (progress:number, dragX:any) => {
                  const scale = dragX.interpolate({
                    inputRange: [-100, 0],
                    outputRange: [0.7, 0],
                    extrapolate: 'clamp'
                  })
            
                  return (
                    <Animated.View
                      style={{flex:0.4, margin: 0, transform: [{ scale }], alignContent: 'center', justifyContent: 'center', width:100}}
                    >
                      <Button 
                        uppercase={false} 
                        mode='contained' 
                        color='red' 
                        onPress={() => handleDeleteMember(searchedName, index)} 
                        style={{height: '60%'}}>
                          <Text style={{fontSize:28, fontFamily: "Raleway_400Regular",}}>Remove</Text>
                      </Button>
                    </Animated.View>
                  )
                }
                return (
                  <Swipeable 
                    renderRightActions={(progress:any, dragx:any) => renderRightView(progress, dragx)}
                    ref={(ref) => (row[index] = ref)}
                    onSwipeableOpen={() => closeRow(index)}
                    key={index}
                    >
                    <View style={[{alignItems:'center', marginTop:'5%'}]}>
                              <View style={[{width:'80%', flexDirection: 'row', alignItems: 'flex-end', paddingBottom: '2%'}, styles.nameLine]}>
                              <Avatar.Image source={icons.get(memberIcon[index])} style={{alignItems: 'flex-start'}}/>
                              <Text style={[{color:'white', marginLeft: '5%'}, styles.btnText]}>{searchedName}</Text>
                              </View>
                    </View>
                  </Swipeable>
                )
              })
            }
            </View>
            <View style={{alignItems:'center', marginTop:'8%'}}>
              <View style={styles.sendInvBtn}>
                <Pressable onPress={() => handleInvitations()}>
                  <Text style={styles.btnText}>Send Invitations</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
       </View>
    );
  };
  
  const styles = StyleSheet.create({
    redInputLine: {
      borderBottomWidth: 2,
      borderColor: "red",
      marginTop: '3%'
    },
    nextBtn:{
      fontFamily: "Raleway_400Regular",
      fontSize: 25
    },
    text: {
      fontFamily: "Raleway_400Regular",
      fontSize: 22,
      width:'80%',
      marginLeft:"5%",
      color:'#FFFFFF'
    },
    sendInvBtn: {
      backgroundColor:'#E2DFDFDE',
      borderRadius:25,
      width:'90%',
      alignItems:'center',
      justifyContent:'center',
      marginTop:'5%',
      maxHeight:'92%'
    },
    btnText:{
      fontFamily: "Raleway_400Regular",
      fontSize: 25,
    },
    nameLine:{
      borderBottomColor: '#E2DFDFDE',
      borderBottomWidth: 1,
    }
  });
  
  export default MemberSearchTextInputComponent;
  