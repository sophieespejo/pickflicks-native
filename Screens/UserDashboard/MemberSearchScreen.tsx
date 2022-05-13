import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import JustLogoComponent from '../../Components/UserDashboard-Body/JustLogoComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
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
            <MemberSearchTextInputComponent/>
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