import {ListItem} from '@rneui/themed';
import fetchGeoCodingResults from '../../../services/geoCoding.service';
import {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

type ItemProps = {title: any; setSelect: (value: string) => void};

const Item = ({title, setSelect}: ItemProps) => (
  <TouchableOpacity
    style={{
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onPress={() => {
      setSelect(title);
    }}>
    <Text style={{color: 'black', fontSize: 15}}>{title.label}</Text>
  </TouchableOpacity>
);

type ListProp = {id: string; label: string};

const CustomList = (props: {
  data: ListProp[];
  setData: (value: any) => void;
  setSelect: (value: string) => void;
}) => {
  return (
    <FlatList
      keyboardShouldPersistTaps={'handled'}
      style={{backgroundColor: 'white'}}
      data={props.data}
      renderItem={({item}) => (
        <Item title={item} setSelect={props.setSelect} />
      )}></FlatList>
  );
};

export default CustomList;
