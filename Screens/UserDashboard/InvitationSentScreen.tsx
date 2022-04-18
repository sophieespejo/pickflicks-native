import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, Text, View , Image, ScrollView, Pressable} from 'react-native';
import JustLogoComponent from '../../Components/UserDashboard-Body/JustLogoComponent';
import ButtonComponent from '../../Components/UserDashboard-Body/ButtonComponent';
import MWGCardComponent from '../../Components/UserDashboard-Body/MWGCardComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import NewMWGNameComponent from '../../Components/UserDashboard-Body/NewMWGNameComponent';
import MemberSearchTextInputComponent from '../../Components/UserDashboard-Body/MemberSearchTextInputComponent';
import SentInvitationsComponent from '../../Components/UserDashboard-Body/SentInvitationsComponent';


type RootStackParamList = {
  Home: undefined; //means route doesnt have params
  UserDashboard: { username : string, userId: number };
  Login: { name: string }
  CreateAccountScreen: undefined,
  Loading: undefined,
  Introduction: undefined,
  NewMWGName: undefined,
  MemberSearch: undefined,
  InvitationSent: { username: string, userId: number};
}


  type Props = NativeStackScreenProps<RootStackParamList, 'InvitationSent'>;

  

const InvitationSentScreen: FC<Props> = ({navigation, route}) => {

    return (
      <View style={styles.container}>
        <Pressable style={{flex:1}} onPress={()=> navigation.navigate('UserDashboard', {username: route.params.username, userId: route.params.userId})}>
          <SentInvitationsComponent/>
        </Pressable>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
      fontFamily:'Raleway_400Regular', 
    },
  });

export default InvitationSentScreen;