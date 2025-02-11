import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	button: {
		backgroundColor: COLORS.blue,
		paddingVertical: 12,
		marginHorizontal: 16,
		marginVertical: 40,
		borderRadius: 10,
		alignItems: 'center',
	},
	text: {
		fontFamily: FONTS.POPPINS_700,
		fontSize: 16,
		lineHeight: 19.36,
		color: COLORS.white,
	},
	disabled: {
		backgroundColor: COLORS.gray,
	},
});
