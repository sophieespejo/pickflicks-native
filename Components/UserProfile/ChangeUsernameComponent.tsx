import { FC, useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, TouchableWithoutFeedback, Keyboard} from "react-native";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold} from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import {useNavigation} from '@react-navigation/native';
import {EditUsername } from '../../Service/DataService';
import UserContext from '../../Context/UserContext';  


const ChangeUsernameComponent: FC = () => {

  let { userId } = useContext(UserContext)

  const navigation = useNavigation();
  const [textInput, setTextInput] = useState('');

  const handleSaveUsername = async () => 
  {
    console.log('//ChangeUsernameComponent', textInput);
    let result = await EditUsername(userId, textInput);
    console.log('//ChangeUsernameComponent EditUserNameFetch ran', result);
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
               <Text style={styles.Txt}>Enter your new {'\n'} Username</Text>
               <TextInput
                            style={styles.input}
                            // onChangeText={onChangeText}
                            // value={''}
                            enablesReturnKeyAutomatically={true}
                            keyboardAppearance={'dark'}
                            contextMenuHidden={true}
                            selectionColor={'white'}
                            textAlign={'center'}
                            textContentType={'name'}
                            placeholder={'Try a new Username'}
                            placeholderTextColor={'white'}
                            onChangeText={(e) => setTextInput(e)}
                            // value={}
                        />
                {/* Message for when username is not available ternary here */}
                <Text style={styles.Txt2}>username not available!</Text>

                <Pressable onPress={() => handleSaveUsername()} style={{alignItems:'center', paddingTop:'5%'}}>
                    <Text style={styles.SaveTxt}>Save</Text>
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
    // textAlign:'center',
    // alignItems: 'center',
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

export default ChangeUsernameComponent;
