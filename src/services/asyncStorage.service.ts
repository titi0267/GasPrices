import AsyncStorage from '@react-native-async-storage/async-storage';
import {GasPump, GasType} from '../Types';

const storeData = async (key: string, value: Array<{}>) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('error storing data');

    // saving error
  }
};

const storeGasType = async (value: string) => {
  try {
    await AsyncStorage.setItem('gasType', value);
  } catch (e) {
    console.log('error storing gas type');
  }
};

const getGasType = async (setGasType: (value: GasType | null) => void) => {
  try {
    const value = (await AsyncStorage.getItem('gasType')) as GasType | null;
    if (value) setGasType(value);
  } catch (e) {
    console.log('error value');
  }
};
const getData = async (
  key: string,
  setData: (value: Array<GasPump>) => void,
) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    setData(jsonValue != null ? JSON.parse(jsonValue) : null);
  } catch (e) {
    console.log('error reading value');
  }
};

export default {storeData, getData, storeGasType, getGasType};
