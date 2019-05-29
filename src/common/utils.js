import { NavigationActions, StackActions } from 'react-navigation';

export const resetNavigation = (navigation, screen, params) => {
    const resetAction = StackActions.reset({
        key: null,
        index: 0,
        actions: [NavigationActions.navigate({ routeName: screen, params: params })]
    });
    navigation.dispatch(resetAction);
};

//Logger for debugging only
export const log = (title, color, object) => {
    if (__DEV__) {
        console.groupCollapsed(`%c${title}`, `color: ${color}; font-weight:bold;`);
        console.log(object);
        console.groupEnd();
    }
};
