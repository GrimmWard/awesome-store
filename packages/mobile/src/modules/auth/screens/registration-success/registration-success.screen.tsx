import { Layout } from 'src/shared/componetnts/layout';
import { Button } from 'src/shared/componetnts/button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { Image, Text, View } from 'react-native';
import * as React from 'react';
import { styles } from 'screens/registration-success/registration-success.style';

export const RegistrationSuccess = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	return (
		<Layout>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Image source={require('assets/images/success.png')} />
				<Text style={styles.text}>
					Account successfully registered!
				</Text>
			</View>
			<Button
				title="Sign In"
				onPress={() => {
					navigation.navigate(NAVIGATION_KEYS.LOGIN);
				}}
			/>
		</Layout>
	);
};
