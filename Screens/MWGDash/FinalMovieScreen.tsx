import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC} from 'react';
import { StyleSheet, View} from 'react-native';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import FinalMovieCardComponent from '../../Components/MWGDashboard/FinalMovieCardComponent';
import { RootStackParamList } from '../../interfaces/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'FinalMovie'>;

const FinalMovieScreen: FC<Props> = ({navigation}) => {


    return (
        <View style={styles.container}>
            <HeaderComponent/>
            <FinalMovieCardComponent/>
            <FooterNavComponent/>
        </View>
    )
}

export default FinalMovieScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  