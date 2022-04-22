import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, TouchableWithoutFeedback, Keyboard} from "react-native";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold} from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
import JJKMovie from '../../assets/JJKMovie.jpg'
import Popcorn from '../../assets/Popcorn.gif'
// import { Button } from "native-base";
  


const ChangePasswordComponent2: FC = () => {
    const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <View style={{flex:1}}>
        <View style={{ flex: 1, width:'100%', alignSelf:'center'}}>
               <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
           <View style={{flex:1, justifyContent:'flex-end'}}>
               <Text style={styles.Txt}>Enter your new Password</Text>
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
                            // placeholder={'Try a new Username'}
                            placeholderTextColor={'white'}
                            onChangeText={(e) => console.log('pewpew')}
                            // value={}
                        />
           </View>
                </TouchableWithoutFeedback>
        </View>

        <View style={{ flex: 1, width:'100%', alignSelf:'center', marginTop:'15%', marginBottom:'13%'}}>
               <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
           <View style={{flex:1, justifyContent:'flex-start'}}>
               <Text style={styles.Txt}>Confirm your new Password</Text>
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
                            // placeholder={'Try a new Username'}
                            placeholderTextColor={'white'}
                            onChangeText={(e) => console.log('pewpew')}
                            // value={}
                        />
                        <Text style={styles.Txt2}>Passwords do not match!</Text>

                      <Pressable style={{alignItems:'center', paddingTop:'5%'}}>
                          <Text style={styles.SaveTxt}>Save</Text>
                      </Pressable>
           </View>
                </TouchableWithoutFeedback>
        </View>
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

export default ChangePasswordComponent2;
