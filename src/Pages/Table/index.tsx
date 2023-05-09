import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

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

const TableComponent = () => {
  const [gasStations, setGasStations] = useState([]);
  const [tableHeader, setTableHeader] = useState(['Adresse']);
  const [selectGasStations, setSelectGasStations] = useState<[any[]]>([[]]);
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

  useEffect(() => {
    setSelectGasStations([]);
    setTableHeader(['Ville', 'Adresse', 'e10', 'Itineraire']);
  }, [gasStations]);

  useEffect(() => {
    const array: [any[]] = [[]];
    const sortedGasStations = gasStations.sort((a, b) => {
      return a.fields.e10_prix - b.fields.e10_prix;
    });
    for (let i = 0; i < gasStations.length; i++) {
      array.push([
        sortedGasStations[i].fields?.ville,
        sortedGasStations[i].fields?.adresse,
        sortedGasStations[i].fields?.e10_prix,
        'Aller ici',
      ]);
    }
    setSelectGasStations(array);
  }, [tableHeader]);
  return (
    <ScrollView>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row
          data={tableHeader}
          style={{height: 40, backgroundColor: '#f1f8ff'}}
          textStyle={{margin: 6}}
        />
        <Rows data={selectGasStations} textStyle={{margin: 6}}></Rows>
      </Table>
    </ScrollView>
  );
};

export default TableComponent;
