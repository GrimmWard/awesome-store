import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	text: {
		fontFamily: FONTS.POPPINS_400,
		fontSize: 16,
		lineHeight: 25.6,
		textAlign: 'center',
		color: COLORS.black,
		marginTop: 20,
	},
});
