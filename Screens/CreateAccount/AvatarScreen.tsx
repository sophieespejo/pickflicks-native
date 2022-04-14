import { FC, useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Keyboard, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import PickFlicksLogo from '../assets/logo.png';
import { Button, HelperText } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AddUser } from '../../Service/DataService';
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Avatar } from 'react-native-paper';
import boy1 from '../../assets/avatars/boy1.png';
import boy2 from '../../assets/avatars/boy2.png';
import boy3 from '../../assets/avatars/boy3.png';
import boy4 from '../../assets/avatars/boy4.png';
import boy5 from '../../assets/avatars/boy5.png';
import boy6 from '../../assets/avatars/boy6.png';
import girl1 from '../../assets/avatars/girl1.png';
import girl2 from '../../assets/avatars/girl2.png';
import girl3 from '../../assets/avatars/girl3.png';
import girl4 from '../../assets/avatars/girl4.png';
import girl5 from '../../assets/avatars/girl5.png';
import girl6 from '../../assets/avatars/girl6.png';

type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    UserDashboard: { username : string };
    Login: { name: string }
    CreateAccountScreen: undefined,
    Loading: undefined,
    Introduction: undefined
    AvatarScreen: { username: string }
};

type Props = NativeStackScreenProps<RootStackParamList, 'AvatarScreen'>;

const AvatarScreen : FC<Props> = ({ navigation, route }) => {

    useEffect( () => {
        // const fetch = async () => {
              
        // }
        // fetch();
      }, []);

    let [fontsLoaded] = useFonts({
        Raleway_400Regular,
    });
    
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const handleSelection = async () => {
        
        // Get userData
        let username = route.params.username;
        console.log(username);
        
        // Get userDtoByUsername
        
        // Edit userModel with icon name

        // Then navigate to userDah
        // navigation.navigate('UserDashboard', { username: username})
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
                    {/* <View style={{ alignItems: 'center'}}>
                        <Image 
                            source={PickFlicksLogo}
                            // style={{height: 337, width: 337}}
                            style={{height: 100, width: 100, resizeMode:'contain'}}
                        />
                    </View> */}
                    <View style={{alignItems: 'center', marginTop: '5%'}}>
                        <Text style={styles.title}>Select an Avatar</Text>
                    </View>
                    <View style={{flex: 1, marginTop:'17%', width:'100%', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                        <Pressable onPress={handleSelection}>
                            <Avatar.Image size={110} source={boy1} />
                        </Pressable>
                        <Avatar.Image size={110} source={boy2} />
                        <Avatar.Image size={110} source={boy3} />
                    </View>
                    <View style={{flex: 1, width:'100%', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                        <Avatar.Image size={110} source={boy4} />
                        <Avatar.Image size={110} source={boy5} />
                        <Avatar.Image size={110} source={boy6} />
                    </View>
                    <View style={{flex: 1, width:'100%', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                        <Avatar.Image size={110} source={girl1} />
                        <Avatar.Image size={110} source={girl2} />
                        <Avatar.Image size={110} source={girl3} />
                    </View>
                    <View style={{flex: 2, width:'100%', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                        <Avatar.Image size={110} source={girl4} />
                        <Avatar.Image size={110} source={girl5} />
                        <Avatar.Image size={110} source={girl6} />
                    </View>
                    <View style={{flex:1, alignItems: 'center'}}>
                        <Button mode="contained" style={styles.createAccountBtn}>Create Account</Button>
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
    title: {
        color: 'white',
        fontSize: 33,
        fontFamily: 'Raleway_400Regular'
    },
    createAccountBtn: {
        backgroundColor:'#DC1B21C4',
        borderRadius: 25, 
        height: 50,
        width: 300, 
        justifyContent: 'center',
        marginTop: 10
    }
});

export default AvatarScreen;