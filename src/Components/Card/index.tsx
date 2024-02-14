import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import {Button, Card} from 'react-native-paper';

const CustomCard = (props: {
  address: string;
  price: string;
  gasType: string;
  coords: [number, number];
}) => {
  const {address, price, gasType, coords} = props;
  return (
    <Card
      contentStyle={{
        padding: 20,
      }}
      style={{width: '90%'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/gas-pump.png')}
            style={styles.image}></Image>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Adresse: {address}</Text>
          <Text style={styles.text}>Type d'essence: {gasType}</Text>
          <Text style={styles.text}>Prix au litre: {price}</Text>
        </View>
      </View>
      <View style={{marginTop: 10, borderRadius: 50}}>
        <Button
          contentStyle={{backgroundColor: '#00A19B'}}
          onPress={() => {
            Linking.openURL(
              `https://www.google.com/maps/dir/?api=1&destination=${coords[1]},${coords[0]}`,
              // `https://www.waze.com/ul?ll=${coords[1]},${coords[0]}&navigate=yes`
            );
          }}>
          <Text style={{color: '#ffffff'}}>Itineraire</Text>
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginLeft: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
  textContainer: {
    marginLeft: 20,
    flex: 1,
  },
  text: {
    fontSize: 17,
    color: '#000000',
  },
});

export default CustomCard;
