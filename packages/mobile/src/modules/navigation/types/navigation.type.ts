export enum NAVIGATION_KEYS {
	LOGIN = 'LOGIN',
	REGISTER = 'REGISTER',
}

export type RootStackParamList = {
	[NAVIGATION_KEYS.LOGIN]: undefined;
	[NAVIGATION_KEYS.REGISTER]: undefined;
};
