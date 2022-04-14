import { FC, useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import PickFlicksLogo from '../assets/logo.png';
import { Button, HelperText } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AddUser } from '../Service/DataService';
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Avatar } from 'react-native-paper';

type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    UserDashboard: { username : string };
    Login: { name: string }
    CreateAccountScreen: undefined,
    Loading: undefined,
    Introduction: undefined
};

type Props = NativeStackScreenProps<RootStackParamList, 'CreateAccountScreen'>;

const AvatarScreen : FC<Props> = ({ navigation }) => {


    const [textInput, setTextInput] = useState('');
    const [username, setUsername] = useState('');
    const [veryifyPassowrd, setVerifyPassword] = useState('');
    const [veryifyPassowrd2, setVerifyPassword2] = useState('');
    const [password, setPassword] = useState('');
    const [usernameCompleted, setUsernameCompleted]  = useState(false);
    let passwodsVerified = false;
    let pickingAvatar = false;

    useEffect( () => {
        // const fetch = async () => {
              
        // }
        // fetch();
      }, []);

    const handleSubmit = () => {
        setUsername(textInput);
        console.log(textInput);
        setUsernameCompleted(true);
        setTextInput('');
    }

    const hasErrors = () => {
        return (veryifyPassowrd != veryifyPassowrd2) 
    };

    const hasErrors2 = () => {
        return (veryifyPassowrd != '' && veryifyPassowrd == veryifyPassowrd2) 
    };

    const handleCreateAccount = async () => {
        if (passwodsVerified) {
            let newUserData = {
                username: username,
                password: veryifyPassowrd2
            };
            console.log(newUserData);
            let result = await AddUser(newUserData);
            console.log(result);
            setUsernameCompleted(true);
            pickingAvatar = true;
            // navigation.navigate('UserDashboard', { username: username})
        };
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
            <KeyboardAwareScrollView
                style={{ backgroundColor: '#4c69a5' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.bgColor}
                scrollEnabled={false}
            >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView>
                    {/* <View style={{ alignItems: 'center'}}>
                        <Image 
                            source={PickFlicksLogo}
                            // style={{height: 337, width: 337}}
                            style={{height: 100, width: 100, resizeMode:'contain'}}
                        />
                    </View> */}
                            <View style={{alignItems: 'center'}}>
                                <Text style={{color:'white'}}>Select an Avatar</Text>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <Button mode="contained" 
                                onPress={handleSubmit}>
                                    Create Account
                                </Button>
                            </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    bgColor: {
        backgroundColor: '#1E1A1A',
        flex: 1,
        alignItems: 'center'
    }
});

export default AvatarScreen;