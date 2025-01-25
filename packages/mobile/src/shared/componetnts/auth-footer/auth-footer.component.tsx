import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from 'src/shared/componetnts/auth-footer/auth-footer.styles';

type AuthFooterProps = {
	text: string;
	linkedText: string;
	onPress: () => void;
};

export const AuthFooterComponent = ({
	text,
	linkedText,
	onPress,
}: AuthFooterProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
			<TouchableOpacity onPress={onPress}>
				<Text style={[styles.text, styles.linkedText]}>
					{linkedText}
				</Text>
			</TouchableOpacity>
		</View>
	);
};
