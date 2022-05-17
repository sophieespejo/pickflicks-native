import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, View , Button} from 'react-native';
import InvitationsHeaderComponent from '../../Components/UserProfile/InvitationsHeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import InvitationsComponent from '../../Components/UserProfile/InvitationsComponent';
import { ScrollView } from 'native-base';
import { RootStackParamList } from '../../interfaces/RootStackParamList';


type Props = NativeStackScreenProps<RootStackParamList, 'Invitations'>;

const InvitationsScreen: FC<Props> = ({navigation}) => {

    return (
        <View style={styles.container}>
            <InvitationsHeaderComponent/>
            <ScrollView style={{flex:1}}>
            <InvitationsComponent/>
            </ScrollView>
            <FooterNavComponent/>
        </View>
    )
}

export default InvitationsScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  