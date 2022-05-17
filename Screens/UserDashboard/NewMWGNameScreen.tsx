import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import JustLogoComponent from '../../Components/UserDashboard-Body/JustLogoComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import NewMWGNameComponent from '../../Components/UserDashboard-Body/NewMWGNameComponent';
import UserContext from '../../Context/UserContext';
import { RootStackParamList } from '../../interfaces/RootStackParamList';

  
type Props = NativeStackScreenProps<RootStackParamList, 'NewMWGName'>;

const NewMWGNameScreen: FC<Props> = ({navigation}) => {

  let { username, setUsername, userId, setUserId, userIcon, setUserIcon } = useContext(UserContext)

  useEffect( () => {
    async function getUserInfo(){
          setUsername(username);
          setUserId(userId)
          setUserIcon(userIcon)
    }
    getUserInfo()
  }, []);


    return (
        <View style={styles.container}>
            <JustLogoComponent/>
            <NewMWGNameComponent />
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

export default NewMWGNameScreen;