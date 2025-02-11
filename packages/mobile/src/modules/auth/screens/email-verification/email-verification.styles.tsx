import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	title: {
		fontFamily: FONTS.POPPINS_700,
		fontSize: 16,
		lineHeight: 25.6,
		textAlign: 'center',
		marginTop: 77,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		marginTop: 40,
	},
	subtitle: {
		fontSize: 14,
		lineHeight: 22.4,
		color: COLORS.label_color,
		fontFamily: FONTS.POPPINS_500,
	},

	codeFiledRoot: { marginTop: 49 },
	cell: {
		width: 44,
		height: 50,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.border_color,
		backgroundColor: COLORS.white,
		fontSize: 16,
		marginRight: 10,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontFamily: FONTS.POPPINS_500,
	},
	focusCell: {
		borderColor: COLORS.blue,
	},
});
