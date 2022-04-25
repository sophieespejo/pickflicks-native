import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, FlatList} from "react-native";
import headerLogo from "../../assets/headerLogo.png";
import MovieClipper from "../../assets/MovieClipper.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import MemberSearchTextInputComponent from '../UserDashboard-Body/MemberSearchTextInputComponent'

interface IStartWatchingBtnsComponent {
  username: string,
  userId: number
}

  type RootStackParamList = {
      Home: undefined; //means route doesnt have params
      Profile: { name: string };
      Login: { username: string, userId: number },
      CreateAccount: undefined;
      Loading: undefined;
      Introduction: undefined;
      UserDashboard: { username: string, userId: number };
      InvitationSent: undefined;
      MemberSearch: { username: string, userId: number },
      NewMWGName: { username: string, userId: number },
      MWGDashboard: { mwgName: string, mwgId: number }

    };
  
  type Props = NativeStackScreenProps<RootStackParamList, "MWGDashboard">;

const StartWatchingBtnsComponent: FC = () => {
  const navigation = useNavigation<any>();
  
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }




  return (
    <View>
        <View style={{flex:1, height:90, marginTop:'5%', alignItems:'center'}}>
            <Pressable style={{width:'90%'}} onPress={() => navigation.navigate}>
                <View style={styles.wgButton}>
                <Image source={MovieClipper}></Image>
                <Text style={{color:'#E3DDDD', fontSize:24, paddingLeft:60, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>Start Watching {"\n"} a movie now</Text>
                </View>
            </Pressable>
        </View>

        <View style={{flex:1, height:120, alignItems:'center', marginTop:'4%',justifyContent:'center'}}>
            <View style={{width:'90%'}} onPress={() => navigation.navigate}>
                <View style={styles.LWAMT}>
                <View style={{flex:1, marginTop:'3%'}}>
                <Text style={{color:'#FFFFFF', fontSize:18, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>Let's watch a movie together later</Text>
                </View>

                <View style={{flex:2, flexDirection:'row', justifyContent:"space-evenly", alignItems:'center', width:'100%'}}>
                <Pressable style={styles.InviteMWG}>
                <Text style={{color:'#E3DDDD', fontSize:15, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>Invite MovieGroup1</Text>
                </Pressable>
                <Image source={MovieClipper}></Image>
                </View>
                
                </View>
            </View>
        </View>

        <View style={{flex:1, height:200, alignItems:'center', marginTop:'4%'}}>
            <View style={[{flex:1, width:'90%'}, styles.LWAMT]}>
                <View style={{flex:1, marginTop:'3%', marginBottom:'3%'}}>
                <Text style={{color:'#FFFFFF', fontSize:28, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>Movies Watched</Text>
                </View>
        
                <View style={{flex:3,flexDirection:'row', marginBottom:'4%', width:'100%', justifyContent:'space-evenly'}}>
                        <View>
                        <ScrollView>
                        <View style={{borderBottomColor:'#FFFFFF', borderBottomWidth:1}}>
                            <Text style={{color:'#FFFFFF', fontSize:18, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                        </View>
                            <Text style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular'}}>Movies</Text>
                            <Text style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular'}}>Movies</Text>
                            <Text style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular'}}>Movies</Text>
                        </ScrollView>
                        </View>


                        <View>
                        <View style={{borderBottomColor:'#FFFFFF', borderBottomWidth:1}}>
                            <Text style={{color:'#FFFFFF', fontSize:18, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Genre</Text>
                        </View>
                        <ScrollView>
                            <Text style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                            <Text style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                            <Text style={{color:'#FFFFFF', fontSize:23, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                        </ScrollView>
                        </View>
                </View>

            </View>
        </View>

        <View style={{flex:1, height:300, alignItems:'center', marginTop:'4%'}}>
            <View style={[{flex:1, width:'90%'}, styles.LWAMT]}>
                <View style={{flex:1, marginTop:'3%'}}>
                <Text style={{color:'#FFFFFF', fontSize:28, justifyContent:'center', textAlign:'center', fontFamily:'Raleway_400Regular'}}>Group Members</Text>
                </View>
        
                <View style={{flex:1, height:100,  flexDirection:'row', marginBottom:'4%', width:'80%', justifyContent:'space-evenly'}}>
                        <ScrollView style={{flex:1}}>
                          <View style={styles.nameLine}>
                            <Text style={{color:'#FFFFFF', fontSize:25, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                          </View>
                          <View style={styles.nameLine}>
                            <Text style={{color:'#FFFFFF', fontSize:25, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                          </View>

                          <View style={styles.nameLine}>
                            <Text style={{color:'#FFFFFF', fontSize:25, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                          </View>

                          <View style={styles.nameLine}>
                            <Text style={{color:'#FFFFFF', fontSize:25, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                          </View>
                          <View style={styles.nameLine}>
                            <Text style={{color:'#FFFFFF', fontSize:25, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                          </View>
                          <View style={styles.nameLine}>
                            <Text style={{color:'#FFFFFF', fontSize:25, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                          </View>
                          <View style={styles.nameLine}>
                            <Text style={{color:'#FFFFFF', fontSize:25, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                          </View>
                          <View style={styles.nameLine}>
                            <Text style={{color:'#FFFFFF', fontSize:25, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Movies</Text>
                          </View>
                        </ScrollView>
                </View>

            </View>
        </View>

        

            {/* <MemberSearchTextInputComponent/> */}

        </View>
  );
};

export default StartWatchingBtnsComponent;

const styles = StyleSheet.create({
    nameLine:{
      flex:1,
      borderBottomColor: '#707070',
      borderBottomWidth: 1,
      marginTop:'10%',
    },
  wgButton: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor:'#FF2E35BA',
    backgroundColor:'#FF2E35BA',
    borderRadius: 25,
    alignItems:'center',
    justifyContent:'center',
    height:'100%',
  },
  LWAMT: {
    borderWidth: 2,
    borderColor:'#4D4A4AD1',
    backgroundColor:'#4D4A4AD1',
    borderRadius: 25,
    alignItems:'center',
    justifyContent:'center',
    height:'100%',
  },
  InviteMWG: {
    borderWidth: 2,
    borderColor:'#DC1B21C6',
    backgroundColor:'#DC1B21C6',
    borderRadius: 15,
    alignItems:'center',
    justifyContent:'center',
    height:'50%',
    width:'55%'
  },
  container1: {
    flex: 0,
    alignItems: "center",

    //position: 'absolute', top: 175, left: 23, right: 20, bottom: 0,
    backgroundColor:'pink'
  },
});
