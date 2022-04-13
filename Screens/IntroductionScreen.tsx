//this should have the carousel
import { FC, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firstPic from '../assets/1pic.png'
import secondPic from '../assets/2pic.png'
import thirdPic from '../assets/3pic.png'
import fourthPic from '../assets/4pic.png'
import headerLogo from '../assets/headerLogo.png'
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';


type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    Profile: { name : string };
    Login: { name: string }
    CreateAccount: undefined,
    Loading: undefined,
    Introduction: undefined
  }
  
  
const Stack = createNativeStackNavigator<RootStackParamList>();
const IntroductionScreen: FC = () => {

    const [interval, setInterval] = useState(1);
    const [intervals, setIntervals] = useState(4);
    const [width, setWidth] = useState(100);

    const init = (width: number) => {
        // initialise width
        setWidth(width);
        // initialise total intervals
        setIntervals(Math.ceil(4 / 1));
      }

      const getInterval = (offset: any) => {
        for (let i = 1; i <= intervals; i++) {
          if (offset+1 < (width / intervals) * i) {
            return i;
          }
          if (i == intervals) {
            return i;
          }
        }
      }

    let [fontsLoaded] = useFonts({
        Raleway_400Regular,
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }
      let bullets = [];
        for (let i = 1; i <= intervals; i++) {
        bullets.push(
            <Text
            key={i}
            style={{
                ...styles.bullet,
                opacity: interval === i ? 1.0 : 0.2
            }}
            >
            &bull;
            </Text>
        );
        }

    return (
        <View style={styles.container}>
            <Image style={{height: 70, width: '100%', marginLeft: '13%'}} source={headerLogo}/>
            <ScrollView 
                    horizontal
                    contentContainerStyle={{ ...styles.scrollView, width: `${100 * 4}%` }}
                    showsHorizontalScrollIndicator={false}
                    // onContentSizeChange={(w, h) => init(w)}
                    onScroll={data => {
                      setWidth(data.nativeEvent.contentSize.width);
                      setInterval(getInterval(data.nativeEvent.contentOffset.x));
                    }}
                    scrollEventThrottle={200}
                    pagingEnabled
                    decelerationRate="fast">
                <View style={{flex:1}}>
                    <View style={{margin: '20%', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 35, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Unsure about what movie to watch?</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.redLogo} source={firstPic}/>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={{margin: '20%', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 35, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Connect with friends and create groups</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.redLogo2} source={secondPic}/>
                    </View>
                     {/* <View style={{flex:1,alignItems: 'center'}}>
                        <Image style={styles.redLogo1} source={secondDots}/>
                    </View> */}
                </View>
                <View style={{flex:1}}>
                <View style={{margin: '15%', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 35, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Swipe to vote on randomly suggested movies</Text>
                    </View>
                    <View style={{alignItems: 'center', paddingLeft:35, paddingTop: 20}}>
                        <Image style={styles.redLogo} source={thirdPic}/>
                    </View>
                     {/* <View style={{flex:1,alignItems: 'center'}}>
                        <Image style={styles.redLogo1} source={thirdDots}/>
                    </View> */}
                </View>
                <View style={{flex:1}}>
                <View style={{margin: '20%', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 35, fontFamily:'Raleway_400Regular', textAlign:'center'}}>Enjoy the movie with the most votes!</Text>
                    </View>
                    <View style={{flex: 2, alignItems: 'center'}}>
                        <Image style={styles.redLogo3} source={fourthPic}/>
                    </View>
                    {/* <View style={{flex:1,alignItems: 'center'}}>
                        <Image style={[styles.redLogo1, styles.marginTop]} source={fourthDots}/>
                    </View> */}
                    <View style={{flex:1, alignItems: 'center', marginTop:'35%'}}>
                        <Button mode="contained" color='#DC1B21C4' style={{borderRadius: 25, height: 50, width: 300, justifyContent: 'center'}}onPress={() => console.log('Pressed')}>
   Create an Account</Button>
                    </View>
                </View>  
            </ScrollView>
            <View style={styles.bullets}>
        {bullets}
      </View>
        </View>
    )
}

export default IntroductionScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#1E1A1A',
        alignItems: 'center',
        paddingTop: '10%',
        width: '100%'
    },
    redLogo: {
      width: '80%',
      height: '65%',
      resizeMode: 'contain',
      //marginRight:50,
    },
    redLogo1: {
        width: '40%',
        resizeMode: 'contain',
        // alignItems: 'center'
      },
      redLogo2: {
        width: '70%',
        height: '65%',
        resizeMode: 'contain',
      },
      redLogo3: {
        width: '90%',
        height: '95%',
        marginTop:'15%',
        resizeMode: 'contain',

      },
    marginTop:{
        marginTop: 35
    },
    bullets: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 1,
        paddingTop: 1,
        marginVertical:'175%',
      },
      bullet: {
        paddingHorizontal: 5,
        fontSize: 50,
        color: 'white'
      },
      scrollView: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
      },
  });