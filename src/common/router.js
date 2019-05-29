import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Patients from '../screens/Patients';
import Rooms from '../screens/Rooms';
import { COLORS } from '../styles/colors';

const MainNavigator = createMaterialBottomTabNavigator(
    {
        Rooms: Rooms,
        Patients: Patients
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Rooms') {
                    iconName = `hotel`;
                } else if (routeName === 'Patients') {
                    iconName = `person`;
                }
                return <Icon name={iconName} size={25} color={tintColor} />;
            }
        }),
        tabBarOptions: {
            activeTintColor: COLORS.black,
            inactiveTintColor: COLORS.grey
        }
    }
);

const Router = createAppContainer(MainNavigator);
export default Router;
