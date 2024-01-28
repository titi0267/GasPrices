import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const CustomDropdown = (props: {
  placeholder: string;
  data: {label: string; value: string}[];
  value: string;
  setValue: (value: string) => void;
  isLoading: boolean;
  setText?: (text: string) => void;
  text?: string;
  textInputRef?: React.RefObject<TextInput>;
}) => {
  const {
    placeholder,
    data,
    setValue,
    value,
    setText,
    isLoading,
    text,
    textInputRef,
  } = props;

  const handleFocusInput = () => {
    setTimeout(() => {
      if (textInputRef != undefined && textInputRef.current) {
        textInputRef.current?.focus();
      }
    }, 100);
  };

  return (
    <View style={{width: '90%', marginTop: 10}}>
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        itemTextStyle={{color: '#000000'}}
        selectedTextStyle={styles.selectedTextStyle}
        showsVerticalScrollIndicator={true}
        renderInputSearch={onSearch => {
          return typeof setText === 'function' && text != undefined ? (
            <TextInput
              ref={textInputRef}
              value={text}
              onChangeText={text => onSearch(text)}
              style={styles.inputSearchStyle}
              placeholderTextColor={'#000000'}
              placeholder="Rechercher"></TextInput>
          ) : null;
        }}
        data={data}
        search
        onFocus={() => {
          handleFocusInput();
        }}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChangeText={text => {
          if (typeof setText === 'function') setText(text);
        }}
        renderItem={item => {
          return isLoading ? (
            data.length != 0 && item.label == data[0].label ? (
              <ActivityIndicator size={40}></ActivityIndicator>
            ) : (
              <></>
            )
          ) : (
            <View style={styles.itemContainer}>
              {data.length != 0 &&
                data[0].value != item.value &&
                data[0].label != item.label && (
                  <View style={styles.separator}></View>
                )}
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.label}</Text>
              </View>
            </View>
          );
        }}
        onChange={item => {
          console.log(item);
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <TouchableOpacity
            onPress={() => {
              setValue('');
              if (typeof setText === 'function') setText('');
            }}>
            <Image
              source={require('../../src/assets/close.png')}
              style={styles.closeButton}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  dropdown: {
    height: 50,
    borderWidth: 0.5,
    borderColor: '#00A19B',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    justifyContent: 'center',
    color: '#C8CCCE',
    alignItems: 'center',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000000',
  },
  inputSearchStyle: {
    color: '#000000',
    height: 40,
    fontSize: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#00A19B',
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
  },
  item: {
    // height: 30,
    paddingVertical: 5,
    justifyContent: 'center',
    marginLeft: 15,
    backgroundColor: '#ffffff',
  },
  itemText: {
    fontSize: 19,
    color: '#000000',
  },
  separator: {
    width: '90%',
    alignSelf: 'center',
    height: 1,
    backgroundColor: '#C8CCCE',
  },
});

export default CustomDropdown;
