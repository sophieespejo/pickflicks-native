import { FC, useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, TouchableWithoutFeedback, Keyboard} from "react-native";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold} from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../Context/UserContext';

  


const ChangePasswordComponent1: FC = () => {

  let { userId, username} = useContext(UserContext)
  const [textInput, setTextInput] = useState("");

  const navigation = useNavigation<any>();

  const handleNext = async () => 
  {
    navigation.navigate('ChangePassword2');  
  //   let userData = {
  //     Username: username,
  //     Password: textInput
  // };
  //not login, should be the new endpoint in userService
    // let passwordResult = await Login(userData);
    // if(passwordResult)
    // {
    //   navigation.navigate('ChangePassword2');    
    // }
  }

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
        <View style={{ flex: 1, width:'100%', alignSelf:'center'}}>
               <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
           <View style={{flex:1, justifyContent:'center'}}>
               <Text style={styles.Txt}>Enter your current {'\n'} Password</Text>
               <TextInput
                            style={styles.input}
                            enablesReturnKeyAutomatically={true}
                            keyboardAppearance={'dark'}
                            contextMenuHidden={true}
                            selectionColor={'white'}
                            textAlign={'center'}
                            textContentType={'name'}
                            placeholder={'Enter your current Password'}
                            placeholderTextColor={'white'}
                            onChangeText={(e) => setTextInput(e)}
                            value={textInput}
                        />
                <Text style={styles.Txt2}>Incorrect Password</Text>

                <Pressable onPress={() => handleNext()} style={{alignItems:'center', paddingTop:'5%'}}>
                    <Text style={styles.SaveTxt}>Next</Text>
                </Pressable>
           </View>
                </TouchableWithoutFeedback>
        </View>
  );
};

const styles = StyleSheet.create({
  titleTxt:{
      fontFamily:'Raleway_400Regular',
      fontSize: 22,
      textAlign:'center',
      marginTop:'4%',
      color: '#EBE1E1',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    width: '90%',
    fontSize: 25,
    color: '#EBE1E1',
    marginTop: 20,
    alignSelf:'center',
    fontFamily:'Raleway_400Regular', 
    }, 
  titleTxtBold:{
      fontFamily:'Raleway_600SemiBold',
      fontSize: 40,
      textAlign:'center',
      marginTop:'4%',
      color: '#EBE1E1',
      fontWeight:'600'
  },
  SaveTxt:{
    fontFamily: "Raleway_400Regular",
    fontSize: 26,
    color:'#09A7F9',
  },
  Txt:{
    fontFamily:'Raleway_400Regular',
    fontSize: 30,
    textAlign:'center',
    color: '#EBE1E1',
  },
  Txt2:{
    fontFamily:'Raleway_400Regular',
    fontSize: 22,
    textAlign:'center',
    color: '#EBE1E1D1',
    paddingTop:'4%'
  }
});

export default ChangePasswordComponent1;
