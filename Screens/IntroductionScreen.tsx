import { FC, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import firstPic from '../assets/1pic.png'
import secondPic from '../assets/2pic.png'
import thirdPic from '../assets/3pic.png'
import fourthPic from '../assets/4pic.png'
import headerLogo from '../assets/headerLogo.png'
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { RootStackParamList } from '../interfaces/RootStackParamList';


  
  type Props = NativeStackScreenProps<RootStackParamList, 'Introduction'>;
  const IntroductionScreen: FC<Props> = ({ navigation }) => {

    const [interval, setInterval] = useState(1);
    const [intervals, setIntervals] = useState(4);
    const [width, setWidth] = useState(100);

    const init = (width: number) => {
        setWidth(width);
        setIntervals(Math.ceil(4 / 1));
    }

    const getInterval = (offset: any) => {
        for (let i = 1; i <= intervals; i++) 
        {
            if (offset+1 < (width / intervals) * i) 
            {
                return i;
            }
          if (i == intervals) 
          {
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
    bullets.push
        (
            <Text
                key={i}
                style={{
                    ...styles.bullet,
                    opacity: interval === i ? 1.0 : 0.2
                }}>
                &bull;
            </Text>
        );
    }

    return (
        <View style={styles.container}>
            <Image 
                style={{height: 50, width: '100%', marginLeft: '13%'}} 
                source={headerLogo} />
            <ScrollView 
                horizontal
                contentContainerStyle={{ ...styles.scrollView, width: `${100 * intervals}%` }}
                showsHorizontalScrollIndicator={false}
                onScroll={data => {
                    setWidth(data.nativeEvent.contentSize.width);
                    setInterval(getInterval(data.nativeEvent.contentOffset.x)||1);
                }}
                scrollEventThrottle={200}
                pagingEnabled
                decelerationRate="fast">
                    <View style={{flex:1}}>
                        <View style={styles.introTxtView}>
                            <Text style={styles.introTxt}>Unsure about what movie to watch?</Text>
                        </View>
                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.firstPic} source={firstPic}/>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={styles.introTxtView}>
                        <Text style={styles.introTxt}>Connect with friends and create groups</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.secondPic} source={secondPic}/>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={styles.introTxtView2}>
                        <Text style={styles.introTxt}>Swipe to vote on randomly suggested movies</Text>
                    </View>
                    <View style={{alignItems: 'center', paddingLeft:35, paddingTop: 20}}>
                        <Image style={styles.firstAndThirdPics} source={thirdPic}/>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={styles.introTxtView}>
                        <Text style={styles.introTxt}>Enjoy the movie with the most votes!</Text>
                    </View>
                    <View style={{flex: 2, alignItems: 'center'}}>
                        <Image style={styles.fourthPic} source={fourthPic}/>
                    </View>
                    <View style={{flex:1, alignItems: 'center', marginTop:'25%'}}>
                        <Button 
                            mode="contained" 
                            color='#DC1B21C4' 
                            style={{borderRadius: 25, height: 50, width: 300, justifyContent: 'center'}} 
                            onPress={() => navigation.navigate('CreateAccountScreen')}
                            >Create an Account
                        </Button>
                        <Button 
                            mode="text" 
                            uppercase={false}
                            color='#09A7F9' 
                            style={{borderRadius: 25, height: 50, width: 300, justifyContent: 'center'}} 
                            onPress={() => navigation.navigate('Login')}
                            >Already have an account? Log in
                        </Button>
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
    introTxtView:{
        margin: '20%', 
        alignItems: 'center',
        justifyContent: 'center'
    },
    introTxtView2:{
        marginTop: '18%', 
        marginBottom: '25%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    introTxt:{
        color: 'white', 
        fontSize: 35, 
        fontFamily:'Raleway_400Regular', 
        textAlign:'center'
    },
    firstAndThirdPics: {
      width: '80%',
      height: '65%',
      resizeMode: 'contain',
      //marginRight:50,
    },
    firstPic: {
        width: '80%',
        height: '63%',
        resizeMode: 'contain',
        //marginRight:50,
      },
    secondPic: {
        width: '70%',
        height: '65%',
        resizeMode: 'contain',
    },
    fourthPic: {
        width: '90%',
        height: '85%',
        marginTop:'15%',
        resizeMode: 'contain',
    },
    bullets: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 1,
    
        paddingTop: 1,
        marginVertical:'167%',
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
    createAcctBtn:{
        borderRadius: 25, 
        height: 50, 
        width: 300, 
        justifyContent: 'center',
        fontFamily:'Raleway_400Regular', 
    }
});