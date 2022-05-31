import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, View} from 'react-native';
import HeaderComponent from '../../Components/UserProfile/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import ChangeUsernameComponent from '../../Components/UserProfile/ChangeUsernameComponent';
import { RootStackParamList } from '../../interfaces/RootStackParamList';


type Props = NativeStackScreenProps<RootStackParamList, 'ChangeUsername'>;

const ChangeUsernameScreen: FC<Props> = ({navigation}) => {


    return (
        <View style={styles.container}>
            <HeaderComponent/>
            <ChangeUsernameComponent/>
            <FooterNavComponent/>
        </View>
    )
}

export default ChangeUsernameScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  