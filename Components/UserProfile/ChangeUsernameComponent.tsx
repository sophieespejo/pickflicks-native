import { FC, useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { EditUsername, GetUserByUsername } from '../../Service/DataService';
import UserContext from '../../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';


const ChangeUsernameComponent: FC = () => {

  let { userId, setUsername } = useContext(UserContext)
  const [textInput, setTextInput] = useState<any>('');
  const [userResult, setUserResult] = useState<boolean>(false)
  const [doesUserExist, setDoesUserExist] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('');
  const [waiting, setWaiting] = useState<boolean>(false);

  const loadingAnimation = require('../../assets/loadingAnimation.json')


  useEffect(() => {
    const Username = async () => {
      setPlaceholder("Try a new Username");
    }

    Username();

  }, []);

  const handleSaveUsername = async () => {
    if (textInput == '') {
      alert('Input a new username!')
    }
    let checkUserExistence = await GetUserByUsername(textInput);
    if (checkUserExistence.username != null) {
      setDoesUserExist(true);
    }
    else {
      setWaiting(true);
      let result = await EditUsername(userId, textInput);
      await AsyncStorage.setItem('@storage_Username', textInput)
      setUsername(textInput);
      if (result) {
        setWaiting(false);
        setUserResult(true);
      }
    }
  }

  const handleTEST = () => {
    setWaiting(true);

  }

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ flex: 1, width: '100%', alignSelf: 'center' }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.Txt}>Enter your new {'\n'} Username</Text>
          <TextInput
            style={styles.input}
            enablesReturnKeyAutomatically={true}
            keyboardAppearance={'dark'}
            contextMenuHidden={true}
            selectionColor={'white'}
            textAlign={'center'}
            textContentType={'name'}
            placeholder={placeholder}
            placeholderTextColor={'white'}
            onChangeText={(e) => setTextInput(e)}
            value={textInput}
            onFocus={() => setPlaceholder('')}
            onBlur={() => setPlaceholder("Try a new Username")}
          />
          {waiting ? <LottieView
            autoPlay
            style={styles.lottieView}
            source={loadingAnimation}
          /> :
            (userResult ? <Text style={styles.Txt3}>Username Changed!</Text> :
              doesUserExist ? <Text style={styles.Txt2}>Username is already taken!</Text> :
                !userResult ? null : <Text style={styles.Txt2}>Username not available!</Text>)
          }
          <Pressable onPress={() => handleSaveUsername()} style={{ alignItems: 'center', paddingTop: '5%' }}>
            <Text style={styles.SaveTxt}>Save</Text>
          </Pressable>

        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  titleTxt: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 22,
    textAlign: 'center',
    marginTop: '4%',
    color: '#EBE1E1',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    width: '90%',
    fontSize: 25,
    color: '#EBE1E1',
    marginTop: 20,
    alignSelf: 'center',
    fontFamily: 'Raleway_400Regular',
  },
  titleTxtBold: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 40,
    textAlign: 'center',
    marginTop: '4%',
    color: '#EBE1E1',
    fontWeight: '600'
  },
  SaveTxt: {
    fontFamily: "Raleway_400Regular",
    fontSize: 26,
    color: '#09A7F9',
  },
  Txt: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 30,
    textAlign: 'center',
    color: '#EBE1E1',
  },
  Txt2: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 22,
    textAlign: 'center',
    color: 'red',
    paddingTop: '4%'
  },
  Txt3: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 22,
    textAlign: 'center',
    color: 'green',
    paddingTop: '4%'
  },
  lottieView: {
    height: '50%',
    position: 'absolute',
    top: '5.65%',
    left: 0,
    right: 0,
    overflow: 'hidden'
  },
});

export default ChangeUsernameComponent;
