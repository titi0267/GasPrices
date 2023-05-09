import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

const Item = ({item}: any) => {
  if (item) {
    return (
      <View>
        <Text>{item.fields.adresse}</Text>
      </View>
    );
  } else {
    return <></>;
  }
};

const HeaderComponent = () => {
  return (
    <View style={{flexDirection: 'row', flex: 1}}>
      <Text></Text>
    </View>
  );
};

const Table = () => {
  const [gasStations, setGasStations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (
      navigation.getState().routes.find(route => route.name == 'Home')?.params
        .refineGasStations.length != 0
    ) {
      console.log(
        navigation.getState().routes.find(route => route.name == 'Home')?.params
          .refineGasStations,
      );
      setGasStations(
        navigation.getState().routes.find(route => route.name == 'Home')?.params
          .refineGasStations,
      );
    }
  }, [
    navigation.getState().routes.find(route => route.name == 'Home')?.params
      .refineGasStations,
  ]);

  return (
    <View>
      <FlatList
        data={gasStations}
        ListHeaderComponent={<HeaderComponent />}
        renderItem={({item}) => <Item item={item} />}></FlatList>
    </View>
  );
};

export default Table;
