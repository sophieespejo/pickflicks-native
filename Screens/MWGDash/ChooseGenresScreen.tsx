import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC} from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import GenreSelectionComponent2 from '../../Components/MWGDashboard/GenreSelectionComponent2';
import { RootStackParamList } from '../../interfaces/RootStackParamList';


type Props = NativeStackScreenProps<RootStackParamList, 'ChooseGenres'>;

const ChooseGenresScreen: FC<Props> = ({navigation}) => {


    return (
        <View style={styles.container}>
            <HeaderComponent/>
            <GenreSelectionComponent2/>
            <FooterNavComponent/>
        </View>
    )
}

export default ChooseGenresScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  