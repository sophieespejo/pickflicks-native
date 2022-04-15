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
    Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Button, Pressable, ScrollView, Animated
  } from "react-native";
  // import { Button } from "react-native-paper";
  import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";
  import AppLoading from "expo-app-loading";
  import {useNavigation} from '@react-navigation/native';
  import Magnifying from '../../assets/Magnifying.png';
  import X from '../../assets/X.png';
  import Swipeable from 'react-native-gesture-handler/Swipeable';
  import RightActions from './RightActions'
  import { GetUserByUsername, AddMWG } from '../../Service/DataService'
  
  // type RootStackParamList = {
  //     Home: undefined; //means route doesnt have params
  //     Profile: { name: string };
  //     Login: { name: string };
  //     CreateAccount: undefined;
  //     Loading: undefined;
  //     Introduction: undefined;
  //     UserDashboard: { username: string, userId: number };
  //     InvitationSent: undefined;
  //     MemberSearch: { username: string, userId: number },

  //   };
  
  // type Props = NativeStackScreenProps<RootStackParamList, "UserDashboard">;

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


    const handleInvitations = async () => {
        // navigation.navigate("InvitationSent")
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
        // setDisplayOfYourMWG = GetAllCreatedMWGByUserId(userId);
        // setDisplayOfMWGYourMemberOf = GetAllMWGAUserIsMemberOf(userId);
      }
    }

    const addSearchedName = () => {

    }

    const handleKeyPress= async () => {
      console.log(searchedName);
      let foundUser = await GetUserByUsername(searchedName);
      if (foundUser != null && foundUser.id != 0) {
        allSearchedNames.push(searchedName);
        setAllSearchedNames([...allSearchedNames]);
        // mwgMembersId.push(foundUser.id);
        // mwgMembersNames.push(searchedName);
        //setmwgMembersNames([...mwgMembersNames]);
        console.log(allSearchedNames);
        mwgMembersId.push(foundUser.id);
        mwgMembersNames.push(searchedName);
        setmwgMembersNames([...mwgMembersNames]);
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
              allSearchedNames.map((searchedName, i)=> {
                return (
                  <Swipeable renderRightActions={RightActions} key={i}>
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
      // width:'90%'
      marginLeft:"5%",
      color:'#FFFFFF'
    },
    sendInvBtn: {
      borderColor:'red',
      backgroundColor:'#E2DFDFDE',
      borderRadius:25,
      width:'90%',
      alignItems:'center',
      justifyContent:'center',
      marginTop:'5%',
      height:'32%'
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
  