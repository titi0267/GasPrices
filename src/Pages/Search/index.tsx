import {View, Text, TouchableOpacity} from 'react-native';
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
            navigation.navigate('Home', {
              start: selectStart,
              end: selectEnd,
              isLoading: true,
            });
          }}>
          <Text>Lancer la recherche</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;
