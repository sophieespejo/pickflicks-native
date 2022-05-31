import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect } from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import StartWatchingBtnsComponent from '../../Components/MWGDashboard/StartWatchingBtnsComponent';
import UserContext from '../../Context/UserContext';
import { RootStackParamList } from '../../interfaces/RootStackParamList';



type Props = NativeStackScreenProps<RootStackParamList, 'MWGDashboard'>;

const MWGDashboardScreen: FC<Props> = ({navigation}) => {
  let { MWGname, setMWGname, MWGId, setMWGId } = useContext(UserContext)

  useEffect( () => {
    async function getUserInfo(){
          setMWGname(MWGname);
          setMWGId(MWGId);
    }
    getUserInfo()
  }, []);
    return (
        <View style={styles.container}>
            <HeaderComponent />
            <ScrollView style={{flex:1}}>
            <StartWatchingBtnsComponent/>
            </ScrollView>
            <FooterNavComponent/>
        </View>
    )
}

export default MWGDashboardScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A',
    },
  });
  