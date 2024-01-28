import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Card, Button} from 'react-native-paper';
import CustomCard from '../../Components/Card';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {GasPump, GasPumpFields, GasPumpsRouteParams} from '../../Types';
import {useEffect, useState} from 'react';
import asyncStorageService from '../../src/services/asyncStorage.service';

const GasPumps = () => {
  const route = useRoute();
  const [gasStations, setGasStations] = useState<Array<GasPump>>([]);
  const [gasType, setGasType] = useState<string | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    asyncStorageService.getData('gasPumps', setGasStations);
    asyncStorageService.getGasType(setGasType);
  }, [isFocused]);

  useEffect(() => {
    console.log('found station', gasStations);
    if (gasStations && gasStations.length != 0) {
      for (let i = 0; i < gasStations.length; i++) {}
    }
  }, [gasStations]);
  useEffect(() => {
    console.log('found gas type', gasType);
  }, [gasType]);

  const renderCards = (item: GasPump) => {
    const field = gasType?.toLowerCase() + '_prix';
    return (
      <CustomCard
        key={item.fields.id}
        gasType={gasType ? gasType : ''}
        address={item.fields.ville}
        coords={item.geometry.coordinates}
        price={
          (item.fields as GasPumpFields)[field as 'e10_prix'] as string
        }></CustomCard>
    );
  };

  return (
    <View style={styles.container}>
      {gasStations && gasStations.length != 0 ? (
        <FlatList
          data={gasStations}
          style={{width: '100%'}}
          renderItem={item => {
            return (
              <View key={item.item.fields.id} style={styles.cardContainer}>
                {renderCards(item.item)}
              </View>
            );
          }}></FlatList>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>
            Faites une recherche pour visualiser les stations services
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  cardContainer: {
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  error: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 25,
  },
});

export default GasPumps;
