import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, Text, View , Image, ScrollView} from 'react-native';
import JustLogoComponent from '../../Components/UserDashboard-Body/JustLogoComponent';
import ButtonComponent from '../../Components/UserDashboard-Body/ButtonComponent';
import MWGCardComponent from '../../Components/UserDashboard-Body/MWGCardComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import NewMWGNameComponent from '../../Components/UserDashboard-Body/NewMWGNameComponent';
import MemberSearchTextInputComponent from '../../Components/UserDashboard-Body/MemberSearchTextInputComponent';


type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    Profile: { name : string };
    Login: { name: string }
    CreateAccount: undefined,
    Loading: undefined,
    Introduction: undefined
    UserDashboard: { username: string, userId: number }
    MemberSearch: { username: string, userId: number, newMWGname: string  },
  }
  
  
type Props = NativeStackScreenProps<RootStackParamList, 'MemberSearch'>;

  

const MemberSearchScreen: FC<Props> = ({navigation, route}) => {
    return (
        <View style={styles.container}>
            <JustLogoComponent/>
            <Text>{route.params.username}</Text>
            <Text>{route.params.userId}</Text>
            <Text>{route.params.newMWGname}</Text>
            <MemberSearchTextInputComponent username={route.params.username} userId={route.params.userId} newMWGname={route.params.newMWGname} />
            <FooterNavComponent/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1E1A1A',
      fontFamily:'Raleway_400Regular', 
    },
  });

export default MemberSearchScreen;