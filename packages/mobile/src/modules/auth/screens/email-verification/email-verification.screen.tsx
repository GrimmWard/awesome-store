import { Layout } from 'src/shared/componetnts/layout';
import { Button } from 'src/shared/componetnts/button';
import { Text, View } from 'react-native';
import { styles } from 'src/modules/auth/screens/email-verification/email-verification.styles';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';

const CELL_COUNT = 4;

export const EmailVerification = () => {
	const [value, setValue] = useState('');
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	return (
		<Layout>
			<Text style={styles.title}>Email Verification</Text>
			<View style={styles.container}>
				<Text style={styles.subtitle}>
					Please type the code from the email
				</Text>
				<CodeField
					ref={ref}
					{...props}
					value={value}
					onChangeText={setValue}
					cellCount={CELL_COUNT}
					rootStyle={styles.codeFiledRoot}
					keyboardType="number-pad"
					textContentType="oneTimeCode"
					renderCell={({ index, symbol, isFocused }) => (
						<Text
							key={index}
							style={[styles.cell, isFocused && styles.focusCell]}
							onLayout={getCellOnLayoutHandler(index)}
						>
							{symbol || (isFocused ? <Cursor /> : null)}
						</Text>
					)}
				/>
			</View>
			<Button
				title="Submit"
				onPress={() =>
					navigation.navigate(NAVIGATION_KEYS.SUCCESSFUL_REGISTRATION)
				}
			></Button>
		</Layout>
	);
};
