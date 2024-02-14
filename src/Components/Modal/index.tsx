import {ReactNode} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';

const CustomModal = (props: {
  children: ReactNode;
  isVisible: boolean;
  setVisible: (value: boolean) => void;
}) => {
  const {children, isVisible, setVisible} = props;
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setVisible(false);
        }}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <TouchableOpacity
        onPress={() => {
          setVisible(false);
        }}
        style={{
          width: 30,
          height: 30,
          alignSelf: 'flex-end',
          marginRight: 35,
          top: 33,
          zIndex: 10,
        }}>
        <Image
          source={require('../../assets/close.png')}
          style={{
            width: 30,
            height: 30,
          }}></Image>
      </TouchableOpacity>
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default CustomModal;
