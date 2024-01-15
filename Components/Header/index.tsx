import {Image, StyleSheet, Text, View} from 'react-native';

const Header = (props: {title: string}) => {
  const {title} = props;
  const info = require('../../src/assets/information.png');
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Image style={styles.information} source={info}></Image>
      </View>
      {/* <View style={styles.separator}></View> */}
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
