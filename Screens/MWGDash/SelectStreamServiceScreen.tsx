import { NavigationRouteContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import RedLogo from '../assets/RedLogo.png';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import StreamingServiceComponent from '../../Components/MWGDashboard/StreamingServiceComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import { Provider as PaperProvider } from 'react-native-paper';




type RootStackParamList = {
  Home: undefined; //means route doesnt have params
  Profile: { name : string };
  Login: { name: string }
  CreateAccountScreen: undefined,
  Loading: undefined,
  Introduction: undefined
}


type Props = NativeStackScreenProps<RootStackParamList, 'Introduction'>;

const SelectStreamServiceScreen: FC<Props> = ({navigation}) => {


    return (
        <View style={styles.container}>
            <PaperProvider>
            <HeaderComponent/>
            <StreamingServiceComponent/>
            <FooterNavComponent/>
            </PaperProvider>
        </View>
    )
}

export default SelectStreamServiceScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  