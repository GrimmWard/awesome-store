import React from 'react';

import { Text, View } from 'react-native';
import { Input } from 'src/shared/componetnts/input';
import { useForm } from 'react-hook-form';
import { Button } from 'src/shared/componetnts/button/button.component';
import { AuthFooterComponent } from 'src/shared/componetnts/auth-footer/auth-footer.component';
import { styles } from 'src/modules/auth/screens/register/register.styles';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Layout } from 'src/shared/componetnts/layout';

export const RegisterScreen = () => {
	const { control } = useForm({ mode: 'onChange' });
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	return (
		<Layout>
			<View>
				<Text style={styles.text}>Sign Up</Text>
			</View>

			<Input
				name="email"
				control={control}
				defaultValue=""
				label="Email"
			/>
			<Input
				name="full_name"
				control={control}
				defaultValue=""
				label="Full name"
			/>
			<Input
				name="phone_number"
				control={control}
				defaultValue=""
				label="Phone number"
			/>
			<Input
				name="address"
				control={control}
				defaultValue=""
				label="Shipping address"
			/>
			<Input
				name="password"
				control={control}
				defaultValue=""
				label="Password"
			/>
			<Input
				name="confirm_password"
				control={control}
				defaultValue=""
				label="Confirm Password"
			/>
			<Button
				title="Sign Up"
				onPress={() =>
					navigation.navigate(NAVIGATION_KEYS.EMAIL_VERIFICATION)
				}
			/>
			<AuthFooterComponent
				text="Have you already registered? "
				linkedText="Sign In"
				onPress={() => navigation.navigate(NAVIGATION_KEYS.LOGIN)}
			/>
		</Layout>
	);
};
