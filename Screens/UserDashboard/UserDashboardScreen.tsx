import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, Text, View , Image, ScrollView} from 'react-native';
import HeaderComponent from '../../Components/UserDashboard-Body/HeaderComponent';
import ButtonComponent from '../../Components/UserDashboard-Body/ButtonComponent';
import MWGCardComponent from '../../Components/UserDashboard-Body/MWGCardComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import NewMWGNameComponent from '../../Components/UserDashboard-Body/NewMWGNameComponent';
import MemberSearchTextInputComponent from '../../Components/UserDashboard-Body/MemberSearchTextInputComponent';


type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    Login: { username: string }
    CreateAccount: undefined,
    Loading: undefined,
    Introduction: undefined
    UserDashboard: { username : string };
  }
  
  
type Props = NativeStackScreenProps<RootStackParamList, 'UserDashboard'>;

  

const UserDashboard: FC<Props> = ({navigation, route}) => {
    return (
        <View style={styles.container}>
            <HeaderComponent/>
            <ScrollView style={{flex:1}}>
              <ButtonComponent />
              <MWGCardComponent username={route.params.username}/>
            </ScrollView>
            {/* <NewMWGNameComponent/> */}
            {/* <MemberSearchTextInputComponent/> */}
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

export default UserDashboard;