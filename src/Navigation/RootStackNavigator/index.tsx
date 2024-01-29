import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Help from '../../Pages/Help';
import BottomTabNavigation from '../BottomTabNavigator';

const RootStackNavigator = createNativeStackNavigator<any>();

const RootStackNavigation = () => {
  return (
    <RootStackNavigator.Navigator screenOptions={{}}>
      <RootStackNavigator.Screen
        name="BottomTabNavigator"
        options={{headerShown: false}}
        component={BottomTabNavigation}></RootStackNavigator.Screen>
      <RootStackNavigator.Screen
        name="Aide"
        component={Help}
        options={{headerShown: true}}
      />
    </RootStackNavigator.Navigator>
  );
};

export default RootStackNavigation;
