import * as React from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from 'src/shared/styles';
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

export const LoginScreen = () => {
	const { control } = useForm({ mode: 'onChange' });
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: COLORS.background,
			}}
		>
			<KeyboardAvoidingView behavior="padding">
				<ScrollView>
					<View
						style={{
							alignItems: 'center',
							paddingTop: 77,
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
					<Button
						title="Sign In"
						btnStyle={styles.button}
						onPress={() => {
							navigation.navigate(NAVIGATION_KEYS.REGISTER);
						}}
					/>

					<AuthFooterComponent
						text="Don’t have an account? "
						linkedText="Sign Up"
						onPress={() => {
							navigation.navigate(NAVIGATION_KEYS.REGISTER);
						}}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};
