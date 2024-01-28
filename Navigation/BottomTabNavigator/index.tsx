import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Header from '../../Components/Header';
import TabBar from '../TabBar';
import Map from '../../Pages/Map';
import Search from '../../Pages/Search';
import GasPumps from '../../Pages/GasPumps';



const BottomTabNavigator = createBottomTabNavigator<any>();

const BottomTabNavigation = () => {
  return (
    <BottomTabNavigator.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        header: props => <Header title={'GasPrices'} />,
      }}>
      <BottomTabNavigator.Screen
        name="Map"
        component={Map}
        initialParams={{
          color: '#E52B03',
        }}></BottomTabNavigator.Screen>
      <BottomTabNavigator.Screen
        initialParams={{
          color: '#000000',
        }}
        name="Search"
        component={Search}
      />
      <BottomTabNavigator.Screen
        name="GasPumps"
        component={GasPumps}
        initialParams={{
          color: '#000000',
        }}></BottomTabNavigator.Screen>
    </BottomTabNavigator.Navigator>
  );
};

export default BottomTabNavigation;
