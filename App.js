import React, { Component } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './src/common/router';
import Store from './src/common/store';
import FullscreenLoader from './src/components/FullscreenLoader';
import { FONTS } from './src/styles/fonts';
import { COLORS } from './src/styles/colors';

const theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        primary: COLORS.black,
        accent: COLORS.white,
        background: COLORS.white,
        text: COLORS.black
    },
    fonts: {
        regular: FONTS.primary_bold,
        medium: FONTS.primary_regular,
        light: FONTS.primary_regular,
        thin: FONTS.primary_regular
    }
};

class App extends Component {
    render() {
        return (
            <Provider store={Store.store}>
                <PersistGate loading={<FullscreenLoader />} persistor={Store.persistor}>
                    <PaperProvider theme={theme}>
                        <Router />
                    </PaperProvider>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
