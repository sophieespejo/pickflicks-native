import { FC, useState, useCallback } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import PickFlicksLogo from '../assets/logo.png';
import { Button } from 'react-native-paper';
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';



type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    Profile: { name : string };
    Login: { name: string }
    CreateAccountScreen: undefined,
    Loading: undefined,
    Introduction: undefined
};

type Props = NativeStackScreenProps<RootStackParamList, 'CreateAccountScreen'>;

const CreateAccountScreen : FC<Props> = ({ navigation }) => {


    const [textInput, setTextInput] = useState('');
    const [username, setUsername] = useState('');
    const [veryifyPassowrd, setVerifyPassword] = useState('');
    const [veryifyPassowrd2, setVerifyPassword2] = useState('');
    const [password, setPassword] = useState('');
    const [usernameCompleted, setUsernameCompleted]  = useState(false);

    const handleSubmit = () => {
        setUsername(textInput);
        console.log(textInput);
        setUsernameCompleted(true);
        setTextInput('');
    }

    const handleCreateAccount = () => {
        console.log(veryifyPassowrd);
        console.log(veryifyPassowrd2);
        let newUserData = {
            username: username,
            password: password
        };
        console.log(newUserData);
    };

    let [fontsLoaded] = useFonts({
        Raleway_400Regular,
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }

    return (
        <>
            <View style={styles.bgColor}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView>
                    <Image 
                        source={PickFlicksLogo}
                        style={{height: 337, width: 337}}
                    />
                    {
                        !usernameCompleted ? 
                        <>
                            <View style={{alignItems: 'center'}}>
                                <Text style={styles.createAccountTxt}>Create a username</Text>
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
                                    onChangeText={(e) => setTextInput(e)}
                                    value={textInput}
                                />
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <Button mode="contained" 
                                onPress={handleSubmit}
                                style={styles.nextBtn}>
                                    Next
                                </Button>
                            </View>
                        </>
                        :
                        <>
                            <View style={{alignItems: 'center'}}>
                                <Text style={styles.createAccountTxt}>Create a password</Text>
                                <TextInput
                                    style={styles.input}
                                    // onChangeText={onChangeText}
                                    // value={''}
                                    enablesReturnKeyAutomatically={true}
                                    keyboardAppearance={'dark'}
                                    contextMenuHidden={true}
                                    selectionColor={'white'}
                                    textAlign={'center'}
                                    textContentType={'password'}
                                    onChangeText={(e) => setVerifyPassword(e)}                            // onKeyPress={this.handleKeyDown}
                                />
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <Text style={styles.createAccountTxt}>Verify password</Text>
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
                                    onChangeText={(e) => setVerifyPassword2(e)}                            // onKeyPress={this.handleKeyDown}
                                />
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <Button mode="contained" 
                                onPress={handleCreateAccount}
                                style={styles.createAccountBtn}>
                                    Next22
                                </Button>
                            </View>
                        </>                        
                    }
                </SafeAreaView>
            </TouchableWithoutFeedback>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    bgColor: {
        backgroundColor: '#1E1A1A',
        flex: 1,
        alignItems: 'center'
    }, 
    createAccountTxt: {
        alignItems: 'center',
        // fontStyle: 'Raleway',
        fontSize: 36,
        color: 'white',
        marginTop: '10%',
        fontFamily:'Raleway_400Regular', 
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        width: 300,
        fontSize: 30,
        color: 'white',
        marginTop: 30,
        // alignItems: 'center',

    }, 
    nextBtn: {
        justifyContent:'center', 
        borderRadius: 25, 
        width: '40%', 
        height:'13%', 
        backgroundColor: '#DC1B21', 
        marginTop:'70%',
        marginLeft:'64%',
    },
    createAccountBtn: {
        
    }
});

export default CreateAccountScreen;