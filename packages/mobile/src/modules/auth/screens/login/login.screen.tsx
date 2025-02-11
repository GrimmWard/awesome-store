import * as React from 'react';
import { Image, View } from 'react-native';
import { Input } from 'src/shared/componetnts/input';
import { useForm } from 'react-hook-form';
import { Button } from 'src/shared/componetnts/button/button.component';
import { styles } from 'src/modules/auth/screens/login/login.styles';
import { AuthFooterComponent } from 'src/shared/componetnts/auth-footer/auth-footer.component';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Layout } from 'src/shared/componetnts/layout';

export const LoginScreen = () => {
	const { control } = useForm({ mode: 'onChange' });
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	return (
		<Layout>
			<View
				style={{
					alignItems: 'center',
					marginTop: 77,
					marginBottom: 20.75,
				}}
			>
				<Image
					source={require('../../../../../assets/images/logo.png')}
				/>
			</View>
			<Input
				name="username"
				control={control}
				defaultValue=""
				label="Email"
			/>
			<Input
				name="password"
				control={control}
				defaultValue=""
				label="Password"
			/>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'flex-end',
				}}
			>
				<Button title="Sign In" btnStyle={styles.button} />

				<AuthFooterComponent
					text="Don’t have an account? "
					linkedText="Sign Up"
					onPress={() => {
						navigation.navigate(NAVIGATION_KEYS.REGISTER);
					}}
				/>
			</View>
		</Layout>
	);
};
