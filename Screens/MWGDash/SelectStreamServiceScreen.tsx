import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import HeaderComponent from "../../Components/MWGDashboard/HeaderComponent";
import StreamingServiceComponent from "../../Components/MWGDashboard/StreamingServiceComponent";
import FooterNavComponent from "../../Components/UserDashboard-Body/FooterNavComponent";


type RootStackParamList = {
  Home: undefined; //means route doesnt have params
  UserDashboard: { username: string; userId: number };
  Login: { name: string };
  CreateAccountScreen: undefined;
  Loading: undefined;
  AvatarScreen: undefined;
  Introduction: undefined;
  SelectStreamingService: undefined;
  NewMWGName: { username: string; userId: number };
  MemberSearch: { username: string; userId: number; newMWGname: string };
  InvitationSent: { username: string; userId: number };
  ChooseGenres: undefined;
  GenreRanking: undefined;
  FinalMovie: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "SelectStreamingService">;

const SelectStreamServiceScreen: FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
          <HeaderComponent />
          <StreamingServiceComponent />
          <FooterNavComponent />
    </View>
  );
};

export default SelectStreamServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1A1A",
  },
});
