import React, { Component } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import Router from './src/common/router';
import store from './src/common/store';
import { COLORS } from './src/styles/colors';
import { FONTS } from './src/styles/fonts';

const theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        primary: COLORS.white,
        accent: COLORS.black,
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
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }

    render() {
        return (
            <Provider store={store}>
                <PaperProvider theme={theme}>
                    <Router />
                </PaperProvider>
            </Provider>
        );
    }
}

export default App;
