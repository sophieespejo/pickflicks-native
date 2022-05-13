import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, View} from 'react-native';
import SentInvitationsComponent from '../../Components/UserDashboard-Body/SentInvitationsComponent';
import {useNavigation} from '@react-navigation/native';



type RootStackParamList = {
  Home: undefined; //means route doesnt have params
  UserDashboard: undefined
  Login: undefined
  CreateAccountScreen: undefined,
  Loading: undefined,
  Introduction: undefined,
  NewMWGName: undefined,
  MemberSearch: undefined,
  InvitationSent: undefined;
}


type Props = NativeStackScreenProps<RootStackParamList, 'InvitationSent'>;

  

const InvitationSentScreen: FC<Props> = () => {
  const navigation = useNavigation<any>();

    return (
      <View style={styles.container}>
          <SentInvitationsComponent/>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: 'green',
      fontFamily:'Raleway_400Regular', 
    },
  });

export default InvitationSentScreen;