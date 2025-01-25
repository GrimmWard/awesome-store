import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from '../navigation/components/root-navigator';
import { useFonts } from 'expo-font';
import { FONTS } from 'src/shared/styles/fonts';
import { Loader } from 'src/shared/componetnts/loader/loader.component';

export const App = () => {
	const [fontsLoaded] = useFonts({
		[FONTS.POPPINS_400]: require('../../../assets/fonts/Poppins-Regular.ttf'),
		[FONTS.POPPINS_500]: require('../../../assets/fonts/Poppins-Medium.ttf'),
		[FONTS.POPPINS_700]: require('../../../assets/fonts/Poppins-Bold.ttf'),
	});
	if (!fontsLoaded) {
		return <Loader />;
	}

	return (
		<SafeAreaProvider>
			<RootNavigator />
		</SafeAreaProvider>
	);
};
