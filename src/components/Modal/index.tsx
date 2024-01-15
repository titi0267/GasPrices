import {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const CustomModal = (props: {
  modalVisible: boolean;
  setModalVisibleCallback: (modalVisible: boolean) => void;
  children: JSX.Element;
}) => {
  const {modalVisible, setModalVisibleCallback, children} = props;

  const handleOverlayPress = () => {
    if (modalVisible) {
      setModalVisibleCallback(false);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisibleCallback(!modalVisible);
      }}>
      <TouchableOpacity style={styles.overlay} onPress={handleOverlayPress}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closePosition}
            onPress={() => setModalVisibleCallback(false)}>
            <Image
              source={require('../../../src/assets/close.png')}
              style={styles.close}></Image>
          </TouchableOpacity>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closePosition: {
    alignSelf: 'flex-end',
  },
  close: {
    width: 25,
    height: 25,
  },
});

export default CustomModal;
