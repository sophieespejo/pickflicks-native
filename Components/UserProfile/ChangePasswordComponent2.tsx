import { FC, useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useFonts, Raleway_400Regular, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import { EditPassword } from '../../Service/DataService';
import UserContext from '../../Context/UserContext';





const ChangePasswordComponent2: FC = () => {

  let { userId } = useContext(UserContext)


  const [textInput, setTextInput] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    console.log('//ChangePassword2Component TextInput is:', textInput);
    console.log('//ChangePassword2Component TextInput2 is:', textInput2);
    if (textInput == textInput2) {
      let newPasswordResult = await EditPassword(userId, textInput);
      if (newPasswordResult) {
        setSuccess(true);
        console.log('//ChangePassword2Component EditPassword endpoint ran:', newPasswordResult);
      }
      else {
        setSuccess(false);
      }
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
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, width: '100%', alignSelf: 'center' }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={styles.Txt}>Enter your new Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              enablesReturnKeyAutomatically={true}
              keyboardAppearance={'dark'}
              contextMenuHidden={true}
              selectionColor={'white'}
              textAlign={'center'}
              textContentType={'name'}
              placeholderTextColor={'white'}
              onChangeText={(e) => setTextInput(e)}
              value={success ? '' : textInput}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 1, width: '100%', alignSelf: 'center', marginTop: '15%', marginBottom: '13%' }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text style={styles.Txt}>Confirm your new Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              enablesReturnKeyAutomatically={true}
              keyboardAppearance={'dark'}
              contextMenuHidden={true}
              selectionColor={'white'}
              textAlign={'center'}
              textContentType={'name'}
              placeholderTextColor={'white'}
              onChangeText={(e) => setTextInput2(e)}
              value={success ? '' : textInput2}
            />
            {
              textInput == "" && textInput2 == "" ? null :
                success == true && textInput == textInput2 ? <Text style={styles.PasswordsMatch}>Password Changed Successfully!</Text> :
                  textInput == textInput2 ? <Text style={styles.PasswordsMatch}>Passwords match!</Text> :
                    textInput != textInput2 ? <Text style={styles.PasswordsDontMatch}>Passwords do not match!</Text> : null
            }
            <Pressable onPress={() => handleSave()} style={{ alignItems: 'center', paddingTop: '5%' }}>
              <Text style={styles.SaveTxt}>Save</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
    color: '#EBE1E1D1',
    paddingTop: '4%'
  },
  PasswordsMatch: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 22,
    textAlign: 'center',
    color: 'green',
    paddingTop: '4%'
  },
  PasswordsDontMatch: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 22,
    textAlign: 'center',
    color: 'red',
    paddingTop: '4%'
  }
});

export default ChangePasswordComponent2;
