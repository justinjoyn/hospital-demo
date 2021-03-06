import { StyleSheet } from 'react-native';
export const common = StyleSheet.create({
    container: {
        flex: 1
    },
    centeredContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    paddedContainer: {
        flex: 1,
        padding: 20
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
});
