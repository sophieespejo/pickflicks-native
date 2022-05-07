import { FC, useState, useCallback, useEffect, useContext } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Keyboard, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import PickFlicksLogo from '../assets/logo.png';
import { Button, Colors, HelperText } from 'react-native-paper';
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
import { GetUserByUsername, EditUserIcon } from '../../Service/DataService';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../Context/UserContext';


type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    UserDashboard: undefined;
    Login: undefined
    CreateAccountScreen: undefined,
    Loading: undefined,
    AvatarScreen: undefined
    Introduction: undefined,
    SelectStreamingService: undefined
    NewMWGName: undefined,
    MemberSearch: { username: string, userId: number, newMWGname: string },
    InvitationSent: { username: string, userId: number},
    ChooseGenres : undefined,
    GenreRanking: undefined,
    GenreRanking2: undefined,
    GenreRanking3: undefined,
    FinalGenre : undefined,
    MovieCard : undefined,
    FinalMovie : undefined,
    MWGDashboard : undefined,
    LoadingPopcorn : undefined,
    UserProfile : undefined,
    ChangeUsername :undefined,
    ChangePassword1 : undefined,
    ChangePassword2 : undefined,
    ChangeNotifications : undefined,
    TutorialMovieCard : undefined,
  }

type Props = NativeStackScreenProps<RootStackParamList, 'AvatarScreen'>;

