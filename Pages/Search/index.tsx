import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomDropdown from '../../Components/Dropdown';
import fetchGeoCodingResults from '../../src/services/geoCoding.service';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import getLocation from '../../src/services/getCurrentLocation';
import {BottomTabParamList, LocationType} from '../../Types';

const Search = () => {
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();

  const [startValue, setStartValue] = useState('');
  const [endValue, setEndValue] = useState('');
  const [startText, setStartText] = useState('');
  const [endText, setEndText] = useState('');
  const [gasTypeValue, setGasTypeValue] = useState('');
  const [location, setLocation] = useState('');
  const [isFetchStart, setIsFetchStart] = useState(false);
  const [isFetchEnd, setIsFetchEnd] = useState(false);

  const setLocationCallback = (value: LocationType | string) => {
    setLocation(value as string);
  };

  useEffect(() => {
    getLocation(setLocationCallback, 'string');
  }, []);

  const gasTypes = [
    {label: 'E5', value: 'E5'},
    {label: 'E10', value: 'E10'},
    {label: 'SP95', value: 'SP95'},
    {label: 'SP98', value: 'SP98'},
    {label: 'Gazole', value: 'Gazole'},
    {label: 'Ethanol', value: 'Ethanol'},
  ];

  const [startResults, setStartResults] = useState<
    {label: string; value: string}[]
  >([]);
  const [endResults, setEndResults] = useState<
    {label: string; value: string}[]
  >([]);

  const setEndResultsCallback = (value: {label: string; value: string}[]) => {
    console.log(value.map(item => item.label));
    setEndResults(value);
  };

  const setStartResultsCallback = (value: {label: string; value: string}[]) => {
    setStartResults(value);
  };

  const setIsFetchStartCallback = (value: boolean) => {
    setIsFetchStart(value);
  };

  const setIsFetchEndCallback = (value: boolean) => {
    setIsFetchEnd(value);
  };

  useEffect(() => {
    if (location.length != 0) {
      setEndResults(prevState => [
        {label: 'Votre position', value: location},
        ...prevState,
      ]);
      setStartResults(prevState => [
        {label: 'Votre position', value: location},
        ...prevState,
      ]);
    }
  }, [location]);

  useEffect(() => {
    if (startText.length >= 3) {
      fetchGeoCodingResults(
        {adress: startText},
        setStartResultsCallback,
        setIsFetchStartCallback,
      );
    }
  }, [startText]);

  useEffect(() => {
    if (endText.length >= 3) {
      fetchGeoCodingResults(
        {adress: endText},
        setEndResultsCallback,
        setIsFetchEndCallback,
      );
    }
  }, [endText]);

  return (
    <View style={[styles.container]}>
      <KeyboardAvoidingView behavior="padding" style={styles.centeredView}>
        <View
          style={{
            width: '80%',
            flex: 3,
            marginTop: 60,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.legend}>Point de depart :</Text>
            <CustomDropdown
              placeholder="Depart"
              data={startResults}
              value={startValue}
              setValue={setStartValue}
              setText={setStartText}
              isLoading={isFetchStart}
            />
          </View>
          <View style={{marginVertical: 60, alignItems: 'center'}}>
            <Text style={styles.legend}>Point d'arrivee :</Text>
            <CustomDropdown
              placeholder="Arrivee"
              data={endResults}
              value={endValue}
              setValue={setEndValue}
              setText={setEndText}
              isLoading={isFetchEnd}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.legend}>Type de carburant :</Text>
            <CustomDropdown
              placeholder="Carburant"
              data={gasTypes}
              value={gasTypeValue}
              setValue={setGasTypeValue}
              setText={(text: string) => {}}
              isLoading={false}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  startValue.length == 0 ||
                  endValue.length == 0 ||
                  gasTypeValue.length == 0
                    ? 'gray'
                    : '#00A19B',
              },
            ]}
            disabled={
              startValue.length == 0 ||
              endValue.length == 0 ||
              gasTypeValue.length == 0
            }
            onPress={() => {
              navigation.navigate('Map', {start: startValue, end: endValue});
            }}>
            <Image
              source={require('../../src/assets/search.png')}
              style={styles.icon}></Image>
            <Text style={styles.buttonTitle}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  legend: {
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
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
