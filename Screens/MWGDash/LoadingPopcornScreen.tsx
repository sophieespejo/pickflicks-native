import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import LoadingPopcornGifComponent from '../../Components/MWGDashboard/LoadingPopcornGifComponent';
import { RootStackParamList } from '../../interfaces/RootStackParamList';


type Props = NativeStackScreenProps<RootStackParamList, 'LoadingPopcorn'>;

const LoadingPopcornScreen: FC<Props> = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <HeaderComponent />
            <LoadingPopcornGifComponent />
            <FooterNavComponent />
        </View>
    )
}

export default LoadingPopcornScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1A1A'
    },
});
