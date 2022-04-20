import { FC } from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    UserDashboard: { username : string, userId: number };
    Login: { name: string }
    CreateAccountScreen: undefined,
    Loading: undefined,
    Introduction: undefined,
    NewMWGName: undefined,
    MemberSearch: undefined,
    InvitationSent: { username: string, userId: number};
    MWGDashboard: undefined;
  }

  type Props = NativeStackScreenProps<RootStackParamList, 'MWGDashboard'>;

  const MWGDashboardScreen: FC<Props> = ({navigation, route}) => {
      return (
          <View style={{flex:1, alignContent: 'center', justifyContent: 'center'}}>
              <Text>MWG Dashboard</Text>
          </View>
      )
  };

  export default MWGDashboardScreen;


