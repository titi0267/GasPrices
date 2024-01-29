import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Header = (props: {title: string}) => {
  const {title} = props;
  const info = require('../../assets/information.png');
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            //@ts-ignore
            navigation.navigate('Aide');
          }}>
          <Image style={styles.information} source={info}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    position: 'absolute',
    width: '100%',
    backgroundColor: '#C8CCCE90',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#565F64',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#565F64',
    textAlign: 'center',
    fontSize: 20,
  },
  information: {
    tintColor: '#565F64',
    width: 25,
    height: 25,
    marginRight: 20,
  },
});

export default Header;
