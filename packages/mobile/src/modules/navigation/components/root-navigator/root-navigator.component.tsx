import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavContainer } from '../nav-container/nav-container.component';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '../../types/navigation.type';
import { SCREEN_OPTIONS } from '../../constants';
import { LoginScreen } from 'src/modules/auth/screens/login';
import { RegisterScreen } from 'src/modules/auth/screens/register';
import { EmailVerification } from 'src/modules/auth/screens/email-verification';
import { RegistrationSuccess } from 'src/modules/auth/screens/registration-success';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
	const screens = React.useMemo(() => {
		return (
			<>
				<Stack.Screen
					name={NAVIGATION_KEYS.LOGIN}
					component={LoginScreen}
					options={SCREEN_OPTIONS}
				/>
				<Stack.Screen
					name={NAVIGATION_KEYS.REGISTER}
					component={RegisterScreen}
					options={SCREEN_OPTIONS}
				/>
				<Stack.Screen
					name={NAVIGATION_KEYS.EMAIL_VERIFICATION}
					component={EmailVerification}
					options={SCREEN_OPTIONS}
				/>
				<Stack.Screen
					name={NAVIGATION_KEYS.SUCCESSFUL_REGISTRATION}
					component={RegistrationSuccess}
					options={SCREEN_OPTIONS}
				/>
			</>
		);
	}, []);

	return (
		<NavContainer>
			<Stack.Navigator initialRouteName={NAVIGATION_KEYS.LOGIN}>
				{screens}
			</Stack.Navigator>
		</NavContainer>
	);
};
