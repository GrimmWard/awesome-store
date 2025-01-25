import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import * as React from 'react';
import { styles } from './button.styles';

type ButtonProps = {
	title: string;
	btnStyle?: ViewStyle;
	onPress?: () => void;
};

export const Button = ({ title, btnStyle, onPress }: ButtonProps) => {
	return (
		<View style={btnStyle}>
			<TouchableOpacity style={[styles.button]} onPress={onPress}>
				<Text style={styles.text}>{title}</Text>
			</TouchableOpacity>
		</View>
	);
};
