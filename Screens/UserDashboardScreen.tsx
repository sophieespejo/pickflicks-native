import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, Text, View , Image, ScrollView} from 'react-native';
import HeaderComponent from '../Components/UserDashboard-Body/HeaderComponent';
import ButtonComponent from '../Components/UserDashboard-Body/ButtonComponent';
import MWGCardComponent from '../Components/UserDashboard-Body/MWGCardComponent';
import FooterNavComponent from '../Components/UserDashboard-Body/FooterNavComponent';

type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    Profile: { name : string };
    Login: { name: string }
    CreateAccount: undefined,
    Loading: undefined,
    Introduction: undefined
    UserDashboard: undefined
  }
  
  
  type Props = NativeStackScreenProps<RootStackParamList, 'UserDashboard'>;

const UserDashboard: FC<Props> = ({navigation, route}) => {
    return (
        <View style={styles.container}>
            <ScrollView>
            <HeaderComponent/>

            <ButtonComponent/>
            <MWGCardComponent/>
            </ScrollView>
            <FooterNavComponent/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1E1A1A',
    },
  });

export default UserDashboard;