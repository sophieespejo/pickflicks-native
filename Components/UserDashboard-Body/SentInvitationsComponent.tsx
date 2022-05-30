import { FC, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable} from "react-native";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import CheckMark from '../../assets/CheckMark.png'
import {useNavigation} from '@react-navigation/native';



const SentInvitationsComponent: FC = () => {
  const navigation = useNavigation<any>();

  useEffect( () => {
    const sentInvitationTimeOut = async () => 
    {
          setTimeout(() => {
            navigation.navigate('UserDashboard') 
          }, 2000);
    }
    
    sentInvitationTimeOut();

  }, []);
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <Pressable style={styles.container} onPress={()=> navigation.navigate("UserDashboard")}>
    <View>
    <View style={{flexDirection: 'row', alignItems:'center',
        justifyContent:'flex-end', alignSelf: 'center' }}>
        <Image source={CheckMark}/>
        <Text style={styles.text}>Invitation Sent </Text>
        {/* <Text style={styles.text1}>Movie will not be added to your list until a member accepts the invitation.</Text> */}
    </View>
    <View style={{ flexDirection: 'row', alignItems:'center',
        justifyContent:'flex-end', alignSelf: 'center'}}>
              <Text style={styles.text1}>Movie will not be added to your list until a member accepts the invitation.</Text>
    </View>

    </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor:'black'
    },
    text : {
        color:'#FFFFFF',
        fontFamily: 'Raleway_400Regular',
        fontSize: 30
    },
    text1 : {
      color:'#FFFFFF',
      fontFamily: 'Raleway_400Regular',
      fontSize: 20,
      marginLeft: '5%',
      marginRight: '5%',
      marginTop: '5%',
      textAlign:'center'
  },
    image: {
      flex: 1,
      height: '80%',
      width: '80%',
      
    },
});

export default SentInvitationsComponent;
