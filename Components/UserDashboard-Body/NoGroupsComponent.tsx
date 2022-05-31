import { FC } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
const sleepingPanda = require('../../assets/darkerSleepingPanda.json');
import LottieView from 'lottie-react-native';


const NoGroupsComponent: FC = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#1E1A1A' }}>
            <View style={[styles.wgButton, { flex: 1, marginTop: '5%' }]}>
                <View >
                    <View style={{ marginTop: '3%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: 28,
                                fontWeight: 'bold',
                                fontFamily: 'Raleway_400Regular',
                                marginBottom: 0,
                            }}
                        >
                        </Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text
                            style={{
                                paddingTop: '2%',
                                color: "#FFFFFF",
                                fontSize: 20,
                                justifyContent: "center",
                                textAlign: "center",
                                fontFamily: 'Raleway_400Regular',
                                marginBottom: '10%'
                            }}
                        >
                            You're not a part of a group yet!
                        </Text>
                        <LottieView
                            autoPlay
                            style={styles.lottieView}
                            source={sleepingPanda}
                        />
                    </View>
                    <View>
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: 20,
                                justifyContent: "center",
                                textAlign: "center",
                                fontFamily: 'Raleway_400Regular',
                                marginBottom: '7%'
                            }}
                        >
                        </Text>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default NoGroupsComponent;

const styles = StyleSheet.create({
    wgButton: {
        alignItems: "center",
        width: '90%',
        justifyContent: "center",
    },
    lottieView: {
        height: 200,
    },
});