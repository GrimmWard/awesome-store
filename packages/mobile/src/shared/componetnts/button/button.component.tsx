import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import * as React from 'react';
import { styles } from './button.styles';

type ButtonProps = {
	title: string;
	btnStyle?: ViewStyle;
	onPress?: () => void;
	disabled?: boolean;
};

export const Button = ({
	title,
	btnStyle,
	onPress,
	disabled = false,
}: ButtonProps) => {
	return (
		<View style={btnStyle}>
			<TouchableOpacity
				style={[styles.button, disabled && styles.disabled]}
				onPress={disabled ? undefined : onPress}
				disabled={disabled}
			>
				<Text style={styles.text}>{title}</Text>
			</TouchableOpacity>
		</View>
	);
};
