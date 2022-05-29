import { FC, useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Keyboard, Pressable, TouchableWithoutFeedback, Modal, Alert} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../interfaces/RootStackParamList';
import LottieView from 'lottie-react-native';



type Props = NativeStackScreenProps<RootStackParamList, 'AvatarScreen'>;

const AvatarScreen: FC<Props> = () => {
    const navigation = useNavigation<any>();
    let {  userIcon, setUserIcon, username, userId, setUserId,  movingFromProfiletoAvatar, setMovingFromProfiletoAvatar} = useContext(UserContext);

    const [modalVisible, setModalVisible] = useState(false);

    const dancingPanda = require('../../assets/dancingPanda.json');


    useEffect(() => {
        
    }, []);

    const [active, setActive] = useState<String>('');
    const [localIcon, setLocalIcon] = useState<Array<object>>([
        {
          label: "boy1",
          source: boy1
        },
        {
          label: "boy2",
          source: boy2
        },
        {
          label: "boy3",
          source: boy3
        },
        {
          label: "boy4",
          source: boy4
        },
        {
          label: "boy5",
          source: boy5
        },
        {
          label: "boy6",
          source: boy6
        },
        {
          label: "girl1",
          source: girl1
        },
        {
          label: "girl2",
          source: girl2
        },
        {
          label: "girl3",
          source: girl3
        },
        {
          label: "girl4",
          source: girl4
        },
        {
          label: "girl5",
          source: girl5
        },
        {
          label: "girl6",
          source: girl6
        },
      ]);

    const handleSelection = (icon:string) =>
    {
        setUserIcon(icon);
        setActive(icon);
    }
    
const handleSubmit = async () => {
    let userData = await GetUserByUsername(username)
    console.log('//AvatarScreen onSubmit', userData);
    setUserId(userData.id);
    setUserIcon(userIcon);
    console.log(userData.id)
    

    if (userData != null) {
        let result = await EditUserIcon(userId, userIcon)
        setUserIcon(userIcon);
        console.log(result);

        // if(userData.icon == userIcon)
        // {
        //     alert("This is already your avatar!")
        // }
        // if
        // {
            let result1 = await EditUserIcon(userData.id, userIcon)
            console.log('//AvatarScreen changing Icon results:', result);
            AsyncStorage.setItem('@storage_Usericon', userIcon)
            const userToken = await AsyncStorage.getItem('@storage_Token')
            if(result1)
            {
                if(movingFromProfiletoAvatar)
                {
                    navigation.navigate('UserProfile')
                }
                setMovingFromProfiletoAvatar(false);
                setModalVisible(true);
            }
            else
            {
                alert("Could not change your icon!")
            }
        // }
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
                        <View style={{ alignItems: 'center', marginTop: '5%' }}>
                            <Text style={styles.title}>Select an Avatar</Text>
                        </View>
                        <View style={{ flex: 5.5, marginTop: '10%', width: '100%', justifyContent: 'space-evenly', flexDirection: 'row', flexWrap:'wrap'}}>
                        {
                            localIcon.map((icon:any, i:number) => {
                                return(
                                    <Pressable key={i} style={{paddingTop:'4%'}} onPress={() => handleSelection(icon.label)}>
                                <Avatar.Image style={icon.label == active ? styles.active : null} size={110} source={icon.source} />
                                    </Pressable>
                                )
                            })
                        }
                        </View>
                        
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Button onPress={handleSubmit} mode="contained" style={styles.createAccountBtn}>{movingFromProfiletoAvatar ?"Update your avatar" : "Create Account"}</Button>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>



            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <LottieView
                autoPlay
                style={styles.lottieView}
                source={dancingPanda}
              />
            <Text style={styles.modalText}>Account Successfully created!</Text>
            <View style={{flexDirection:'row', width:'90%', justifyContent:'space-evenly'}}>

            <Pressable
              style={[styles.button, styles.buttonClose1]}
              onPress={() => navigation.navigate("UserDashboard")}
            >
              <Text style={styles.textStyle}>Keep going!</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    
      modalView: {
        margin: 20,
        backgroundColor: "#C4C4C4",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        width:'40%',
        elevation: 2,
        marginTop:'5%'
      },
    
      buttonClose: {
        backgroundColor: "red",
      },
      buttonClose1: {
        backgroundColor: "green",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "Raleway_400Regular",
        fontSize: 17,
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: "Raleway_400Regular",
        fontSize: 21,
        lineHeight:37,
        color:'#383333'
      },
      lottieView:{
        height:200,
        bottom:'3%',
      },
});

export default AvatarScreen;