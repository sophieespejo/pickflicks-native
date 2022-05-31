import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderComponent1 from '../../Components/MWGDashboard/MovieCardHeaderComponent';
import FooterNavComponent from '../../Components/UserDashboard-Body/FooterNavComponent';
import FinalGenreComponent from '../../Components/MWGDashboard/FinalGenreComponent';
import { NativeBaseProvider } from "native-base";
import UserContext from '../../Context/UserContext';
import { GetMWGStatusByMWGId, UpdateMWGStatus } from '../../Service/DataService'
import { RootStackParamList } from '../../interfaces/RootStackParamList';


type Props = NativeStackScreenProps<RootStackParamList, 'FinalGenre'>;

const GenreRankingScreen: FC<Props> = () => {
  let { MWGname, setMWGname, MWGId, setMWGId } = useContext(UserContext)

  useEffect(() => {
    async function getUserInfo() {
      setMWGname(MWGname);
      setMWGId(MWGId);
      let movieObj = await GetMWGStatusByMWGId(MWGId);
      await UpdateMWGStatus(MWGId);
    }
    getUserInfo()
  }, []);



  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <HeaderComponent1 />
        <FinalGenreComponent />
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
