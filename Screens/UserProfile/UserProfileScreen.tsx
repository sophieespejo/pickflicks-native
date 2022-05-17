import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, View , Button} from 'react-native';
import HeaderComponent from '../../Components/UserProfile/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import YourProfileComponent from '../../Components/UserProfile/YourProfileComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../interfaces/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'UserProfile'>;

const UserProfileScreen: FC<Props> = ({navigation}) => {

    return (
        <View style={styles.container}>
            <HeaderComponent/>
            <YourProfileComponent/>
            <FooterNavComponent/>
        </View>
    )
}

export default UserProfileScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  