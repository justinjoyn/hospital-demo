import { NavigationActions, StackActions } from 'react-navigation';

export const resetNavigation = (navigation, screen, params) => {
    const resetAction = StackActions.reset({
        key: null,
        index: 0,
        actions: [NavigationActions.navigate({ routeName: screen, params: params })]
    });
    navigation.dispatch(resetAction);
};
