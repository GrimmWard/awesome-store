import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	error: {
		position: 'absolute',
		bottom: -6,
		left: 0,
		fontSize: 14,
		color: COLORS.red,
		fontFamily: FONTS.POPPINS_400,
	},
});
