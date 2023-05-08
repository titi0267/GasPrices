import {StyleSheet, TextInput} from 'react-native';

const SearchBar = () => {
  return <TextInput style={styles.textInput} />;
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
  },
});

export default SearchBar;
