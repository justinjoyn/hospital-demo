import { createAppContainer, createStackNavigator } from 'react-navigation';
import Rooms from '../screens/Rooms';

const MainNavigator = createStackNavigator(
    {
        Rooms: Rooms
    },
    {
        initialRouteName: 'Rooms',
        headerMode: 'none'
    }
);

const Router = createAppContainer(MainNavigator);
export default Router;
