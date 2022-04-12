import { FC } from 'react';
import { Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined; //means route doesnt have params
    Profile: { name : string };
    Login: { name: string }
    CreateAccount: undefined,
    Loading: undefined,
    Introduction: undefined
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const CreateAccountScreen : FC<Props> = ({ navigation }) => {
    return (
        <Button
            title="Go to Jane's profile"
            onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
        />
    );
};

export default CreateAccountScreen;