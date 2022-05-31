import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderComponent from '../../Components/MWGDashboard/HeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import SelectedGenreComponent from '../../Components/MWGDashboard/SelectedGenreComponent';
import { NativeBaseProvider } from "native-base";
import { RootStackParamList } from '../../interfaces/RootStackParamList';


type Props = NativeStackScreenProps<RootStackParamList, 'GenreRanking'>;

const GenreRankingScreen: FC<Props> = ({ navigation, route }) => {

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <HeaderComponent />
        <SelectedGenreComponent />
        <FooterNavComponent />
      </View>
    </NativeBaseProvider>
  )
}

export default GenreRankingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1A1A'
  },
});
