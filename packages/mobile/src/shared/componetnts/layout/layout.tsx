import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { styles } from 'src/shared/componetnts/layout/layout.styles';

type WrapperProps = {
	children: React.ReactNode;
};

export const Layout: React.FC<WrapperProps> = ({ children }) => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAwareScrollView contentContainerStyle={styles.container}>
				{children}
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};
