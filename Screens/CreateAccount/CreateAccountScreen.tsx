import { FC, useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import PickFlicksLogo from '../../assets/logo.png';
import { Button, HelperText } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AddUser, GetUserByUsername } from '../../Service/DataService'
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../Context/UserContext';
import { RootStackParamList } from '../../interfaces/RootStackParamList';
import AsyncStorage from '@react-native-async-storage/async-storage';



type Props = NativeStackScreenProps<RootStackParamList, 'CreateAccountScreen'>;

const CreateAccountScreen: FC<Props> = () => {
    const navigation = useNavigation<any>();
    let { username, setUsername, setUserId, setDevice } = useContext(UserContext);

    const [preventSpam, setPreventSpam] = useState<boolean>(false);
    const [textInput, setTextInput] = useState<string>('');

    const [veryifyPassowrd, setVerifyPassword] = useState('');
    const [veryifyPassowrd2, setVerifyPassword2] = useState('');
    const [usernameCompleted, setUsernameCompleted] = useState(false);
    let passwodsVerified = false;
    let pickingAvatar = false;

    useEffect(() => {
        if (veryifyPassowrd != veryifyPassowrd2) {
        } else {
            passwodsVerified = true;
        }
    }, [veryifyPassowrd, veryifyPassowrd2]);

    const handleSubmit = () => {
        setUsername(textInput);
        setUsernameCompleted(true);
        setTextInput('');
    }

    const hasErrors = () => {
        return (veryifyPassowrd != '' && veryifyPassowrd2 != '' && veryifyPassowrd != veryifyPassowrd2)
    };

    const hasErrors2 = () => {
        return (veryifyPassowrd != '' && veryifyPassowrd == veryifyPassowrd2)
    }

    const handleCreateAccount = async () => {
        setPreventSpam(true);
        if (passwodsVerified) {
            let newUserData = {
                Id: 0,
                Username: username,
                Password: veryifyPassowrd2
            };
            let fetchedToken = await AddUser(newUserData);
            console.log(fetchedToken);
            if (fetchedToken.token != null) {
                setDevice(Platform.OS);
                let userData = await GetUserByUsername(username);
                const storedId = JSON.stringify(userData.id)
                const jsonTOKEN = JSON.stringify(fetchedToken.token)
                await AsyncStorage.setItem('@storage_Token', jsonTOKEN);
                await AsyncStorage.setItem('@storage_Id', storedId)
                await AsyncStorage.setItem('@storage_Username', username)
                await AsyncStorage.setItem('@storage_UserDevice', Platform.OS)

                setUserId(userData.id);
                setUsername(userData.username);
                navigation.navigate('UserDashboard')
            }
            setUsernameCompleted(true);
            pickingAvatar = true;
            navigation.navigate('AvatarScreen')
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
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={PickFlicksLogo}
                                    style={{ height: 250, width: 250, resizeMode: 'contain' }}
                                />
                            </View>
                            {
                                !usernameCompleted && !pickingAvatar ?
                                    <>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={styles.createAccountTxt}>Create a username</Text>
                                            <TextInput
                                                style={styles.input}
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
                                        <View style={{ alignItems: 'center' }}>
                                            <Button mode="contained"
                                                onPress={handleSubmit}
                                                style={styles.nextBtn}>
                                                Next
                                            </Button>
                                        </View>
                                    </>
                                    :
                                    <>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={styles.createAccountTxt}>Create a password</Text>
                                            <TextInput
                                                style={styles.input}
                                                enablesReturnKeyAutomatically={true}
                                                keyboardAppearance={'dark'}
                                                contextMenuHidden={true}
                                                selectionColor={'white'}
                                                textAlign={'center'}
                                                textContentType={'password'}
                                                secureTextEntry={true}
                                                onChangeText={(e) => setVerifyPassword(e)}
                                            />
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <HelperText type="error" visible={hasErrors()}
                                                style={{ alignItems: 'center', color: 'red', fontSize: 20, justifyContent: 'center' }}
                                            >Passwords do not match
                                            </HelperText>
                                            <HelperText type="info" visible={hasErrors2()}
                                                style={{ alignItems: 'center', color: 'green', fontSize: 20, justifyContent: 'center' }}
                                            >Passwords match!
                                            </HelperText>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={styles.createAccountTxt}>Verify password</Text>
                                            <TextInput
                                                style={styles.input}
                                                enablesReturnKeyAutomatically={true}
                                                keyboardAppearance={'dark'}
                                                contextMenuHidden={true}
                                                selectionColor={'white'}
                                                textAlign={'center'}
                                                textContentType={'password'}
                                                secureTextEntry={true}
                                                onChangeText={(e) => setVerifyPassword2(e)}                            // onKeyPress={this.handleKeyDown}
                                            />
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Button mode="contained"
                                                onPress={handleCreateAccount}
                                                style={styles.createAccountBtn}
                                                disabled={preventSpam ? true : false}>
                                                Next
                                            </Button>
                                        </View>
                                    </>
                            }
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
    },
    createAccountTxt: {
        alignItems: 'center',
        fontSize: 36,
        color: 'white',
        marginTop: '10%',
        fontFamily: 'Raleway_400Regular',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        width: 300,
        fontSize: 25,
        color: 'white',
        marginTop: 20,

    },
    nextBtn: {
        backgroundColor: '#DC1B21C4',
        borderRadius: 25,
        height: 50,
        width: 300,
        justifyContent: 'center',
        marginTop: 70
    },
    createAccountBtn: {
        backgroundColor: '#DC1B21C4',
        borderRadius: 25,
        height: 50,
        width: 300,
        justifyContent: 'center',
        marginTop: 40
    }
});

export default CreateAccountScreen;