import { ActivityIndicator, View } from 'react-native';
import { styles } from 'src/shared/componetnts/loader/loader.style';

export const Loader = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size={80} color={'#3C82F6'} />
		</View>
	);
};
