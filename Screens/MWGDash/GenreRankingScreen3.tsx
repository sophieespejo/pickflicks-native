import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, View} from 'react-native';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import SelectedGenreComponent3 from '../../Components/MWGDashboard/SelectedGenreComponent3';
import { NativeBaseProvider } from "native-base";
import { RootStackParamList } from '../../interfaces/RootStackParamList';



type Props = NativeStackScreenProps<RootStackParamList, 'GenreRanking3'>;

const GenreRankingScreen5: FC<Props> = ({navigation}) => {


    return (
        <NativeBaseProvider>
          <View style={styles.container}>
              <HeaderComponent/>
              <SelectedGenreComponent3/>
              <FooterNavComponent/>
          </View>
        </NativeBaseProvider>
    )
}

export default GenreRankingScreen5;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#1E1A1A'
    },
  });
  