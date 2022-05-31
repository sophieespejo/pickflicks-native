import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, View} from 'react-native';
import HeaderComponent from '../../Components/UserProfile/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import ChangeNotificationsComponent from '../../Components/UserProfile/ChangeNotificationsComponent';
import { RootStackParamList } from '../../interfaces/RootStackParamList';


type Props = NativeStackScreenProps<RootStackParamList, 'ChangeNotifications'>;

const ChangeNotificationsScreen: FC<Props> = ({navigation}) => {


    return (
        <View style={styles.container}>
            <HeaderComponent/>
            <ChangeNotificationsComponent/>
            <FooterNavComponent/>
        </View>
    )
}

export default ChangeNotificationsScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  