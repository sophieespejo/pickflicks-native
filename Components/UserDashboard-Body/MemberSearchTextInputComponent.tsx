import {
    createNativeStackNavigator,
    NativeStackScreenProps,
  } from "@react-navigation/native-stack";
  import { FC, useState } from "react";
  import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Keyboard, TouchableWithoutFeedback, Pressable, ScrollView, Animated
  } from "react-native";
  // import { Button } from "react-native-paper";
  import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";
  import AppLoading from "expo-app-loading";
  import {useNavigation} from '@react-navigation/native';
  import Magnifying from '../../assets/Magnifying.png';
  import X from '../../assets/X.png';
  import Swipeable from 'react-native-gesture-handler/Swipeable';
  import RightActions from './RightActions'
  import { Button } from "react-native-paper";
  import { GetUserByUsername, AddMWG } from '../../Service/DataService'
  
  type RootStackParamList = {
      Home: undefined; //means route doesnt have params
      Profile: { name: string };
      Login: { name: string };
      CreateAccount: undefined;
      Loading: undefined;
      Introduction: undefined;
      UserDashboard: { username: string, userId: number };
      InvitationSent: { username: string, userId: number};
      MemberSearch: { username: string, userId: number },
    };
  

  interface IMemberSearchTextInputComponent {
    username: string,
    userId: number,
    newMWGname: string
  }
  
  const MemberSearchTextInputComponent: FC = ({username, userId, newMWGname}) => {
    const [searchedName, setSearchedName] = useState('');
    const [allSearchedNames, setAllSearchedNames] = useState([]);
    const [mwgMembersId, setmwgMembersId] = useState([]);
    const [mwgMembersNames, setmwgMembersNames] = useState([]);

  
    const navigation = useNavigation();

    let row: Array<any> = [];
    let prevOpenedRow;

    const closeRow = (index) => {
      console.log('closerow');
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    }

    const handleInvitations = async () => {
        console.log(newMWGname);
        console.log(userId)
        mwgMembersId.push(userId);
        mwgMembersNames.push(username);
        let newMWG = {
          Id: 0,  
          MwgName: newMWGname,//need to be set in other component
          GroupCreatorId: userId,
          MembersId: mwgMembersId.join(","),
          membersNames: mwgMembersNames.join(","),
          UserSuggestedMovies: '',
          IsDeleted: false
      }
      let result = await AddMWG(newMWG);
      if (result) {
        console.log("yay it worked")
        navigation.navigate("InvitationSent", { username: username, userId: userId});
      }
    }

    const handleKeyPress= async () => {
      console.log(searchedName);
      let foundUser = await GetUserByUsername(searchedName);
      if (foundUser != null && foundUser.id != 0) {
        allSearchedNames.push(searchedName);
        setAllSearchedNames([...allSearchedNames]);
        mwgMembersId.push(foundUser.id);
        mwgMembersNames.push(searchedName);
        setmwgMembersNames([...mwgMembersNames]);
      }else{
        alert('User does not exist')
      }
    }

    const handleDeleteMember = async (searchedName, index ) => {
      console.log(searchedName);
      console.log(index)
      let removedMemberNameIndex = mwgMembersNames.indexOf(searchedName);
      console.log(removedMemberNameIndex);
      mwgMembersNames.splice(removedMemberNameIndex, 1);
      setmwgMembersNames([...mwgMembersNames]);
      setAllSearchedNames([...mwgMembersNames]);
      console.log(mwgMembersNames)
      closeRow(index-1)

      let foundUser = await GetUserByUsername(searchedName);
      if (foundUser != null && foundUser.id != 0) {
        let removedIdIndex = mwgMembersId.indexOf(foundUser.id);
        console.log(removedIdIndex)
        mwgMembersId.splice(removedIdIndex, 1);
        setmwgMembersId([...mwgMembersId]);
        console.log(mwgMembersId)
      }else{
        alert('User does not exist')
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
          <Text>{newMWGname}</Text>
            <View style={{ flex: 1, backgroundColor:'#4D4A4AEA', borderRadius:30, width:'92%'}}>
              <View style={{alignItems:'flex-end', width:'95%', marginTop:'5%'}}>
                <Image source={X}></Image>
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
                    />
              </View>
              <View style={[{width:'92%', alignItems:'flex-start'}, styles.redInputLine]}>
              </View>
          </View>

          {/* users */}
          <ScrollView style={{flex:1}}>
            <View style={{flex:1}}>
            {
              allSearchedNames.map((searchedName, index)=> {
                const renderRightView = (progress, dragX) => {

                  const scale = dragX.interpolate({
                    inputRange: [-100, 0],
                    outputRange: [0.7, 0],
                    extrapolate: 'clamp'
                  })
            
                  return (
                    <Animated.View
                      style={{flex:0.4, margin: 0, transform: [{ scale }], alignContent: 'center', justifyContent: 'center', width:100}}
                    >
                      <Button uppercase={false} mode='contained' color='red' onPress={() => handleDeleteMember(searchedName, index)} style={{height: '80%'}}><Text style={{fontSize:28, fontFamily: "Raleway_400Regular",}}>Remove</Text></Button>
                    </Animated.View>
                  )
                }
                return (
                  <Swipeable 
                    renderRightActions={(progress, dragx) => renderRightView(progress, dragx)}
                    ref={(ref) => (row[index] = ref)}
                    onSwipeableOpen={() => closeRow(index)}
                    rightOpenValue={-100}
                    key={index}
                    >
                    <View style={[{alignItems:'center', marginTop:'10%'}]}>
                      <View style={[{width:'80%', alignItems:'flex-start'}, styles.nameLine]}>
                        <Text style={[{color:'white'}, styles.btnText]}>{searchedName}</Text>
                      </View>
                    </View>
                  </Swipeable>
                )
              })
            }
            </View>
            <View style={{alignItems:'center', marginTop:'8%'}}>
              <View style={styles.sendInvBtn}>
                <Pressable onPress={handleInvitations}>
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
      // color: "#FFFFFF",
      // textAlign: "center",
      borderBottomWidth: 2,
      borderColor: "red",
      marginTop: '3%'
      // width: "90%",
      // backgroundColor:'blue',
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
  