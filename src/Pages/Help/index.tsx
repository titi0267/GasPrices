import {ActivityIndicator, Image, ScrollView, Text, View} from 'react-native';
import HelpImages from './Imports';

const renderImage = (index: number, loading?: boolean) => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 5,
        justifyContent: 'center',
        marginTop: 50,
      }}>
      {loading ? (
        <ActivityIndicator size={50}></ActivityIndicator>
      ) : (
        <Image
          source={HelpImages[index].src}
          style={{
            shadowColor: 'black',
            height: 300,
            shadowRadius: 3,
            shadowOpacity: 0.3,
            resizeMode: 'contain',
            marginVertical: 2,
          }}></Image>
      )}
      <Text
        style={{
          textAlign: 'center',
        }}>
        {HelpImages[index].text}
      </Text>
    </View>
  );
};

const Help = () => {
  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      {renderImage(0)}
      {renderImage(1)}
      {renderImage(2, true)}
      {renderImage(3)}
      {renderImage(4)}
      {renderImage(5)}
      <Text
        style={{
          marginTop: 20,
          textAlign: 'center',
          fontSize: 20,
          width: '90%',
        }}>
        Veuillez remonter les bugs que vous rencontrez sur cet email:
        timothe@coniel.com
      </Text>
    </ScrollView>
  );
};

export default Help;
