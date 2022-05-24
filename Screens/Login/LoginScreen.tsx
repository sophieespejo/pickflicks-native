import { FC, useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Keyboard, TouchableWithoutFeedback, Platform, Dimensions} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import PickFlicksLogo from '../../assets/logo.png';
import { Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GetUserByUsername, Login } from '../../Service/DataService';
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { useToast } from 'native-base';
import UserContext from '../../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../interfaces/RootStackParamList';


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen : FC<Props> = ({ navigation }) => {
    let { device, setDevice, token, setToken, username, setUsername, userId, setUserId, userIcon, setUserIcon } = useContext(UserContext);
    const [password, setPassword] = useState('');
    const [preventSpam, setPreventSpam] = useState<boolean>(false);


    const toast = useToast();

    useEffect( () => {
        const userToken = async () => 
        {
            setDevice(Platform.OS);
            // console.log(Dimensions.get('screen'))
            const userToken = await AsyncStorage.getItem('@storage_Token')
            const Id = await AsyncStorage.getItem('@storage_Id')
            const Username = await AsyncStorage.getItem('@storage_Username')
            const UserIcon = await AsyncStorage.getItem('@storage_Usericon')
            const UserDevice = await AsyncStorage.getItem('@storage_UserDevice')
            setToken(userToken);

            if(userToken != null)
            {
                console.log('LoginScreen// This is the userToken:', userToken);
                console.log('LoginScreen// This is the userId:', Id);
                console.log('LoginScreen// This is the username:', Username);
                console.log('LoginScreen// This is the userIcon:', UserIcon);
                console.log('LoginScreen// This is the userDevice:', UserDevice);

                setUsername(Username);
                setUserId(Id);
                setUserIcon(UserIcon);
                setDevice(UserDevice);
                navigation.navigate('UserDashboard')
            }
        }
        userToken();

      }, []);

    const handleSubmit = async () => {
        setPreventSpam(true);
        let userData = {
            Username: username,
            Password: password
        };
        let fetchedToken = await Login(userData);
        console.log('LogIn Screen', username);

        if (fetchedToken.token != null) {
            
            let userData = await GetUserByUsername(username);
            const storedId = JSON.stringify(userData.id)
            const jsonTOKEN = JSON.stringify(fetchedToken)
            await AsyncStorage.setItem('@storage_Token', jsonTOKEN)
            await AsyncStorage.setItem('@storage_Id', storedId)
            await AsyncStorage.setItem('@storage_Username', username)
            await AsyncStorage.setItem('@storage_Usericon', userData.icon)
            await AsyncStorage.setItem('@storage_UserDevice', Platform.OS)
            
            console.log('LoginScreen and PressingLogIn// This is the userId:', userData.id)
            setUserId(userData.id);
            setUserIcon(userData.icon);
            navigation.navigate('UserDashboard')
        } else {
            toast.show({
                title: "Username and/or password is incorrect. Please try again",
                placement: "bottom"
            })
        }
    };

    const handleNavigateToCreateAccount = () => {
        navigation.navigate('CreateAccountScreen');
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
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                style={{ backgroundColor: '#4c69a5' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.bgColor}
                scrollEnabled={false}
            >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{}}>
                    <Image 
                        source={PickFlicksLogo}
                        style={device == "ios" ? {height: 337, width: 337, marginTop:'12%'} : {height: 337, width: 337}}
                    />
                    <View style={{alignItems: 'center'}}>
                        <Text style={device == "ios" ? [{marginTop:'10%'}, styles.createAccountTxt] : [{marginTop:'5%'}, styles.createAccountTxt]}>Username</Text>
                        <TextInput
                            style={styles.input}
                            enablesReturnKeyAutomatically={true}
                            keyboardAppearance={'dark'}
                            contextMenuHidden={true}
                            selectionColor={'white'}
                            textAlign={'center'}
                            textContentType={'name'}
                            onChangeText={(e) => setUsername(e)}
                            // value={username}
                        />
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={device == "ios" ? [{marginTop:'10%'}, styles.createAccountTxt] : [{marginTop:'5%'}, styles.createAccountTxt]}>Password</Text>
                        <TextInput
                            style={styles.input}
                            enablesReturnKeyAutomatically={true}
                            keyboardAppearance={'dark'}
                            contextMenuHidden={true}
                            selectionColor={'white'}
                            textAlign={'center'}
                            textContentType={'name'}
                            secureTextEntry={true}
                            onChangeText={(e) => setPassword(e)}
                            // value={password}
                        />
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.dontHaveAccountTxt}>Don't have an account?</Text>
                        <Button 
                                mode='text' 
                                color='white'
                                uppercase={false}
                                onPress={handleNavigateToCreateAccount}
                        ><Text style={styles.createAccountTxt2}>Create one here!</Text>
                        </Button>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Button mode="contained" 
                        onPress={handleSubmit}
                        style={styles.createAccountBtn}
                        uppercase={false}
                        disabled={preventSpam ? true : false}>
                            Log In
                        </Button>
                    </View>
                </View>
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
        alignItems: 'center',
    }, 
    createAccountTxt: {
        alignItems: 'center',
        fontFamily:'Raleway_400Regular', 
        fontSize: 36,
        color: 'white',
    }, 
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        width: 300,
        fontSize: 25,
        color: 'white',
        marginTop: 20,
        fontFamily:'Raleway_400Regular', 
    }, 
    nextBtn: {
        justifyContent:'center', 
        borderRadius: 25, 
        width: '40%', 
        height:'13%', 
        backgroundColor: '#DC1B21', 
        marginTop:'70%',
        marginLeft:'64%'
    },
    createAccountBtn: {
        backgroundColor:'#DC1B21C4',
        borderRadius: 25, 
        height: 50,
        width: 300, 
        justifyContent: 'center',
        marginTop: 40,
        alignSelf:'center'
    },
    dontHaveAccountTxt: {
        color: 'white',
        fontSize: 16,
        marginTop: 30,
        fontFamily:'Raleway_400Regular', 
    }, 
    createAccountTxt2: {
        fontSize: 16,
        textDecorationLine: 'underline',
        fontFamily:'Raleway_400Regular', 
    }
});

export default LoginScreen;