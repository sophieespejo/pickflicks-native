import { FC, useState, useCallback, useEffect, useContext } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import PickFlicksLogo from '../../assets/logo.png';
import { Button, HelperText } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GetUserByUsername, Login } from '../../Service/DataService';
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { useToast } from 'native-base';
import UserContext from '../../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    UserDashboard: undefined;
    Login: { name: string }
    CreateAccountScreen: undefined,
    Loading: undefined,
    Introduction: undefined
    AvatarScreen: { username: string }
    MemberSearch: { username: string, userId: number },
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen : FC<Props> = ({ navigation }) => {
    let { token, setToken, username, setUsername, userId, setUserId, userIcon, setUserIcon } = useContext(UserContext);
    const [password, setPassword] = useState('');

    const toast = useToast();

    useEffect( () => {
        const userToken = async () => 
        {
            const userToken = await AsyncStorage.getItem('@storage_Token')
            const Id = await AsyncStorage.getItem('@storage_Id')
            const Username = await AsyncStorage.getItem('@storage_Username')
            const UserIcon = await AsyncStorage.getItem('@storage_Usericon')
            setToken(userToken);

            if(userToken != null)
            {
                console.log(userToken);
                console.log(Id);
                console.log(Username);
                console.log(UserIcon);

                setUsername(Username);
                setUserId(Id);
                setUserIcon(UserIcon);
                navigation.navigate('UserDashboard')
            }
        }
        userToken();

      }, []);

    const handleSubmit = async () => {
        let userData = {
            Username: username,
            Password: password
        };
        setUsername(username);
        let fetchedToken = await Login(userData);
        console.log(fetchedToken);

        if (fetchedToken.token != null) {
            
            let userData = await GetUserByUsername(username);
            let userId = userData.id;

            const storedId = JSON.stringify(userId)
            const jsonTOKEN = JSON.stringify(fetchedToken)
            await AsyncStorage.setItem('@storage_Token', jsonTOKEN)
            await AsyncStorage.setItem('@storage_Id', storedId)
            await AsyncStorage.setItem('@storage_Username', username)
            await AsyncStorage.setItem('@storage_Usericon', userData.icon)
            
            setUserId(userData.id);
            setUserIcon(userData.icon);
            navigation.navigate('UserDashboard')
        } else {
            // Do something
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
                style={{ backgroundColor: '#4c69a5' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.bgColor}
                scrollEnabled={false}
            >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView>
                    <Image 
                        source={PickFlicksLogo}
                        style={{height: 337, width: 337}}
                    />
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.createAccountTxt}>Username</Text>
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
                            onChangeText={(e) => setUsername(e)}
                            value={username}
                        />
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.createAccountTxt}>Password</Text>
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
                            secureTextEntry={true}
                            onChangeText={(e) => setPassword(e)}
                            value={password}
                        />
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.dontHaveAccountTxt}>Don't have an account?</Text>
                        <Button 
                                mode='text' 
                                color='white'
                                style={styles.createAccountTxt2} 
                                uppercase={false}
                                onPress={handleNavigateToCreateAccount}
                        ><Text style={styles.createAccountTxt2}>Create one here!</Text>
                        </Button>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Button mode="contained" 
                        onPress={handleSubmit}
                        style={styles.createAccountBtn}
                        uppercase={false}>
                            Log In
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
    }, 
    createAccountTxt: {
        alignItems: 'center',
        fontFamily:'Raleway_400Regular', 
        fontSize: 36,
        color: 'white',
        marginTop: '10%'
    }, 
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        width: 300,
        fontSize: 25,
        color: 'white',
        marginTop: 20,
        // alignItems: 'center',
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
        marginTop: 40
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