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
    Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Button, Pressable, ScrollView
  } from "react-native";
  // import { Button } from "react-native-paper";
  import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";
  import AppLoading from "expo-app-loading";
  import {useNavigation} from '@react-navigation/native';
  import Magnifying from '../../assets/Magnifying.png';
  import X from '../../assets/X.png';
  
  type RootStackParamList = {
      Home: undefined; //means route doesnt have params
      Profile: { name: string };
      Login: { name: string };
      CreateAccount: undefined;
      Loading: undefined;
      Introduction: undefined;
      UserDashboard: undefined;
      InvitationSent: undefined;
    };
  
  type Props = NativeStackScreenProps<RootStackParamList, "UserDashboard">;
  
  const MemberSearchTextInputComponent: FC<Props> = (route) => {
    
    const [searchedName, setSearchedName] = useState('');

    let [fontsLoaded] = useFonts({
      Raleway_400Regular,
    });
  
    if (!fontsLoaded) {
      return <AppLoading />;
    }
  
    const navigation = useNavigation();


    const handleInvitations = () => {
        navigation.navigate("InvitationSent")
    }
  
    return (
      
        <View style={{flex:1, alignItems:'center'}}>
          
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                  onSubmitEditing={console.log(searchedName)}
                  // onKeyPress={console.log(searchedName)}
                />
          </View>
          <View style={[{width:'92%', alignItems:'flex-start'}, styles.redInputLine]}>
          </View>
          </View>

          {/* users */}
          <ScrollView style={{flex:1}}>
          <View style={{flex:1}}>
            
          <View style={{alignItems:'center'}}>

          <ScrollView horizontal contentContainerStyle={[{backgroundColor:'blue', width:'80%', justifyContent:'center', marginTop:'8%'}, styles.nameLine]}>
            
          <View style={[{alignItems:'center'}]}>
          <View style={[{flexDirection:'row'}]}>
            <View style={{width:'80%', justifyContent:'flex-start'}}>
            <Text style={[{color:'white'}, styles.btnText]}>User</Text>
            </View>
            <View style={[{backgroundColor:'white', marginLeft:'100%'}]}>
          <Button title="button"/>
            </View>
          </View>

          </View>
          </ScrollView>
          </View>


          <View style={[{alignItems:'center', marginTop:'8%'}]}>
          <View style={[{width:'80%', alignItems:'flex-start'}, styles.nameLine]}>
            <Text style={[{color:'white'}, styles.btnText]}>User</Text>
          </View>

          </View>
          <View style={[{alignItems:'center', marginTop:'8%'}]}>
          <View style={[{width:'80%', alignItems:'flex-start'}, styles.nameLine]}>
            <Text style={[{color:'white'}, styles.btnText]}>User</Text>
          </View>

          </View>
          <View style={[{alignItems:'center', marginTop:'8%'}]}>
          <View style={[{width:'80%', alignItems:'flex-start'}, styles.nameLine]}>
            <Text style={[{color:'white'}, styles.btnText]}>User</Text>
          </View>

          </View>
          <View style={[{alignItems:'center', marginTop:'8%'}]}>
          <View style={[{width:'80%', alignItems:'flex-start'}, styles.nameLine]}>
            <Text style={[{color:'white'}, styles.btnText]}>User</Text>
          </View>

          </View>
          <View style={[{alignItems:'center', marginTop:'8%'}]}>
          <View style={[{width:'80%', alignItems:'flex-start'}, styles.nameLine]}>
            <Text style={[{color:'white'}, styles.btnText]}>User</Text>
          </View>

          </View>
      

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
        </TouchableWithoutFeedback>
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
  