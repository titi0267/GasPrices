import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const CustomInput = (props: {
  onClearInput: () => void;
  onChangeText: (value: string) => void;
  placeholder: string;
  inputValue?: string;
  setIsFocused: (value: boolean) => void;
}) => {
  const {onClearInput, onChangeText, placeholder, inputValue, setIsFocused} =
    props;
  return (
    <View style={inputStyles.container}>
      <TouchableOpacity
        onPress={() => {
          onClearInput();
        }}>
        <Image
          source={require('../../assets/close.png')}
          style={inputStyles.clearButton}
        />
      </TouchableOpacity>
      <TextInput
        onBlur={() => {
          setIsFocused(false);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        style={[inputStyles.placeholder, inputStyles.input]}
        placeholder={placeholder}
        value={inputValue}
        onChangeText={text => {
          onChangeText(text);
        }}></TextInput>
    </View>
  );
};

const inputStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 50,
  },
  placeholder: {
    fontSize: 20,
  },
  clearButton: {
    width: 27,
    height: 27,
    marginHorizontal: 10,
  },
  input: {
    width: '100%',
  },
});

export default CustomInput;
