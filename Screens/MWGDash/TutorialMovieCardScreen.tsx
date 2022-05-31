import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, View} from 'react-native';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import CardTutorialComponent from '../../Components/MWGDashboard/CardTutorialComponent';
import { RootStackParamList } from '../../interfaces/RootStackParamList';


type Props = NativeStackScreenProps<RootStackParamList, 'Introduction'>;

const TutorialMovieCardScreen: FC<Props> = ({navigation}) => {


    return (
        <View style={styles.container}>
            <HeaderComponent/>
            <CardTutorialComponent/>
            <FooterNavComponent/>
        </View>
    )
}

export default TutorialMovieCardScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  