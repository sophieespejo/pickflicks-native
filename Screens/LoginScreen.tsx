import { FC, useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import PickFlicksLogo from '../assets/logo.png';
import { Button, HelperText } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Login } from '../Service/DataService';

type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    UserDashboard: { name : string };
    Login: { username: string }
    CreateAccountScreen: undefined,
    Loading: undefined,
    Introduction: undefined
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen : FC<Props> = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect( () => {
        // const fetch = async () => {
              
        // }
        // fetch();
      }, []);

    const handleSubmit = async () => {
        let userData = {
            Username: username,
            Password: password
        };

        let fetchedToken = await Login(userData);
        console.log(fetchedToken);

        if (fetchedToken.token != null) {
            navigation.navigate('Loading')
        } else {
            // Do something
        }
    };

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
                            onChangeText={(e) => setPassword(e)}
                            value={password}
                        />
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Button mode="contained" 
                        onPress={handleSubmit}
                        style={styles.createAccountBtn}>
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
        // fontStyle: 'Raleway',
        fontSize: 36,
        color: 'white',
        marginTop: '10%'
    }, 
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        width: 300,
        fontSize: 30,
        color: 'white',
        marginTop: 20,
        // alignItems: 'center',
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
    }
});

export default LoginScreen;