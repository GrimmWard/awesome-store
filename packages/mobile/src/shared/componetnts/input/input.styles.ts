import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	container: {
		position: 'relative',
		marginLeft: 16,
		marginRight: 16,
		paddingBottom: 20,
		marginBottom: 20,
	},
	input: {
		width: '100%',
		paddingHorizontal: 20,
		paddingVertical: 12,
		fontSize: 16,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: COLORS.border_color,
		backgroundColor: COLORS.white,
		lineHeight: 25.6,
		fontFamily: FONTS.POPPINS_400,
	},
	label: {
		fontFamily: FONTS.POPPINS_500,
		marginBottom: 6,
		fontSize: 14,
		lineHeight: 22.4,
		color: COLORS.label_color,
	},
	focused: {
		borderWidth: 1,
		borderColor: COLORS.blue,
	},
	wrong: {
		borderWidth: 1,
		borderColor: COLORS.red,
	},
	correct: {
		borderWidth: 1,
		borderColor: COLORS.green,
	},
	icon: {
		position: 'absolute',
		right: 10,
		top: 40,
		paddingHorizontal: 5,
		paddingVertical: 5,
	},
});
