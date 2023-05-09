import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useState} from 'react';
import NavBar from './NavBar';
import Home from '../Pages/Home';
import Search from '../Pages/Search';
import Table from '../Pages/Table';
import TableComponent from '../Pages/Table';

const Tab = createBottomTabNavigator();

const TabBarNavigation = () => {
  const refineGasStations: any[] = [];
  return (
    <Tab.Navigator
      tabBar={props => <NavBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{
          refineGasStations: refineGasStations,
          isLoading: false,
        }}></Tab.Screen>
      <Tab.Screen name="Search" component={Search}></Tab.Screen>
      <Tab.Screen
        name="Table"
        component={TableComponent}
        initialParams={{refineGasStations: refineGasStations}}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabBarNavigation;
