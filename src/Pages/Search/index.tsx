import {useEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fetchCityNames, fetchCityPosition} from '../../services/cities.service';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import getLocation from '../../services/getCurrentLocation';
import {
  BottomTabParamList,
  CityPosition,
  GasType,
  LocationType,
} from '../../Types';
import CustomInput from '../../Components/Input';
import asyncStorageService from '../../services/asyncStorage.service';
import CustomDropdown from '../../Components/Dropdown';
import FuelSelection from '../../Components/FuelSelection';
import {FuelAssociation} from '../../assets/Fuels';

const Search = () => {
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();

  const [cityNamesStart, setCityNamesStart] = useState<string[]>([
    'Votre position',
  ]);
  const [cityCoordsStart, setCityCoordsStart] = useState<CityPosition | null>(
    null,
  );
  const [inputValueStart, setInputValueStart] = useState('');
  const [cityNamesEnd, setCityNamesEnd] = useState<string[]>([
    'Votre position',
  ]);
  const [cityCoordsEnd, setCityCoordsEnd] = useState<CityPosition | null>(null);
  const [inputValueEnd, setInputValueEnd] = useState('');

  const [isStartCitySelected, setIsStartCitySelected] = useState(false);
  const [isEndCitySelected, setIsEndCitySelected] = useState(false);

  const [location, setLocation] = useState('');
  const [isFetchStart, setIsFetchStart] = useState(false);
  const [isFetchEnd, setIsFetchEnd] = useState(false);
  const [selectedFuel, setSelectedFuel] = useState<GasType | null>(null);
  const [startIsFocused, setStartIsFocused] = useState(false);
  const [endIsFocused, setEndIsFocused] = useState(false);

  const setLocationCallback = (value: LocationType | string) => {
    setLocation(value as string);
  };

  const setStartIsFocusedCallback = (value: boolean) => {
    setStartIsFocused(value);
  };
  const setEndIsFocusedCallback = (value: boolean) => {
    setEndIsFocused(value);
  };

  useEffect(() => {
    getLocation(setLocationCallback, 'string');
  }, []);

  const setIsFetchStartCallback = (value: boolean) => {
    setIsFetchStart(value);
  };

  const setIsFetchEndCallback = (value: boolean) => {
    setIsFetchEnd(value);
  };

  const setSelectedFuelCallback = (value: GasType) => {
    setSelectedFuel(value);
  };

  // useEffect(() => {
  //   if (location.length != 0) {
  //     setEndResults(prevState => [
  //       {label: 'Votre position', value: location},
  //       ...prevState,
  //     ]);
  //     setStartResults(prevState => [
  //       {label: 'Votre position', value: location},
  //       ...prevState,
  //     ]);
  //   }
  // }, [location]);

  const cityNamesStartCallback = (value: string[]) => {
    setCityNamesStart(value);
  };

  const setCityCoordsStartCallback = (value: CityPosition) => {
    setCityCoordsStart(value);
  };

  const cityNamesEndCallback = (value: string[]) => {
    setCityNamesEnd(value);
  };

  const setCityCoordsEndCallback = (value: CityPosition) => {
    setCityCoordsEnd(value);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (inputValueStart.length != 0 && isStartCitySelected == false) {
        fetchCityNames(
          {adress: inputValueStart},
          cityNamesStartCallback,
          setIsFetchStartCallback,
        );
      }
      if (inputValueStart.length == 0) {
        setIsFetchStart(false);
      }
    }, 400);
    return () => clearTimeout(debounceTimer);
  }, [inputValueStart, isStartCitySelected]);

  const onChangeTextStart = (value: string) => {
    setInputValueStart(value);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (inputValueEnd.length != 0 && isEndCitySelected == false)
        fetchCityNames(
          {adress: inputValueEnd},
          cityNamesEndCallback,
          setIsFetchEndCallback,
        );
      if (inputValueEnd.length == 0) {
        setIsFetchEnd(false);
      }
    }, 400);
    return () => clearTimeout(debounceTimer);
  }, [inputValueEnd, isEndCitySelected]);

  const onChangeTextEnd = (value: string) => {
    setInputValueEnd(value);
  };

  const onPressItemStart = (item: string) => {
    Keyboard.dismiss();
    setIsStartCitySelected(true);
    setInputValueStart(item);
    setCityNamesStart([]);
    if (item == 'Votre position') {
      let values: string[] = location.split(',');

      let invertedValues: string = values.reverse().join(',');
      setCityCoordsStart({label: 'Votre position', geometry: invertedValues});
    } else {
      fetchCityPosition({adress: item}, setCityCoordsStartCallback);
    }
  };

  const onPressItemEnd = (item: string) => {
    Keyboard.dismiss();
    setIsEndCitySelected(true);
    setInputValueEnd(item);
    setCityNamesEnd([]);
    if (item == 'Votre position') {
      let values: string[] = location.split(',');

      let invertedValues: string = values.reverse().join(',');
      setCityCoordsEnd({label: 'Votre position', geometry: invertedValues});
    } else {
      fetchCityPosition({adress: item}, setCityCoordsEndCallback);
    }
  };

  const onClearInputStart = () => {
    setIsStartCitySelected(false);
    setInputValueStart('');
    Keyboard.dismiss();
    setStartIsFocused(false);
    setCityNamesStart(['Votre position']);
    setCityCoordsStart(null);
  };

  const onClearInputEnd = () => {
    setIsEndCitySelected(false);
    Keyboard.dismiss();
    setInputValueEnd('');
    setCityNamesEnd(['Votre position']);
    setCityCoordsEnd(null);
  };

  const refStart = useRef<View>(null);
  const [posStartDropdown, setPosStartDropdown] = useState(0);
  const refEnd = useRef<View>(null);
  const [posEndDropdown, setPosEndDropdown] = useState(0);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={{height: 160}}></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}>
        <FuelSelection
          fuelName={FuelAssociation.find(fuel => fuel.name == 'SP95-E10')?.name}
          setFuelName={setSelectedFuelCallback}
          isSelected={selectedFuel}
          imageName={
            FuelAssociation.find(fuel => fuel.name == 'SP95-E10')?.image
          }
        />
        <FuelSelection
          fuelName={FuelAssociation.find(fuel => fuel.name == 'SP95-E5')?.name}
          setFuelName={setSelectedFuelCallback}
          isSelected={selectedFuel}
          imageName={
            FuelAssociation.find(fuel => fuel.name == 'SP95-E5')?.image
          }
        />
        <FuelSelection
          fuelName={FuelAssociation.find(fuel => fuel.name == 'SP98-E5')?.name}
          isSelected={selectedFuel}
          setFuelName={setSelectedFuelCallback}
          imageName={
            FuelAssociation.find(fuel => fuel.name == 'SP98-E5')?.image
          }
        />
        <FuelSelection
          fuelName={FuelAssociation.find(fuel => fuel.name == 'Gasoil')?.name}
          isSelected={selectedFuel}
          setFuelName={setSelectedFuelCallback}
          imageName={FuelAssociation.find(fuel => fuel.name == 'Gasoil')?.image}
        />
        <FuelSelection
          fuelName={FuelAssociation.find(fuel => fuel.name == 'GPL')?.name}
          setFuelName={setSelectedFuelCallback}
          isSelected={selectedFuel}
          imageName={FuelAssociation.find(fuel => fuel.name == 'GPL')?.image}
        />
        <FuelSelection
          fuelName={FuelAssociation.find(fuel => fuel.name == 'Ethanol')?.name}
          setFuelName={setSelectedFuelCallback}
          isSelected={selectedFuel}
          imageName={
            FuelAssociation.find(fuel => fuel.name == 'Ethanol')?.image
          }
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                cityCoordsStart == null ||
                cityCoordsEnd == null ||
                selectedFuel == null
                  ? '#C8CCCE'
                  : '#00A19B',
            },
          ]}
          disabled={
            cityCoordsStart == null ||
            cityCoordsEnd == null ||
            selectedFuel == null
          }
          onPress={() => {
            asyncStorageService.storeGasType(
              FuelAssociation.find(fuel => fuel.name == selectedFuel)
                ?.apiName ?? 'E10',
            );
            navigation.navigate('Map', {
              start: cityCoordsStart?.geometry,
              end: cityCoordsEnd?.geometry,
            });
          }}>
          <Image
            source={require('../../assets/search.png')}
            style={styles.icon}></Image>
          <Text style={styles.buttonTitle}>Rechercher</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: 'absolute',
          marginTop: 20,
          width: '90%',
          alignItems: 'center',
        }}
        ref={refStart}
        onLayout={() => {
          refStart.current?.measure((x, y, width, height, pageX, pageY) => {
            setPosStartDropdown(pageY);
          });
        }}>
        <CustomInput
          onChangeText={onChangeTextStart}
          onClearInput={onClearInputStart}
          placeholder="Depart"
          setIsFocused={setStartIsFocusedCallback}
          inputValue={inputValueStart}></CustomInput>
      </View>
      <View
        style={{
          position: 'absolute',
          width: '90%',
          alignItems: 'center',
          marginTop: 90,
        }}
        ref={refEnd}
        onLayout={() => {
          refEnd.current?.measure((x, y, width, height, pageX, pageY) => {
            setPosEndDropdown(pageY);
          });
        }}>
        <CustomInput
          onChangeText={onChangeTextEnd}
          onClearInput={onClearInputEnd}
          placeholder="Arrivee"
          setIsFocused={setEndIsFocusedCallback}
          inputValue={inputValueEnd}></CustomInput>
      </View>
      {cityNamesStart.length != 0 && startIsFocused ? (
        <View
          style={[
            {
              position: 'absolute',
              alignItems: 'center',
              top: posStartDropdown,
              width: '80%',
              backgroundColor: 'white',
            },
          ]}>
          <CustomDropdown
            onChangeText={onChangeTextStart}
            onPress={onPressItemStart}
            data={cityNamesStart}
            isLoading={isFetchStart}></CustomDropdown>
        </View>
      ) : (
        <></>
      )}
      {cityNamesEnd.length != 0 && endIsFocused ? (
        <View
          style={[
            {
              position: 'absolute',
              alignItems: 'center',
              top: posEndDropdown,
              width: '80%',
              backgroundColor: 'white',
            },
          ]}>
          <CustomDropdown
            onChangeText={onChangeTextEnd}
            onPress={onPressItemEnd}
            data={cityNamesEnd}
            isLoading={isFetchEnd}></CustomDropdown>
        </View>
      ) : (
        <></>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  legend: {
    fontSize: 20,
    color: '#00A19B',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    top: '30%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: '50%',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Search;
