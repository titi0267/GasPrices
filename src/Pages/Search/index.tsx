import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SearchBar, ListItem} from '@rneui/themed';
import {useEffect, useState} from 'react';
import CustomList from './Results';
import fetchGeoCodingResults from '../../services/geoCoding.service';
import SelectResult from './SelectResult';
import {useIsFocused} from '@react-navigation/native';

type ListProp = {id: string; label: string};

const Search = ({navigation}: any) => {
  const [searchStart, setSearchStart] = useState('');
  const [selectStart, setSelectStart] = useState<any>({});
  const [selectEnd, setSelectEnd] = useState<any>({});
  const [searchEnd, setSearchEnd] = useState('');
  const [dataStart, setDataStart] = useState<ListProp[]>([]);
  const [dataEnd, setDataEnd] = useState<ListProp[]>([]);
  const [selectGas, setSelectGas] = useState('');

  useEffect(() => {
    setSearchStart(selectStart.label);
  }, [selectStart]);

  useEffect(() => {
    setSearchEnd(selectEnd.label);
  }, [selectEnd]);
  return (
    <View>
      <SearchBar
        style={{zIndex: 3}}
        placeholder="Départ"
        onChangeText={val => {
          setSearchStart(val);
        }}
        value={searchStart}
        lightTheme
        searchIcon
      />
      <SearchBar
        style={{zIndex: 1}}
        placeholder="Arrivée"
        onChangeText={val => {
          setSearchEnd(val);
        }}
        value={searchEnd}
        lightTheme
        searchIcon
      />
      <View style={{width: '100%', height: 100, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            setSelectGas('e10_prix');
          }}
          style={styles(selectGas, 'e10_prix').button}>
          <Text>E10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectGas('e5_prix');
          }}
          style={styles(selectGas, 'e5_prix').button}>
          <Text>E5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(selectGas, 'sp95_prix').button}
          onPress={() => {
            setSelectGas('sp95_prix');
          }}>
          <Text>SP95</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(selectGas, 'sp98_prix').button}
          onPress={() => {
            setSelectGas('sp98_prix');
          }}>
          <Text>SP98</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(selectGas, 'gazole_prix').button}
          onPress={() => {
            setSelectGas('gazole_prix');
          }}>
          <Text>Gazole</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            height: 40,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
          }}
          onPress={() => {
            if (selectEnd && selectStart && selectGas.length != 0) {
              navigation.navigate('Home', {
                start: selectStart,
                end: selectEnd,
                selectGas: selectGas,
                isLoading: true,
              });
            }
          }}>
          <Text>Lancer la recherche</Text>
        </TouchableOpacity>
      </View>
      <SelectResult
        searchText={searchStart}
        setSelect={setSelectStart}
        selected={selectStart}
        data={dataStart}
        setData={setDataStart}
      />
      <SelectResult
        searchText={searchEnd}
        setSelect={setSelectEnd}
        selected={selectEnd}
        data={dataEnd}
        setData={setDataEnd}
      />
    </View>
  );
};

const styles = (selectGas?: string, name?: string) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      borderColor: 'black',
      backgroundColor: selectGas == name ? 'green' : 'white',
    },
  });

export default Search;
