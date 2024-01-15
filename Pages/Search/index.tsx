import {useEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomChip from '../../Components/Chip';
import CustomModal from '../../src/components/Modal';

const Search = () => {
  const [isChipSelectedE5, setIsChipSelectedE5] = useState(false);
  const [isChipSelectedE10, setIsChipSelectedE10] = useState(false);
  const [isChipSelectedGazole, setIsChipSelectedGazole] = useState(false);
  const [isChipSelectedSP95, setIsChipSelectedSP95] = useState(false);
  const [isChipSelectedSP98, setIsChipSelectedSP98] = useState(false);
  const [isChipSelectedEthanol, setIsChipSelectedEthanol] = useState(false);

  const resetChipsCallback = (chipType: string) => {
    console.log(chipType);
    if (chipType != 'E10') setIsChipSelectedE10(false);
    else setIsChipSelectedE10(!isChipSelectedE10);
    if (chipType != 'E5') setIsChipSelectedE5(false);
    else setIsChipSelectedE5(!isChipSelectedE5);
    if (chipType != 'SP95') setIsChipSelectedSP95(false);
    else setIsChipSelectedSP95(!isChipSelectedSP95);
    if (chipType != 'SP98') setIsChipSelectedSP98(false);
    else setIsChipSelectedSP98(!isChipSelectedSP98);
    if (chipType != 'Gazole') setIsChipSelectedGazole(false);
    else setIsChipSelectedGazole(!isChipSelectedGazole);
    if (chipType != 'Ethanol') setIsChipSelectedEthanol(false);
    else setIsChipSelectedEthanol(!isChipSelectedEthanol);
  };

  const renderChips = () => {
    return (
      <View style={styles.chipsContainer}>
        <View style={styles.chipsRow}>
          <CustomChip
            isChipSelected={isChipSelectedE5}
            text="E5"
            resetChip={resetChipsCallback}></CustomChip>
          <CustomChip
            isChipSelected={isChipSelectedE10}
            text="E10"
            resetChip={resetChipsCallback}></CustomChip>
        </View>
        <View style={styles.chipsRow}>
          <CustomChip
            isChipSelected={isChipSelectedGazole}
            text="Gazole"
            resetChip={resetChipsCallback}></CustomChip>
          <CustomChip
            isChipSelected={isChipSelectedSP95}
            text="SP95"
            resetChip={resetChipsCallback}></CustomChip>
        </View>
        <View style={styles.chipsRow}>
          <CustomChip
            isChipSelected={isChipSelectedSP98}
            text="SP98"
            resetChip={resetChipsCallback}></CustomChip>
          <CustomChip
            isChipSelected={isChipSelectedEthanol}
            text="Ethanol"
            resetChip={resetChipsCallback}></CustomChip>
        </View>
      </View>
    );
  };
  const startInputRef = useRef<TextInput>(null);
  const endInputRef = useRef<TextInput>(null);
  const [startModalVisible, setStartModalVisible] = useState<boolean>(false);
  const [endModalVisible, setEndModalVisible] = useState<boolean>(false);
  const [startInput, setStartInput] = useState('Depart...');
  const [endInput, setEndInput] = useState('Arrivee...');

  useEffect(() => {
    if (startModalVisible) {
      setTimeout(() => {
        startInputRef.current?.focus();
      }, 200);
    }
  }, [startModalVisible]);

  useEffect(() => {
    if (endModalVisible) {
      setTimeout(() => {
        endInputRef.current?.focus();
      }, 200);
    }
  }, [endModalVisible]);

  const setStartModalVisibleCallback = (modalVisible: boolean) => {
    setStartModalVisible(modalVisible);
  };
  const setEndModalVisibleCallback = (modalVisible: boolean) => {
    setEndModalVisible(modalVisible);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={styles.centeredView}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setStartModalVisibleCallback(true)}>
            <Text style={{color: '#565F64', fontSize: 16}}>{startInput}</Text>
          </TouchableOpacity>
          <CustomModal
            modalVisible={startModalVisible}
            setModalVisibleCallback={setStartModalVisibleCallback}>
            <TextInput
              ref={startInputRef}
              style={styles.input}
              placeholder="Depart..."
              placeholderTextColor="#565F64"
              onChangeText={text => setStartInput(text)}
            />
          </CustomModal>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setEndModalVisibleCallback(true)}>
            <Text style={{color: '#565F64', fontSize: 16}}>{endInput}</Text>
          </TouchableOpacity>
          <CustomModal
            modalVisible={endModalVisible}
            setModalVisibleCallback={setEndModalVisibleCallback}>
            <TextInput
              ref={endInputRef}
              style={styles.input}
              placeholder="Arrivee..."
              placeholderTextColor="#565F64"
              onChangeText={text => setEndInput(text)}
            />
          </CustomModal>
        </View>
        {renderChips()}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log('search');
            }}>
            <Image
              source={require('../../src/assets/search.png')}
              style={styles.icon}></Image>
            <Text style={styles.buttonTitle}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  input: {
    backgroundColor: '#C8CCCE',
    color: '#000000',
    paddingHorizontal: 16,
    borderColor: '#00A19B',
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 30,
    width: '90%',
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
  },
  chipsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipsRow: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 7,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 50,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00A19B',
    borderRadius: 8,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: '50%',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Search;
