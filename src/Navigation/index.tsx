import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavBar from './NavBar';
import Home from '../Pages/Home';
import Search from '../Pages/Search';
import Table from '../Pages/Table';

const Tab = createBottomTabNavigator();

const TabBarNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <NavBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Search" component={Search}></Tab.Screen>
      <Tab.Screen name="Table" component={Table}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabBarNavigation;
