import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import HeaderComponent from '../../Components/UserProfile/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import ChangePasswordComponent1 from '../../Components/UserProfile/ChangePasswordComponent1';
import { RootStackParamList } from '../../interfaces/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'ChangePassword1'>;

const ChangePasswordScreen1: FC<Props> = ({navigation}) => {


    return (
        <View style={styles.container}>
            <HeaderComponent/>
            <ChangePasswordComponent1/>
            <FooterNavComponent/>
        </View>
    )
}

export default ChangePasswordScreen1;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  