const AvatarScreen: FC<Props> = () => {
    const navigation = useNavigation<any>();
    let {  username, userId, setUserId , listOfMovieNamesUsedToCompare1, setListOfMovieNamesUsedToCompare1 } = useContext(UserContext);

    useEffect(() => {
        // const fetch = async () => {

        // }
        // fetch();
    }, []);

    const [userIcon, setUserIcon] = useState('');
    const [active1, setActive1] = useState('');
    const [active2, setActive2] = useState('');
    const [active3, setActive3] = useState('');
    const [active4, setActive4] = useState('');
    const [active5, setActive5] = useState('');
    const [active6, setActive6] = useState('');
    const [activeg1, setActiveg1] = useState('');
    const [activeg2, setActiveg2] = useState('');
    const [activeg3, setActiveg3] = useState('');
    const [activeg4, setActiveg4] = useState('');
    const [activeg5, setActiveg5] = useState('');
    const [activeg6, setActiveg6] = useState('');

    const handleSelection = async (active: string, selected: string) => {
        setUserIcon(selected);
        let lime = 'lime';
        let empty = '#1E1A1A';
        if (active == 'active1') {
            if (active1 != 'lime') {
                setActive1(lime);
            setActive2(empty);
            setActive3(empty);
            setActive4(empty);
            setActive5(empty);
            setActive6(empty);
            setActiveg1(empty);
            setActiveg2(empty);
            setActiveg3(empty);
            setActiveg4(empty);
            setActiveg5(empty);
            setActiveg6(empty);
            }else {
            setActive1('');
        }
    } else if (active == 'active2') {
        if (active2 != 'lime') {
            setActive1(empty);
        setActive2(lime);
        setActive3(empty);
        setActive4(empty);
        setActive5(empty);
        setActive6(empty);
        setActiveg1(empty);
        setActiveg2(empty);
        setActiveg3(empty);
        setActiveg4(empty);
        setActiveg5(empty);
        setActiveg6(empty);            }else {
            setActive2('');
        }
    } else if (active == 'active3') {
        if (active3 != 'lime') {
            setActive1(empty);
        setActive2(empty);
        setActive3(lime);
        setActive4(empty);
        setActive5(empty);
        setActive6(empty);
        setActiveg1(empty);
        setActiveg2(empty);
        setActiveg3(empty);
        setActiveg4(empty);
        setActiveg5(empty);
        setActiveg6(empty);          }  else {
            setActive3('');
        }
    } else if (active == 'active4') {
        if (active4 != 'lime') {
            setActive1(empty);
            setActive2(empty);
            setActive3(empty);
            setActive4(lime);
            setActive5(empty);
            setActive6(empty);
            setActiveg1(empty);
            setActiveg2(empty);
            setActiveg3(empty);
            setActiveg4(empty);
            setActiveg5(empty);
            setActiveg6(empty);
        } else {
            setActive4('');
        }
    } else if (active == 'active5') {
        if (active5 != 'lime') {
            setActive1(empty);
        setActive2(empty);
        setActive3(empty);
        setActive4(empty);
        setActive5(lime);
        setActive6(empty);
        setActiveg1(empty);
        setActiveg2(empty);
        setActiveg3(empty);
        setActiveg4(empty);
        setActiveg5(empty);
        setActiveg6(empty);
    } else {
        setActive5('');
    }
} else if (active == 'active6') {
    if (active6 != 'lime') {
        setActive1(empty);
    setActive2(empty);
    setActive3(empty);
    setActive4(empty);
    setActive5(empty);
    setActive6(lime);
    setActiveg1(empty);
    setActiveg2(empty);
    setActiveg3(empty);
    setActiveg4(empty);
    setActiveg5(empty);
    setActiveg6(empty);
} else {
    setActive6('');
}
        } else if (active == 'activeg1') {
    if (activeg1 != 'lime') {
        setActive1(empty);
        setActive2(empty);
        setActive3(empty);
        setActive4(empty);
        setActive5(empty);
        setActive6(empty);
        setActiveg1(lime);
        setActiveg2(empty);
        setActiveg3(empty);
        setActiveg4(empty);
        setActiveg5(empty);
        setActiveg6(empty);
    } else {
        setActiveg1('');
    }
} else if (active == 'activeg2') {
    if (activeg2 != 'lime') {
        setActive1(empty);
    setActive2(empty);
    setActive3(empty);
    setActive4(empty);
    setActive5(empty);
    setActive6(empty);
    setActiveg1(empty);
    setActiveg2(lime);
    setActiveg3(empty);
    setActiveg4(empty);
    setActiveg5(empty);
    setActiveg6(empty);
} else {
    setActiveg2('');
}
        } else if (active == 'activeg3') {
    if (activeg3 != lime) {
        setActive1(empty);
    setActive2(empty);
    setActive3(empty);
    setActive4(empty);
    setActive5(empty);
    setActive6(empty);
    setActiveg1(empty);
    setActiveg2(empty);
    setActiveg3(lime);
    setActiveg4(empty);
    setActiveg5(empty);
    setActiveg6(empty);
} else {
    setActiveg3('');
}
 } else if (active == 'activeg4') {
    if (activeg4 != 'lime') {
        setActive1(empty);
    setActive2(empty);
    setActive3(empty);
    setActive4(empty);
    setActive5(empty);
    setActive6(empty);
    setActiveg1(empty);
    setActiveg2(empty);
    setActiveg3(empty);
    setActiveg4(lime);
    setActiveg5(empty);
    setActiveg6(empty);
} else {
    setActiveg4('');
    }
} else if (active == 'activeg5') {
    if (activeg5 != 'lime') {
        setActive1(empty);
    setActive2(empty);
    setActive3(empty);
    setActive4(empty);
    setActive5(empty);
    setActive6(empty);
    setActiveg1(empty);
    setActiveg2(empty);
    setActiveg3(empty);
    setActiveg4(empty);
    setActiveg5(lime);
    setActiveg6(empty);
} else {
    setActiveg5('');
    }
} else if (active == 'activeg6') {
    if (activeg6 != 'lime') {
        setActive1(empty);
    setActive2(empty);
    setActive3(empty);
    setActive4(empty);
    setActive5(empty);
    setActive6(empty);
    setActiveg1(empty);
    setActiveg2(empty);
    setActiveg3(empty);
    setActiveg4(empty);
    setActiveg5(empty);
    setActiveg6(lime);
} else {
    setActiveg6('');
    }
};
    };

const handleSubmit = async () => {
    // Get userData


    // Get userDtoByUsername
    let userData = await GetUserByUsername(username)
    console.log(userData);
    setUserId(userData.id);

    console.log(userData.id)
    console.log(userIcon);

    // Edit userModel with icon name
    if (userData != null) {
        //let result = await EditUserIcon(userData.id, userIcon)
        //console.log(result);
        navigation.navigate('Login');
    }
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
                        <View style={{ alignItems: 'center', marginTop: '5%' }}>
                            <Text style={styles.title}>Select an Avatar</Text>
                        </View>
                        <View style={{ flex: 2, marginTop: '17%', width: '100%', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                            <Pressable onPress={() => handleSelection('active1', 'boy1')}>
                                <Avatar.Image style={{ backgroundColor: active1 }} size={110} source={boy1} />
                            </Pressable>
                            <Pressable onPress={() => handleSelection('active2', 'boy2')}>
                                <Avatar.Image style={{ backgroundColor: active2 }} size={110} source={boy2} />
                            </Pressable>
                            <Pressable onPress={() => handleSelection('active3', 'boy3')}>
                                <Avatar.Image style={{ backgroundColor: active3 }} size={110} source={boy3} />
                            </Pressable>
                        </View>
                        <View style={{ flex: 2, width: '100%', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                            <Pressable onPress={() => handleSelection('active4', 'boy4')}>
                                <Avatar.Image style={{ backgroundColor: active4 }} size={110} source={boy4} />
                            </Pressable>
                            <Pressable onPress={() => handleSelection('active5', 'boy5')}>
                                <Avatar.Image style={{ backgroundColor: active5 }} size={110} source={boy5} />
                            </Pressable>
                            <Pressable onPress={() => handleSelection('active6', 'boy6')}>
                                <Avatar.Image style={{ backgroundColor: active6 }} size={110} source={boy6} />
                            </Pressable>
                        </View>
                        <View style={{ flex: 2, width: '100%', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                            <Pressable onPress={() => handleSelection('activeg1', 'girl1')}>
                                <Avatar.Image style={{ backgroundColor: activeg1 }} size={110} source={girl1} />
                            </Pressable>
                            <Pressable onPress={() => handleSelection('activeg2', 'girl2')}>
                                <Avatar.Image style={{ backgroundColor: activeg2 }} size={110} source={girl2} />
                            </Pressable>
                            <Pressable onPress={() => handleSelection('activeg3', 'girl3')}>
                                <Avatar.Image style={{ backgroundColor: activeg3 }} size={110} source={girl3} />
                            </Pressable>
                        </View>
                        <View style={{ flex: 2, width: '100%', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                            <Pressable onPress={() => handleSelection('activeg4', 'girl4')}>
                                <Avatar.Image style={{ backgroundColor: activeg4 }} size={110} source={girl4} />
                            </Pressable>
                            <Pressable onPress={() => handleSelection('activeg5', 'girl5')}>
                                <Avatar.Image style={{ backgroundColor: activeg5 }} size={110} source={girl5} />
                            </Pressable>
                            <Pressable onPress={() => handleSelection('activeg6', 'girl6')}>
                                <Avatar.Image style={{ backgroundColor: activeg6 }} size={110} source={girl6} />
                            </Pressable>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Button onPress={handleSubmit} mode="contained" style={styles.createAccountBtn}>Create Account</Button>
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
        backgroundColor: '#DC1B21C4',
        borderRadius: 25,
        height: 50,
        width: 300,
        justifyContent: 'center',
        marginTop: 10
    },
    active: {
        backgroundColor: 'lime',
    }
});

export default AvatarScreen;