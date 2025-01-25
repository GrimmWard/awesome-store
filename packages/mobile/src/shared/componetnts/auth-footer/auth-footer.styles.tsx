import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 30,
	},
	text: {
		fontFamily: FONTS.POPPINS_400,
		fontSize: 16,
		lineHeight: 24,
	},
	linkedText: {
		fontFamily: FONTS.POPPINS_700,
		color: COLORS.blue,
	},
});
