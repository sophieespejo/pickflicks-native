import { FC, useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../Context/UserContext';
import { CheckPassword } from '../../Service/DataService';




const ChangePasswordComponent1: FC = () => {

  let { userId, username } = useContext(UserContext)
  const [textInput, setTextInput] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState(false)
  const [placeholder, setPlaceholder] = useState('');

  const navigation = useNavigation<any>();

  useEffect(() => {
    const Password = async () => {
      setPlaceholder("Enter your current Password");
    }

    Password();

  }, []);

  const handleNext = async () => {
    let userData = {
      Username: username,
      Password: textInput
    };
    let passwordResult = await CheckPassword(userData);
    if (passwordResult) {
      setIncorrectPassword(false);
      navigation.navigate('ChangePassword2');
    }
    else {
      setIncorrectPassword(true);
    }
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
          <Text style={styles.Txt}>Enter your current {'\n'} Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            enablesReturnKeyAutomatically={true}
            keyboardAppearance={'dark'}
            contextMenuHidden={true}
            selectionColor={'white'}
            textAlign={'center'}
            textContentType={'name'}
            placeholder={placeholder}
            placeholderTextColor={'white'}
            onChangeText={(e) => setTextInput(e)}
            onFocus={() => setPlaceholder('')}
            onBlur={() => setPlaceholder('Enter your current Password')}
            value={textInput}
          />
          {
            incorrectPassword ? <Text style={styles.Txt2}>Incorrect Password</Text> : null
          }
          <Pressable onPress={() => handleNext()} style={{ alignItems: 'center', paddingTop: '5%' }}>
            <Text style={styles.SaveTxt}>Next</Text>
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
  }
});

export default ChangePasswordComponent1;
